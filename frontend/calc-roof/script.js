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

    // --- 3. DOM ЭЛЕМЕНТЫ ---
    const backBtn = document.getElementById('btn-back');
    const form = document.getElementById('calc-roof-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const addressInput = document.getElementById('object-address');
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');

    const roofTypeSelect = document.getElementById('roof-type');
    const rightSlopeGroup = document.getElementById('right-slope-group');
    const rightSlopeInput = document.getElementById('right-slope-length');

    const toggleInsulation = document.getElementById('toggle-insulation');
    const insulationContent = document.getElementById('insulation-content');
    
    const textInputs = document.querySelectorAll('.input-group input');

    // Кнопка "Назад"
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

    // --- 5. УПРАВЛЕНИЕ UI (Лейблы, валидация) ---
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
                if (max && parseFloat(input.value) > max) input.value = max; 
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

    // --- 6. ДИНАМИЧЕСКИЕ СЕКЦИИ И ПРОВЕРКИ ---
    
    // Переключение второго ската
    const updateRoofTypeVisibility = () => {
        if (roofTypeSelect.value === 'Двускатная') {
            rightSlopeGroup.style.display = 'block';
            rightSlopeInput.setAttribute('required', 'true');
        } else {
            rightSlopeGroup.style.display = 'none';
            rightSlopeInput.removeAttribute('required');
            rightSlopeInput.value = ''; // Очищаем значение, чтобы не улетело скрытое
            updateLabelState(rightSlopeInput);
        }
    };
    roofTypeSelect.addEventListener('change', updateRoofTypeVisibility);
    updateRoofTypeVisibility();

    // Переключение утепления
    toggleInsulation.addEventListener('change', (e) => {
        insulationContent.style.display = e.target.checked ? 'flex' : 'none';
    });

    const validateNumber = (id, name, isRequired = true) => {
        const input = document.getElementById(id);
        
        // Пропускаем проверку, если поле скрыто
        if (input.closest('.input-group') && input.closest('.input-group').style.display === 'none') {
            return true;
        }

        const val = parseFloat(input.value);
        if (isNaN(val) && isRequired) {
            alert(`Пожалуйста, заполните поле "${name}".`);
            input.focus();
            return false;
        }

        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));

        if (!isNaN(val) && (val < min || val > max)) {
            alert(`Значение в поле "${name}" должно быть от ${min} до ${max}.`);
            input.focus();
            return false;
        }

        return true;
    };

    // --- 7. ПОДГОТОВКА И ОТПРАВКА ДАННЫХ (API) ---
    const getSelectIntOrNull = (id) => {
        const val = document.getElementById(id).value;
        return (val && val !== 'none') ? parseInt(val) : null;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Валидация базовых полей
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        if (!validateNumber('slope-width', 'Ширина ската')) return;
        if (!validateNumber('left-slope-length', 'Длина (основного/левого) ската')) return;
        
        const roofType = roofTypeSelect.value;
        if (roofType === 'Двускатная') {
            if (!validateNumber('right-slope-length', 'Длина правого ската')) return;
        }

        const isInsulated = toggleInsulation.checked;
        if (isInsulated) {
            if (!validateNumber('insulation-thickness', 'Толщина утепления')) return;
        }

        const initRoof = {
            slope_width: parseFloat(document.getElementById('slope-width').value),
            left_slope_length: parseFloat(document.getElementById('left-slope-length').value),
            roof_type: roofType
        };

        if (roofType === 'Двускатная') {
            initRoof.right_slope_length = parseFloat(document.getElementById('right-slope-length').value);
        } else {
            initRoof.right_slope_length = null;
        }

        const roofModification = {
            osb_id: getSelectIntOrNull('osb-id'),
            water_proofing_id: getSelectIntOrNull('water-proofing-id'),
            insulation_id: isInsulated ? getSelectIntOrNull('insulation-id') : null,
            insulation_thickness: isInsulated ? parseFloat(document.getElementById('insulation-thickness').value) : 0 
        };

        const payload = {
            client_id: parseInt(clientId),
            address: addressInput.value.trim(),
            construction_element: {
                roof: {
                    init_roof: initRoof,
                    roof_modification: roofModification
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
                alert(`Ошибка сервера: ${errorData.detail || JSON.stringify(errorData)}`);
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
            toggleInsulation.dispatchEvent(new Event('change'));
            roofTypeSelect.dispatchEvent(new Event('change'));
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