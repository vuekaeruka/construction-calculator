document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ПАРАМЕТРЫ URL И ИНИЦИАЛИЗАЦИЯ ---
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
    const form = document.getElementById('calc-frame-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const submitBtn = document.getElementById('submit-btn');

    const addressInput = document.getElementById('object-address');
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');

    const toggleDoorsWindows = document.getElementById('toggle-doors-windows');
    const doorsWindowsContent = document.getElementById('doors-windows-content');
    
    const toggleFloors = document.getElementById('toggle-floors');
    const floorsContent = document.getElementById('floors-content');

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

    // --- 5. УПРАВЛЕНИЕ UI И ВАЛИДАЦИЯ ПОЛЕЙ ---
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

    // --- 6. РАСКРЫВАЮЩИЕСЯ СЕКЦИИ ---
    toggleDoorsWindows.addEventListener('change', (e) => {
        if (e.target.checked) {
            doorsWindowsContent.classList.add('active');
        } else {
            doorsWindowsContent.classList.remove('active');
            resetDynamicRows();
        }
    });

    toggleFloors.addEventListener('change', (e) => {
        if (e.target.checked) {
            floorsContent.classList.add('active');
        } else {
            floorsContent.classList.remove('active');
            floorsContent.querySelectorAll('input').forEach(input => {
                input.value = '';
                updateLabelState(input);
            });
        }
    });

    // --- 7. ДИНАМИЧЕСКИЕ ПРОЕМЫ ---
    const getProemRowTemplate = (type) => {
        const removeIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
        return `
            <div class="input-group">
                <input type="number" name="${type}-height[]" placeholder=" " min="0.3" max="5" step="0.01">
                <label>Высота, м</label>
            </div>
            <div class="input-group">
                <input type="number" name="${type}-width[]" placeholder=" " min="0.3" max="5" step="0.01">
                <label>Ширина, м</label>
            </div>
            <div class="input-group">
                <input type="number" name="${type}-quantity[]" placeholder=" " min="1" max="100">
                <label>Кол-во</label>
            </div>
            <button type="button" class="icon-btn remove-proem" title="Удалить">
                ${removeIcon}
            </button>
        `;
    };

    doorsWindowsContent.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        if (target.classList.contains('add-proem')) {
            const container = target.closest('.proem-rows-container');
            const type = container.dataset.proemType; 
            const newRow = document.createElement('div');
            newRow.className = 'proem-row';
            newRow.innerHTML = getProemRowTemplate(type);
            container.appendChild(newRow);
            
            newRow.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => updateLabelState(input));
                input.addEventListener('focus', () => input.closest('.input-group').classList.add('is-focused'));
                input.addEventListener('blur', () => {
                    input.closest('.input-group').classList.remove('is-focused');
                    updateLabelState(input);
                });
            });
        }

        if (target.classList.contains('remove-proem')) {
            target.closest('.proem-row').remove();
        }
    });

    const resetDynamicRows = () => {
        doorsWindowsContent.querySelectorAll('.proem-rows-container').forEach(container => {
            const rows = container.querySelectorAll('.proem-row');
            rows.forEach((row, index) => {
                if (index === 0) {
                    row.querySelectorAll('input').forEach(input => { input.value = ''; updateLabelState(input); });
                } else {
                    row.remove();
                }
            });
        });
    };

    // --- 8. ПОДГОТОВКА И ОТПРАВКА ДАННЫХ (API) ---
    const getSelectIntOrNull = (id) => {
        const val = document.getElementById(id).value;
        return (val && val !== 'none') ? parseInt(val) : null;
    };

    const getOpenings = (type) => {
        const container = document.querySelector(`.proem-rows-container[data-proem-type="${type}"]`);
        if (!container) return null;
        const rows = container.querySelectorAll('.proem-row');
        const openings = [];
        rows.forEach(row => {
            const h = parseFloat(row.querySelector(`input[name="${type}-height[]"]`).value);
            const w = parseFloat(row.querySelector(`input[name="${type}-width[]"]`).value);
            const q = parseInt(row.querySelector(`input[name="${type}-quantity[]"]`).value);
            if (!isNaN(h) && !isNaN(w) && !isNaN(q)) {
                openings.push({ height: h, width: w, quantity: q });
            }
        });
        return openings.length > 0 ? openings : null;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        // 1. Собираем InitFrame
        const initFrame = {
            wall_height: parseFloat(document.getElementById('wall-height').value) || 0,
            ext_wall_perimeter: parseFloat(document.getElementById('perimeter').value) || 0,
            floor_slab_area: parseFloat(document.getElementById('floor-slab-area').value) || 0,
            int_wall_length: parseFloat(document.getElementById('int-wall-length').value) || 0,
            int_wall_thickness: parseInt(document.getElementById('int-wall-thickness').value) || 0,
            ext_wall_thickness: parseInt(document.getElementById('ext-wall-thickness').value) || 0,
            floor_slab_thickness: 0
        };

        // 2. Собираем ExtWallCladding
        const extWallCladding = {
            osb_id: parseInt(document.getElementById('ext-osb-type').value), // Required по схеме бэкенда
            steam_water_proofing_id: getSelectIntOrNull('ext-vapor-barrier'),
            wind_protection_id: getSelectIntOrNull('ext-wind-protection'),
            insulation_id: getSelectIntOrNull('ext-insulation'),
            insulation_thickness: parseFloat(document.getElementById('ext-insulation-thickness').value) || 0
        };

        // 3. Собираем IntWallCladding
        const intOsbId = getSelectIntOrNull('int-osb-type');
        const intWallCladding = intOsbId ? { osb_id: intOsbId } : null;

        // 4. Собираем FloorSlab если включен
        let floorSlab = null;
        if (toggleFloors.checked) {
            initFrame.floor_slab_thickness = parseInt(document.getElementById('floor-thickness').value) || 0;
            if (!initFrame.floor_slab_thickness) {
                alert('Пожалуйста, укажите толщину перекрытия.');
                document.getElementById('floor-thickness').focus();
                return;
            }
            floorSlab = {
                osb_id: getSelectIntOrNull('floor-osb'),
                steam_water_proofing_id: getSelectIntOrNull('floor-vapor'),
                wind_protection_id: getSelectIntOrNull('floor-wind'),
                insulation_id: getSelectIntOrNull('floor-insulation')
            };
        }

        // Собираем общий Payload
        const payload = {
            client_id: parseInt(clientId),
            address: addressInput.value.trim(),
            construction_element: {
                frame: {
                    init_frame: initFrame,
                    ext_wall_cladding: extWallCladding,
                    int_wall_cladding: intWallCladding,
                    windows: toggleDoorsWindows.checked ? getOpenings('window') : null,
                    ext_doorways: toggleDoorsWindows.checked ? getOpenings('ext-door') : null,
                    int_doorways: toggleDoorsWindows.checked ? getOpenings('int-door') : null,
                    floor_slab: floorSlab
                }
            }
        };

        // Отправка на Бэкенд
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
            doorsWindowsContent.classList.remove('active');
            floorsContent.classList.remove('active');
            resetDynamicRows();
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });

    // --- 9. ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    // Закрытие поповера при клике вне его
    window.addEventListener('click', (e) => {
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });
});