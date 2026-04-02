document.addEventListener('DOMContentLoaded', () => {
    // --- ЗАГРУЗКА ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ И ЛОГИКА ВЫХОДА ---
    const logoutBtn = document.getElementById('logout-btn');
    
    const loadUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '../login/index.html';
            return;
        }

        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch('/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const user = await response.json();
                document.getElementById('current-user-name').textContent = `${user.last_name} ${user.first_name}`;
                document.getElementById('current-user-login').textContent = user.login;
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '../login/index.html';
            }
        } catch (error) {
            console.error('Ошибка при загрузке профиля:', error);
        }
    };
    loadUserProfile();

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { 
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '../login/index.html'; 
        });
    }

    // --- ИНИЦИАЛИЗАЦИЯ КАРТОЧКИ КЛИЕНТА ---
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    if (!clientId) {
        alert('Клиент не найден');
        window.location.href = '../clients/index.html';
        return;
    }

    let currentClient = {};
    let clientCalculations = [];

    // --- DOM Элементы ---
    const displayName = document.getElementById('display-name');
    const displayPhone = document.getElementById('display-phone');
    const displayEmail = document.getElementById('display-email');
    const editClientBtn = document.getElementById('edit-client-btn');
    
    const editClientModal = document.getElementById('edit-client-modal');
    const editClientForm = document.getElementById('edit-client-form');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    const cancelEditModalBtn = document.getElementById('cancel-edit-modal-btn');
    
    const inputLastName = document.getElementById('edit-lastname');
    const inputFirstName = document.getElementById('edit-firstname');
    const inputMiddleName = document.getElementById('edit-middlename');
    const inputPhone = document.getElementById('edit-phone');
    const inputEmail = document.getElementById('edit-email');

    const tableBody = document.getElementById('calculations-table-body');
    const openCalcModalBtn = document.getElementById('open-calc-modal-btn');
    const selectCalcModal = document.getElementById('select-calc-modal');
    const closeCalcModalBtn = document.getElementById('close-calc-modal-btn');
    const calcOptionBtns = document.querySelectorAll('.calc-option-btn');

    // --- Вспомогательные функции форматирования ---
    const formatPhoneForDisplay = (digits) => {
        if (!digits) return 'Не указан';
        if (digits.length === 11) {
            return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
        }
        return digits;
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatMoney = (num) => {
        return Number(num).toLocaleString('ru-RU') + ' ₽';
    };

    // --- ФУНКЦИИ РЕНДЕРИНГА UI ---
    const renderClientInfo = () => {
        displayName.textContent = `${currentClient.last_name || ''} ${currentClient.first_name || ''} ${currentClient.patronymic || ''}`.trim() || 'Загрузка...';
        displayPhone.textContent = formatPhoneForDisplay(currentClient.phone_number);
        displayEmail.textContent = currentClient.email || 'Не указан';
    };

    const renderTable = () => {
        tableBody.innerHTML = '';
        if (clientCalculations.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 32px;">Нет сохраненных расчетов</td></tr>`;
            return;
        }

        clientCalculations.forEach(calc => {
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer'; 
            
            let statusBadge = '';
            if (calc.status === 'Актуален') statusBadge = '<span class="badge active">Актуален</span>';
            else if (calc.status === 'Не актуален') statusBadge = '<span class="badge inactive">Не актуален</span>';
            else if (calc.status === 'Заключен договор') statusBadge = '<span class="badge contract">Заключен договор</span>';
            else statusBadge = `<span class="badge">${calc.status}</span>`;

            const calcUrl = `../calculation/index.html?clientId=${currentClient.id}&calcId=${calc.id}`;

            tr.innerHTML = `
                <td onclick="window.location.href='${calcUrl}'">
                    <strong>Расчет №${calc.id}</strong><br>
                    <span style="font-size: 12px; color: var(--text-secondary)">${formatMoney(calc.price)}</span>
                </td>
                <td onclick="window.location.href='${calcUrl}'">${formatDate(calc.created_at)}</td>
                <td onclick="window.location.href='${calcUrl}'">${statusBadge}</td>
                <td onclick="window.location.href='${calcUrl}'">${calc.address || 'Не указан'}</td>
                <td class="text-right">
                    <div class="action-icons">
                        <button class="icon-btn copy" title="Копировать расчет" data-id="${calc.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                        <button class="icon-btn delete" title="Удалить расчет" data-id="${calc.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Слушатели для кнопок в таблице
        document.querySelectorAll('.icon-btn.copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                alert(`Копирование расчета ID: ${btn.dataset.id} (В разработке)`);
            });
        });

        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`Удаление расчета пока не реализовано на бэкенде.`);
            });
        });
    };

    // --- ВЗАИМОДЕЙСТВИЕ С БЭКЕНДОМ (API) ---
    const fetchClientData = async () => {
        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch(`/api/clients/${clientId}`);
            if (response.ok) {
                currentClient = await response.json();
                renderClientInfo();
            } else {
                alert('Не удалось загрузить данные клиента');
                window.location.href = '../clients/index.html';
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    const fetchCalculationsData = async () => {
        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch(`/api/calculations/?client_id=${clientId}`);
            if (response.ok) {
                clientCalculations = await response.json();
                renderTable();
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    // --- Кнопки копирования в буфер ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copyTarget;
            const textToCopy = document.getElementById(targetId).textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                btn.classList.add('success');
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('success');
                }, 2000);
            });
        });
    });

    // --- Логика Модалки Редактирования ---
    editClientBtn.addEventListener('click', () => {
        inputLastName.value = currentClient.last_name || '';
        inputFirstName.value = currentClient.first_name || '';
        inputMiddleName.value = currentClient.patronymic || '';
        
        let phone = currentClient.phone_number || '';
        if (phone.length === 11) {
            phone = `+${phone[0]} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 9)}-${phone.substring(9, 11)}`;
        }
        inputPhone.value = phone;
        inputEmail.value = currentClient.email || '';
        
        editClientModal.classList.add('active');
        
        document.querySelectorAll('#edit-client-form .input-group input').forEach(input => {
            if (input.value) input.closest('.input-group').classList.add('has-value');
        });
    });

    closeEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    cancelEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    
    // --- ВАЛИДАЦИЯ И ОБНОВЛЕНИЕ КЛИЕНТА (PUT) ---
    const validateEditForm = () => {
        const lastName = inputLastName.value.trim();
        const firstName = inputFirstName.value.trim();
        const phone = inputPhone.value.trim();
        const email = inputEmail.value.trim();

        if (!lastName || !firstName) {
            alert('Поля "Фамилия" и "Имя" обязательны для заполнения.');
            return false;
        }

        const rawPhoneDigits = phone.replace(/\D/g, '');
        if (rawPhoneDigits.length < 11) {
            alert('Введите корректный номер телефона (не менее 11 цифр).');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес.');
            return false;
        }

        return true;
    };

    editClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateEditForm()) return;
        
        const cleanPhone = inputPhone.value.replace(/\D/g, '').substring(0, 11);

        const payload = {
            last_name: inputLastName.value.trim(),
            first_name: inputFirstName.value.trim(),
            patronymic: inputMiddleName.value.trim() || "",
            phone_number: cleanPhone,
            email: inputEmail.value.trim()
        };

        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch(`/api/clients/${clientId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const updatedClient = await response.json();
                currentClient = updatedClient; 
                renderClientInfo();            
                editClientModal.classList.remove('active');
            } else {
                const errorData = await response.json();
                alert(`Ошибка сохранения: ${errorData.detail || 'Проверьте уникальность email и телефона'}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось связаться с сервером.');
        }
    });

    // --- УМНАЯ ЕДИНАЯ МАСКИРОВКА ВВОДА ---
    const onlyLetters = function() { 
        this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, ''); 
    };
    inputLastName.addEventListener('input', onlyLetters);
    inputFirstName.addEventListener('input', onlyLetters);
    inputMiddleName.addEventListener('input', onlyLetters);
    
    const onPhoneInput = function (e) {
        let input = e.target;
        let inputNumbersValue = input.value.replace(/\D/g, '').substring(0, 11);
        let selectionStart = input.selectionStart;
        if (!inputNumbersValue) return input.value = "";
        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue;
            return;
        }
        let formattedInputValue = '+' + inputNumbersValue[0];
        if (inputNumbersValue.length > 1) formattedInputValue += ' (' + inputNumbersValue.substring(1, 4);
        if (inputNumbersValue.length >= 5) formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        if (inputNumbersValue.length >= 8) formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        if (inputNumbersValue.length >= 10) formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) e.target.value = "";
    };

    inputPhone.addEventListener('input', onPhoneInput);
    inputPhone.addEventListener('keydown', onPhoneKeyDown);

    // --- Логика Модалки Создания Расчета ---
    openCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.add('active'));
    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (type === 'frame') window.location.href = `../calc-frame/index.html?clientId=${currentClient.id}`;
            else if (type === 'foundation') window.location.href = `../calc-foundation/index.html?clientId=${currentClient.id}`;
            else if (type === 'roof') window.location.href = `../calc-roof/index.html?clientId=${currentClient.id}`;
            selectCalcModal.classList.remove('active');
        });
    });

    // --- ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    // Обработчик клика по окну для закрытия модалок и поповера
    window.addEventListener('click', (e) => {
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
        
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });

    // Запускаем загрузку данных при открытии страницы
    fetchClientData();
    fetchCalculationsData();
});