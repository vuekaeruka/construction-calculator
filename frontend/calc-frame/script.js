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

    // Динамическая подгрузка материалов (Синхронизация с БД)
    const loadMaterials = async () => {
        try {
            const response = await fetch('/api/materials/');
            if (response.ok) {
                const materials = await response.json();
                const selects = document.querySelectorAll('select[data-category-name]');
                
                selects.forEach(select => {
                    const categoryName = select.getAttribute('data-category-name').toLowerCase();
                    const noneOption = Array.from(select.options).find(opt => opt.value === 'none');
                    
                    select.innerHTML = ''; 
                    if (noneOption) select.appendChild(noneOption);
                    
                    const filteredMaterials = materials.filter(m => 
                        m.category && m.category.name.toLowerCase().includes(categoryName)
                    );
                    
                    filteredMaterials.forEach(mat => {
                        const option = document.createElement('option');
                        option.value = mat.id;
                        option.textContent = mat.name; 
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
    loadMaterials();

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

    // --- 6. РАСКРЫВАЮЩИЕСЯ СЕКЦИИ ---
    toggleDoorsWindows.addEventListener('change', (e) => {
        if (e.target.checked) {
            doorsWindowsContent.classList.add('active');
        } else {
            doorsWindowsContent.classList.remove('active');
            resetDynamicRows();
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
        return (val && val !== 'none' && val !== '') ? parseInt(val) : null;
    };

    // Валидация нулевых и пустых значений в проемах
    const validateOpenings = (type, label) => {
        const container = document.querySelector(`.proem-rows-container[data-proem-type="${type}"]`);
        if (!container) return true;
        
        const rows = container.querySelectorAll('.proem-row');
        for (let row of rows) {
            const hInput = row.querySelector(`input[name="${type}-height[]"]`);
            const wInput = row.querySelector(`input[name="${type}-width[]"]`);
            const qInput = row.querySelector(`input[name="${type}-quantity[]"]`);

            const hStr = hInput.value.trim();
            const wStr = wInput.value.trim();
            const qStr = qInput.value.trim();

            if (hStr === '' && wStr === '' && qStr === '') continue;

            const h = parseFloat(hStr);
            const w = parseFloat(wStr);
            const q = parseInt(qStr);

            if (isNaN(h) || h <= 0) {
                alert(`Некорректная высота в секции "${label}". Размеры должны быть больше 0.`);
                hInput.focus();
                return false;
            }
            if (isNaN(w) || w <= 0) {
                alert(`Некорректная ширина в секции "${label}". Размеры должны быть больше 0.`);
                wInput.focus();
                return false;
            }
            if (isNaN(q) || q <= 0) {
                alert(`Некорректное количество в секции "${label}". Должно быть больше 0.`);
                qInput.focus();
                return false;
            }
        }
        return true;
    };

    // Подсчет суммарной ширины проемов одного типа с учетом количества (включая динамические строки)
    const getTotalOpeningsWidth = (type) => {
        const container = document.querySelector(`.proem-rows-container[data-proem-type="${type}"]`);
        if (!container) return 0;
        const rows = container.querySelectorAll('.proem-row');
        let totalWidth = 0;
        rows.forEach(row => {
            const wStr = row.querySelector(`input[name="${type}-width[]"]`).value.trim();
            const qStr = row.querySelector(`input[name="${type}-quantity[]"]`).value.trim();
            if (wStr !== '' && qStr !== '') {
                const w = parseFloat(wStr);
                const q = parseInt(qStr);
                if (!isNaN(w) && !isNaN(q) && w > 0 && q > 0) {
                    totalWidth += (w * q);
                }
            }
        });
        return totalWidth;
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
            
            if (!isNaN(h) && h > 0 && !isNaN(w) && w > 0 && !isNaN(q) && q > 0) {
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

        if (!validateNumber('wall-height', 'Высота этажа')) return;
        if (!validateNumber('perimeter', 'Периметр внешних стен')) return;
        if (!validateNumber('floor-slab-area', 'Площадь основания (перекрытия)')) return;
        if (!validateNumber('int-wall-length', 'Длина внутренних стен')) return;

        // Извлечение значений для кросс-валидаций
        const perimeterInput = document.getElementById('perimeter');
        const perimeter = parseFloat(perimeterInput.value) || 0;

        const intWallLengthInput = document.getElementById('int-wall-length');
        const intWallLength = parseFloat(intWallLengthInput.value) || 0;

        // Длина внутренних стен не должна быть больше периметра внешних
        if (intWallLength > perimeter) {
            alert('Длина внутренних стен не может превышать периметр внешних стен.');
            intWallLengthInput.focus();
            return;
        }

        const intWallThicknessSelect = document.getElementById('int-wall-thickness');
        const intWallThickness = parseInt(intWallThicknessSelect.value) || 0;

        if (intWallThickness > 0 && intWallLength <= 0) {
            alert('Если выбрана толщина внутренних стен, необходимо указать их длину больше 0.');
            intWallLengthInput.focus();
            return;
        }

        if (intWallLength > 0 && intWallThickness === 0) {
            alert('Если указана длина внутренних стен, необходимо выбрать их толщину.');
            intWallThicknessSelect.focus();
            return;
        }

        // Строгая валидация проемов и их суммарных размеров
        if (toggleDoorsWindows.checked) {
            if (!validateOpenings('ext-door', 'Внешние двери')) return;
            if (!validateOpenings('int-door', 'Внутренние двери')) return;
            if (!validateOpenings('window', 'Оконные проемы')) return;

            // БАГФИКС: Проверка суммарной ширины внешних проемов
            const totalExtDoorsWidth = getTotalOpeningsWidth('ext-door');
            const totalWindowsWidth = getTotalOpeningsWidth('window');
            const totalExtOpeningsWidth = totalExtDoorsWidth + totalWindowsWidth;

            if (totalExtOpeningsWidth >= perimeter) {
                alert(`Суммарная ширина внешних дверей и окон (${totalExtOpeningsWidth.toFixed(2)} м) не может превышать или быть равной периметру внешних стен (${perimeter.toFixed(2)} м).`);
                return;
            }

            // БАГФИКС: Проверка суммарной ширины внутренних дверей
            const totalIntDoorsWidth = getTotalOpeningsWidth('int-door');
            if (intWallLength > 0 && totalIntDoorsWidth >= intWallLength) {
                alert(`Суммарная ширина внутренних дверей (${totalIntDoorsWidth.toFixed(2)} м) не может превышать или быть равной длине внутренних стен (${intWallLength.toFixed(2)} м).`);
                return;
            } else if (intWallLength === 0 && totalIntDoorsWidth > 0) {
                alert('Невозможно добавить внутренние двери, так как длина внутренних стен равна 0.');
                return;
            }
        }

        // Обязательная валидация перекрытий
        if (!validateNumber('floor-thickness', 'Толщина перекрытия')) return;

        const extInsulationId = getSelectIntOrNull('ext-insulation');
        if (extInsulationId !== null) {
            if (!validateNumber('ext-insulation-thickness', 'Толщина утеплителя (внешние стены)')) return;
        }

        // ОСБ внешних стен обязательно
        const extOsbId = document.getElementById('ext-osb-type').value;
        if (!extOsbId || extOsbId === 'none') {
            alert('Пожалуйста, выберите ОСБ для внешних стен (обязательно).');
            document.getElementById('ext-osb-type').focus();
            return;
        }

        // ОСБ перекрытий обязательно
        const floorOsbId = document.getElementById('floor-osb').value;
        if (!floorOsbId || floorOsbId === 'none') {
            alert('Пожалуйста, выберите ОСБ для перекрытий (обязательно).');
            document.getElementById('floor-osb').focus();
            return;
        }

        // Компенсация бага бэкенда при расчете объема досок
        const correctedIntWallThickness = intWallThickness > 0 ? (intWallThickness / 2) : 0;

        // 1. Собираем InitFrame
        const initFrame = {
            wall_height: parseFloat(document.getElementById('wall-height').value),
            ext_wall_perimeter: perimeter,
            floor_slab_area: parseFloat(document.getElementById('floor-slab-area').value),
            int_wall_length: intWallLength,
            int_wall_thickness: correctedIntWallThickness, 
            ext_wall_thickness: parseInt(document.getElementById('ext-wall-thickness').value) || 0,
            floor_slab_thickness: parseInt(document.getElementById('floor-thickness').value)
        };

        // 2. Собираем ExtWallCladding
        const extWallCladding = {
            osb_id: parseInt(extOsbId),
            steam_water_proofing_id: getSelectIntOrNull('ext-vapor-barrier'),
            wind_protection_id: getSelectIntOrNull('ext-wind-protection'),
            insulation_id: extInsulationId,
            insulation_thickness: extInsulationId ? parseFloat(document.getElementById('ext-insulation-thickness').value) : 0
        };

        // 3. Собираем IntWallCladding
        const intOsbId = getSelectIntOrNull('int-osb-type');
        const intWallCladding = intOsbId ? { osb_id: intOsbId } : null;

        // 4. Собираем FloorSlab 
        const floorSlab = {
            osb_id: parseInt(floorOsbId),
            steam_water_proofing_id: getSelectIntOrNull('floor-vapor'),
            wind_protection_id: getSelectIntOrNull('floor-wind'),
            insulation_id: getSelectIntOrNull('floor-insulation')
        };

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
            doorsWindowsContent.classList.remove('active');
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

    window.addEventListener('click', (e) => {
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });
});