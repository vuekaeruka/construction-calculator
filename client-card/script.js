document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const currentClient = {
        id: 1,
        lastName: 'Тестовый',
        firstName: 'Тест',
        middleName: 'Тестович',
        phone: '+7 (900) 000-00-00',
        email: 'test@example.com'
    };

    // Моковые данные уже созданных расчетов
    let clientCalculations = [
        { id: 101, name: 'Расчет №101', type: 'Каркас', date: '02.02.2026', status: 'active', address: 'г. Ульяновск, ул. Тестовая, д. 35' },
        { id: 102, name: 'Расчет №102', type: 'Фундамент', date: '03.02.2026', status: 'inactive', address: 'г. Ульяновск, ул. Тестовая, д. 35' },
        { id: 103, name: 'Расчет №103', type: 'Крыша', date: '04.02.2026', status: 'contract', address: 'г. Ульяновск, ул. Тестовая, д. 35' }
    ];

    // --- DOM Элементы ---
    const displayName = document.getElementById('display-name');
    const displayPhone = document.getElementById('display-phone');
    const displayEmail = document.getElementById('display-email');
    const editClientBtn = document.getElementById('edit-client-btn');
    
    const editClientModal = document.getElementById('edit-client-modal');
    const editClientForm = document.getElementById('edit-client-form');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    
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

    // --- Функции рендеринга ---
    const renderClientInfo = () => {
        displayName.textContent = `${currentClient.lastName} ${currentClient.firstName} ${currentClient.middleName || ''}`.trim();
        displayPhone.textContent = currentClient.phone || 'Не указан';
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
            tr.style.cursor = 'pointer'; // Делаем строку визуально кликабельной
            
            let statusBadge = '';
            if (calc.status === 'active') statusBadge = '<span class="badge active">Актуален</span>';
            else if (calc.status === 'inactive') statusBadge = '<span class="badge inactive">Не актуален</span>';
            else if (calc.status === 'contract') statusBadge = '<span class="badge contract">Заключен договор</span>';

            // ИМЕННО ЗДЕСЬ мы формируем ссылку на страницу результатов расчета
            const calcUrl = `../calculation/index.html?clientId=${currentClient.id}&calcId=${calc.id}`;

            tr.innerHTML = `
                <td onclick="window.location.href='${calcUrl}'">
                    <strong>${calc.name}</strong><br>
                    <span style="font-size: 12px; color: var(--text-secondary)">${calc.type}</span>
                </td>
                <td onclick="window.location.href='${calcUrl}'">${calc.date}</td>
                <td onclick="window.location.href='${calcUrl}'">${statusBadge}</td>
                <td onclick="window.location.href='${calcUrl}'">${calc.address}</td>
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

        // Обработчики для кнопок внутри строки (чтобы не срабатывал переход по строке)
        document.querySelectorAll('.icon-btn.copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                alert(`Копирование расчета ID: ${btn.dataset.id}`);
            });
        });

        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if(confirm('Вы уверены, что хотите удалить этот расчет?')) {
                    clientCalculations = clientCalculations.filter(c => c.id != btn.dataset.id);
                    renderTable();
                }
            });
        });
    };

    // --- Логика копирования текста ---
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
            }).catch(err => console.error('Ошибка копирования: ', err));
        });
    });

    // --- Логика Модалки Редактирования ---
    editClientBtn.addEventListener('click', () => {
        inputLastName.value = currentClient.lastName;
        inputFirstName.value = currentClient.firstName;
        inputMiddleName.value = currentClient.middleName || '';
        inputPhone.value = currentClient.phone || '';
        inputEmail.value = currentClient.email || '';
        
        editClientModal.classList.add('active');
    });

    closeEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    
    const validateEditForm = () => {
        const lastName = inputLastName.value.trim();
        const firstName = inputFirstName.value.trim();
        const middleName = inputMiddleName.value.trim();
        const phone = inputPhone.value.trim();
        const email = inputEmail.value.trim();

        const hasDigits = /\d/;
        if (hasDigits.test(lastName) || hasDigits.test(firstName) || hasDigits.test(middleName) || !lastName || !firstName) {
            alert('Пожалуйста, введите корректные ФИО. Использование цифр недопустимо, поля "Имя" и "Фамилия" обязательны.');
            return false;
        }

        const phoneRegex = /^[\+\(\)\- \d]{7,18}$/;
        if (!phoneRegex.test(phone) || /[a-zA-Zа-яА-Я]/.test(phone)) {
            alert('Введите корректный номер телефона. Разрешены только цифры и символы + ( ) -');
            inputPhone.focus();
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес.');
            inputEmail.focus();
            return false;
        }

        return true;
    };

    editClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateEditForm()) return;
        
        currentClient.lastName = inputLastName.value;
        currentClient.firstName = inputFirstName.value;
        currentClient.middleName = inputMiddleName.value;
        currentClient.phone = inputPhone.value;
        currentClient.email = inputEmail.value;
        
        renderClientInfo();
        editClientModal.classList.remove('active');
    });

    const removeDigits = function() { this.value = this.value.replace(/\d/g, ''); };
    inputLastName.addEventListener('input', removeDigits);
    inputFirstName.addEventListener('input', removeDigits);
    inputMiddleName.addEventListener('input', removeDigits);
    inputPhone.addEventListener('input', function() { this.value = this.value.replace(/[a-zA-Zа-яА-Я]/g, ''); });

    // --- Логика Модалки Создания Расчета ---
    openCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.add('active'));
    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            
            // Клик по созданию НОВОГО расчета переводит на формы
            if (type === 'frame') window.location.href = `../calc-frame/index.html?clientId=${currentClient.id}`;
            else if (type === 'foundation') window.location.href = `../calc-foundation/index.html?clientId=${currentClient.id}`;
            else if (type === 'roof') window.location.href = `../calc-roof/index.html?clientId=${currentClient.id}`;
            
            selectCalcModal.classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === editClientModal) editClientModal.classList.remove('active');
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
    });

    // Первичная отрисовка
    renderClientInfo();
    renderTable();
});