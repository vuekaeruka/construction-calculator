document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-frame-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const saveAddressBtn = document.getElementById('save-address-btn');
    const addressInput = document.getElementById('object-address');

    const toggleDoorsWindows = document.getElementById('toggle-doors-windows');
    const doorsWindowsContent = document.getElementById('doors-windows-content');
    
    const toggleFloors = document.getElementById('toggle-floors');
    const floorsContent = document.getElementById('floors-content');

    const textInputs = document.querySelectorAll('.input-group input');

    // --- 1. Управление лейблами и ограничение ввода ---
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

    // --- 2. Раскрывающиеся секции ---
    toggleDoorsWindows.addEventListener('change', (e) => {
        if (e.target.checked) {
            doorsWindowsContent.classList.add('active');
        } else {
            doorsWindowsContent.classList.remove('active');
            doorsWindowsContent.querySelectorAll('input').forEach(input => {
                input.value = '';
                updateLabelState(input);
            });
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

    // --- 3. Кнопки и ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ ---
    
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

        // Валидация блока "Двери и Окна"
        if (toggleDoorsWindows.checked) {
            // Проверяем, чтобы не оставили полупустые строки
            const errorMsg = validateDimensionsRow('ext-door-h', 'ext-door-w', 'ext-door-q', 'Наружные двери') ||
                             validateDimensionsRow('int-door-h', 'int-door-w', 'int-door-q', 'Внутренние двери') ||
                             validateDimensionsRow('win-h', 'win-w', 'win-q', 'Окна');
            
            if (errorMsg) {
                alert(errorMsg);
                return; // Останавливаем отправку
            }
            
            // Проверяем, чтобы вообще хоть что-то было заполнено, раз включили флаг
            const anyFilled = ['ext-door-q', 'int-door-q', 'win-q'].some(id => document.getElementById(id).value);
            if (!anyFilled) {
                alert('Вы включили флаг "Учесть двери и окна", но не заполнили ни одного элемента.');
                return;
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
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });

    saveAddressBtn.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if (address === '') {
            alert('Пожалуйста, введите адрес объекта.');
            return;
        }
        const originalText = saveAddressBtn.textContent;
        saveAddressBtn.textContent = 'Сохранено!';
        saveAddressBtn.style.backgroundColor = '#10B981';
        saveAddressBtn.style.color = '#fff';
        setTimeout(() => {
            saveAddressBtn.textContent = originalText;
            saveAddressBtn.style.backgroundColor = ''; 
            saveAddressBtn.style.color = '';
        }, 2000);
    });
});