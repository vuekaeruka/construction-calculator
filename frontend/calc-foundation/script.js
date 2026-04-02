document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ИНИЦИАЛИЗАЦИЯ И URL ПАРАМЕТРЫ ---
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId');
    const calcId = urlParams.get('calcId');
    
    if (!clientId) {
        alert('Ошибка: клиент не выбран. Возврат к списку клиентов.');
        window.location.href = '../clients/index.html';
        return;
    }

    // --- 2. ЗАГРУЗКА ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ И ЛОГИКА ВЫХОДА ---
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

    // --- 3. DOM ЭЛЕМЕНТЫ ФОРМЫ ---
    const backBtn = document.getElementById('btn-back');
    const form = document.getElementById('calc-foundation-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const addressInput = document.getElementById('object-address');
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');

    const foundationTypeSelect = document.getElementById('foundation-type');
    const stripParams = document.getElementById('strip-params');
    const pileParams = document.getElementById('pile-params');

    const toggleRebar = document.getElementById('toggle-rebar');
    const rebarContent = document.getElementById('rebar-content');
    
    const textInputs = document.querySelectorAll('.input-group input');

    // Настройка кнопки "Назад"
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (calcId) {
            window.location.href = `../calculation/index.html?clientId=${clientId}&calcId=${calcId}`;
        } else {
            window.location.href = `../client-card/index.html?id=${clientId}`;
        }
    });

    // --- 4. ЗАГРУЗКА ДАННЫХ ИЗ API ---
    const loadClientData = async () => {
        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch(`/api/clients/${clientId}`);
            if (response.ok) {
                const client = await response.json();
                const fullName = `${client.last_name || ''} ${client.first_name || ''} ${client.patronymic || ''}`.trim();
                clientNameEl.textContent = fullName || 'Имя не указано';
                
                let phone = client.phone_number || '';
                if (phone.length === 11) {
                    phone = `+${phone[0]} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 9)}-${phone.substring(9, 11)}`;
                }
                clientPhoneEl.textContent = phone ? `тел. ${phone}` : 'телефон не указан';
            } else {
                clientNameEl.textContent = 'Клиент не найден';
            }
        } catch (error) {
            console.error('Ошибка при получении клиента:', error);
            clientNameEl.textContent = 'Ошибка загрузки';
        }
    };

    const loadCalculationData = async () => {
        if (!calcId) return;
        
        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch(`/api/calculations/${calcId}`);
            if (response.ok) {
                const calc = await response.json();
                if (calc.address) {
                    addressInput.value = calc.address;
                    addressInput.closest('.input-group').classList.add('has-value');
                }
            }
        } catch (error) {
            console.error('Ошибка при получении данных расчета:', error);
        }
    };

    loadClientData();
    loadCalculationData();

    // --- 5. УПРАВЛЕНИЕ UI (Лейблы, валидация полей ввода) ---
    const updateLabelState = (input) => {
        const group = input.closest('.input-group');
        if (input.value.trim() !== '') {
            group.classList.add('has-value');
        } else {
            group.classList.remove('has-value');
        }
    };

    textInputs.forEach(input => {
        updateLabelState(input);

        if (input.type === 'number') {
            input.addEventListener('keydown', (e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
            });

            input.addEventListener('input', () => {
                const max = parseFloat(input.getAttribute('max'));
                if (max && parseFloat(input.value) > max) {
                    input.value = max; 
                }
                updateLabelState(input);
            });
        } else {
            input.addEventListener('input', () => updateLabelState(input));
        }
        
        input.addEventListener('focus', () => input.closest('.input-group').classList.add('is-focused'));
        input.addEventListener('blur', () => {
            input.closest('.input-group').classList.remove('is-focused');
            updateLabelState(input);
        });
    });

    // --- 6. РАСКРЫВАЮЩИЕСЯ СЕКЦИИ ---
    foundationTypeSelect.addEventListener('change', (e) => {
        stripParams.style.display = 'none';
        pileParams.style.display = 'none';
        
        if (e.target.value === 'strip') {
            stripParams.style.display = 'flex';
        } else if (e.target.value === 'pile') {
            pileParams.style.display = 'flex';
        }
    });

    toggleRebar.addEventListener('change', (e) => {
        rebarContent.style.display = e.target.checked ? 'flex' : 'none';
    });

    // --- 7. ВАЛИДАЦИЯ И ОТПРАВКА ДАННЫХ (SUBMIT) ---
    const validateNumber = (id, name) => {
        const input = document.getElementById(id);
        const val = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));

        if (isNaN(val)) {
            alert(`Пожалуйста, заполните поле "${name}".`);
            input.focus();
            return false;
        }

        if (val < min || val > max) {
            alert(`Значение в поле "${name}" должно быть от ${min} до ${max}.`);
            input.focus();
            return false;
        }

        return true;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверки
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        if (!validateNumber('build-length', 'Общая длина строения')) return;
        if (!validateNumber('build-width', 'Общая ширина строения')) return;

        const type = foundationTypeSelect.value;
        let heightValue = 0.3; 
        
        if (type === 'strip') {
            if (!validateNumber('strip-total-length', 'Общая длина ленты')) return;
            if (!validateNumber('strip-width', 'Ширина ленты')) return;
            if (!validateNumber('strip-depth', 'Глубина заложения')) return;
            if (!validateNumber('strip-height', 'Высота цоколя')) return;
            
            const depth = parseFloat(document.getElementById('strip-depth').value);
            const height = parseFloat(document.getElementById('strip-height').value);
            heightValue = depth + height;
        } else if (type === 'pile') {
            if (!validateNumber('pile-count', 'Количество свай')) return;
            if (!validateNumber('pile-length', 'Длина сваи')) return;
            
            heightValue = parseFloat(document.getElementById('pile-length').value);
        }

        if (!validateNumber('sand-cushion', 'Песчаная подушка')) return;

        const length = parseFloat(document.getElementById('build-length').value);
        const width = parseFloat(document.getElementById('build-width').value);

        // Формирование Payload
        const payload = {
            client_id: parseInt(clientId),
            address: addressInput.value.trim(),
            construction_element: {
                foundation: {
                    width: width,
                    length: length,
                    height: heightValue,
                    step_rebar: 0.2,       
                    rebar_length: length,   
                    board_length: 6.0,      
                    board_width: 0.15      
                }
            }
        };

        const method = calcId ? 'PUT' : 'POST';
        
        // ИЗМЕНЕНО: относительный путь к API
        const url = calcId 
            ? `/api/calculations/${calcId}` 
            : `/api/calculations/`;

        try {
            submitBtn.textContent = 'Обработка...';
            submitBtn.disabled = true;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                const targetCalcId = data.id || calcId; 
                window.location.href = `../calculation/index.html?clientId=${clientId}&calcId=${targetCalcId}`;
            } else {
                const errorData = await response.json();
                alert(`Ошибка сервера: ${errorData.detail || 'Не удалось сохранить расчет'}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('Сбой соединения с сервером. Проверьте подключение.');
        } finally {
            submitBtn.textContent = 'Рассчитать';
            submitBtn.disabled = false;
        }
    });

    clearBtn.addEventListener('click', () => {
        if(confirm('Вы уверены, что хотите сбросить все введенные данные?')) {
            form.reset(); 
            foundationTypeSelect.dispatchEvent(new Event('change')); 
            toggleRebar.dispatchEvent(new Event('change'));
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });

    // --- 8. ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });
});