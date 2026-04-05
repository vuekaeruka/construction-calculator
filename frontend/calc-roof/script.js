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

    // НОВАЯ ФУНКЦИЯ: Динамическая загрузка материалов из базы данных бэкенда
    const loadMaterials = async () => {
        try {
            const response = await fetch('/api/materials/');
            if (response.ok) {
                const materials = await response.json();
                
                // Находим все селекты, в которых прописан атрибут data-category-name
                const selects = document.querySelectorAll('select[data-category-name]');
                
                selects.forEach(select => {
                    const categoryName = select.getAttribute('data-category-name').toLowerCase();
                    
                    // Ищем опцию 'none' (чтобы сохранить её, например "Без ОСБ")
                    const noneOption = Array.from(select.options).find(opt => opt.value === 'none');
                    
                    select.innerHTML = ''; // Очищаем жестко заданные старые опции
                    if (noneOption) select.appendChild(noneOption);
                    
                    // Фильтруем материалы, пришедшие от бэкенда, по имени категории
                    const filteredMaterials = materials.filter(m => 
                        m.category && m.category.name.toLowerCase().includes(categoryName)
                    );
                    
                    // Добавляем актуальные материалы в выпадающий список
                    filteredMaterials.forEach(mat => {
                        const option = document.createElement('option');
                        option.value = mat.id;
                        option.textContent = mat.name; // Можно добавить цену: + ` (${mat.market_price} ₽)`
                        select.appendChild(option);
                    });
                });
            }
        } catch (error) {
            console.error('Ошибка загрузки материалов:', error);
        }
    };

    loadClientData();
    loadCalculationData();
    loadMaterials(); // Вызываем загрузку материалов

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
    const updateRoofTypeVisibility = () => {
        if (roofTypeSelect.value === 'Двускатная') {
            rightSlopeGroup.style.display = 'block';
            rightSlopeInput.setAttribute('required', 'true');
        } else {
            rightSlopeGroup.style.display = 'none';
            rightSlopeInput.removeAttribute('required');
            rightSlopeInput.value = ''; // Очищаем значение
            updateLabelState(rightSlopeInput);
        }
    };
    roofTypeSelect.addEventListener('change', updateRoofTypeVisibility);
    updateRoofTypeVisibility();

    toggleInsulation.addEventListener('change', (e) => {
        insulationContent.style.display = e.target.checked ? 'flex' : 'none';
    });

    const validateNumber = (id, name) => {
        const input = document.getElementById(id);
        
        if (input.offsetParent === null) {
            return true;
        }

        const val = parseFloat(input.value);
        if (isNaN(val)) {
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
        return (val && val !== 'none' && val !== '') ? parseInt(val) : null;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        if (!validateNumber('slope-width', 'Ширина ската')) return;
        if (!validateNumber('left-slope-length', 'Длина (основного/левого) ската')) return;
        if (!validateNumber('right-slope-length', 'Длина правого ската')) return; 
        if (!validateNumber('insulation-thickness', 'Толщина утепления')) return;

        const roofType = roofTypeSelect.value;
        const isInsulated = toggleInsulation.checked;

        const initRoof = {
            slope_width: parseFloat(document.getElementById('slope-width').value),
            left_slope_length: parseFloat(document.getElementById('left-slope-length').value),
            roof_type: roofType,
            right_slope_length: roofType === 'Двускатная' 
                ? parseFloat(document.getElementById('right-slope-length').value) 
                : null
        };

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
        const url = calcId ? `/api/calculations/${calcId}` : `/api/calculations/`;

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