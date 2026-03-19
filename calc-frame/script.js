document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ИНИЦИАЛИЗАЦИЯ ДАННЫХ И УМНАЯ КНОПКА "НАЗАД" ---
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId') || '1';
    const calcId = urlParams.get('calcId');
    const backBtn = document.querySelector('.btn-back');

    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.history.length > 1 && document.referrer) {
                window.history.back();
            } else {
                if (calcId) {
                    window.location.href = `../calculation/index.html?clientId=${clientId}&calcId=${calcId}`;
                } else {
                    window.location.href = `../client-card/index.html?id=${clientId}`;
                }
            }
        });
    }

    const form = document.getElementById('calc-frame-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const addressInput = document.getElementById('object-address');

    const toggleDoorsWindows = document.getElementById('toggle-doors-windows');
    const doorsWindowsContent = document.getElementById('doors-windows-content');
    
    const toggleFloors = document.getElementById('toggle-floors');
    const floorsContent = document.getElementById('floors-content');

    const textInputs = document.querySelectorAll('.input-group input');

    // --- 2. Управление лейблами и ограничение ввода ---
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

        // БЛОКИРОВКА ВВОДА: Разрешаем только цифры
        if (input.type === 'number') {
            input.addEventListener('keydown', (e) => {
                // Запрещаем буквы 'e', 'E' и знаки '+' и '-'
                if (['e', 'E', '+', '-'].includes(e.key)) {
                    e.preventDefault();
                }
            });

            // Авто-обрезка значений, если они больше max
            input.addEventListener('input', () => {
                const max = parseFloat(input.getAttribute('max'));
                if (max && parseFloat(input.value) > max) {
                    input.value = max; // Сбрасываем до максимума
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

    // --- 3. Раскрывающиеся секции ---
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

    // --- 4. Кнопки и ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ ---
    
    // Вспомогательная функция проверки рядов (Двери/Окна)
    const validateDimensionsRow = (hId, wId, qId, name) => {
        const h = document.getElementById(hId).value;
        const w = document.getElementById(wId).value;
        const q = document.getElementById(qId).value;
        
        // Считаем, сколько полей из 3-х заполнено
        const filledCount = (h ? 1 : 0) + (w ? 1 : 0) + (q ? 1 : 0);
        
        // Если заполнено 1 или 2 поля, но не все 3 — это ошибка
        if (filledCount > 0 && filledCount < 3) {
            return `Пожалуйста, заполните все 3 параметра (Высота, Ширина, Кол-во) для раздела "${name}"`;
        }
        return null;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Проверка адреса перед расчетом
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        // Валидация блока "Двери и Окна"
        if (toggleDoorsWindows.checked) {
            if (!validateAllDynamicRows()) {
                return; // Останавливаем отправку, если валидация провалена
            }
        }

        // Валидация блока "Перекрытия"
        if (toggleFloors.checked) {
            const thickness = document.getElementById('floor-thickness').value;
            if (!thickness) {
                alert('Пожалуйста, укажите толщину перекрытия (раз вы включили этот флаг).');
                document.getElementById('floor-thickness').focus();
                return;
            }
        }

        // Если все проверки пройдены:
        window.location.href = '../calculation/index.html';
    });

    clearBtn.addEventListener('click', () => {
        if(confirm('Вы уверены, что хотите сбросить все введенные данные?')) {
            form.reset(); 
            doorsWindowsContent.classList.remove('active');
            floorsContent.classList.remove('active');
            resetDynamicRows(); // Сброс проемов до начального состояния
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });

    // --- 5. ДИНАМИЧЕСКИЕ ПРОЕМЫ: ЛОГИКА ДОБАВЛЕНИЯ/УДАЛЕНИЯ ---
    
    // Функция получения HTML-шаблона для новой строки проема
    const getProemRowTemplate = (type) => {
        // SVG иконки удаления (минус)
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
            <button type="button" class="icon-btn remove-proem" title="Удалить этот проем">
                ${removeIcon}
            </button>
        `;
    };

    // Слушаем клики по кнопкам добавить (+) и удалить (-)
    doorsWindowsContent.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        // ЛОГИКА ДОБАВЛЕНИЯ (+)
        if (target.classList.contains('add-proem')) {
            const container = target.closest('.proem-rows-container');
            const type = container.dataset.proemType; // 'door' или 'window'
            
            const newRow = document.createElement('div');
            newRow.className = 'proem-row';
            newRow.innerHTML = getProemRowTemplate(type);
            
            container.appendChild(newRow);
            
            // Навешиваем слушатели на новые инпуты для управления лейблами
            newRow.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => updateLabelState(input));
                input.addEventListener('focus', () => input.closest('.input-group').classList.add('is-focused'));
                input.addEventListener('blur', () => {
                    input.closest('.input-group').classList.remove('is-focused');
                    updateLabelState(input);
                });
            });
        }

        // ЛОГИКА УДАЛЕНИЯ (-)
        if (target.classList.contains('remove-proem')) {
            const row = target.closest('.proem-row');
            row.remove();
        }
    });

    // Функция валидации всех динамических проемов
    const validateAllDynamicRows = () => {
        const proemSections = doorsWindowsContent.querySelectorAll('.proem-section');
        let isValid = true;
        let proemTypeName = '';

        for (const section of proemSections) {
            const title = section.querySelector('.subsection-title').textContent;
            const rows = section.querySelectorAll('.proem-row');
            proemTypeName = (title === 'Дверные проемы') ? 'Дверь' : 'Окно';

            for (const row of rows) {
                const inputs = row.querySelectorAll('input');
                const h = inputs[0].value;
                const w = inputs[1].value;
                const q = inputs[2].value;

                // Считаем, сколько полей из 3-х заполнено
                const filledCount = (h ? 1 : 0) + (w ? 1 : 0) + (q ? 1 : 0);

                // Если заполнено 1 или 2 поля, но не все 3 — это ошибка
                if (filledCount > 0 && filledCount < 3) {
                    alert(`Пожалуйста, заполните все параметры (Высота, Ширина, Кол-во) для всех проемов в разделе "${title}".`);
                    inputs[filledCount === 1 ? (h?1:0) : (h?(w?2:1):0)].focus(); // Фокус на первое пустое поле
                    isValid = false;
                    break;
                }
            }
            if (!isValid) break; // Прерываем цикл разделов
        }

        // Проверяем, заполнена ли хоть одна строка во всей секции «Учесть...»
        if (isValid) {
            const anyInputsFilled = ['door', 'window'].some(type => {
                return Array.from(document.querySelectorAll(`input[name^="${type}"]`)).some(input => input.value);
            });

            if (!anyInputsFilled) {
                alert('Вы включили флаг "Учесть двери и окна", но не заполнили ни одного элемента.');
                isValid = false;
            }
        }

        return isValid;
    };

    // Функция сброса динамических рядов до начального состояния
    const resetDynamicRows = () => {
        const containers = doorsWindowsContent.querySelectorAll('.proem-rows-container');
        containers.forEach(container => {
            // Удаляем все ряды, кроме первого (initial-row)
            const rows = container.querySelectorAll('.proem-row');
            rows.forEach((row, index) => {
                if (index === 0) {
                    row.querySelectorAll('input').forEach(input => {
                        input.value = '';
                        updateLabelState(input);
                    });
                } else {
                    row.remove();
                }
            });
        });
    };
});