document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ИНИЦИАЛИЗАЦИЯ ДАННЫХ КЛИЕНТА (Mock) ---
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId');
    const backBtn = document.querySelector('.btn-back');

    if (clientId) {
        backBtn.href = `../client-card/index.html?id=${clientId}`;
    }

    const form = document.getElementById('calc-foundation-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const saveAddressBtn = document.getElementById('save-address-btn');
    const addressInput = document.getElementById('object-address');

    const foundationTypeSelect = document.getElementById('foundation-type');
    const stripParams = document.getElementById('strip-params');
    const pileParams = document.getElementById('pile-params');

    const toggleRebar = document.getElementById('toggle-rebar');
    const rebarContent = document.getElementById('rebar-content');
    
    const textInputs = document.querySelectorAll('.input-group input');

    // --- 2. Управление лейблами и блокировка некорректного ввода ---
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

        // Разрешаем только цифры, запрещаем 'e', '+', '-' на этапе печати
        if (input.type === 'number') {
            input.addEventListener('keydown', (e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                    e.preventDefault();
                }
            });

            // Не даем ввести число больше максимального (автоматическая обрезка)
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

    // --- 3. Раскрывающиеся секции ---
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
        if (e.target.checked) {
            rebarContent.style.display = 'flex';
        } else {
            rebarContent.style.display = 'none';
        }
    });

    // --- 4. Кнопки и ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ ---
    
    // Вспомогательная функция проверки числовых полей
    const validateNumber = (id, name) => {
        const input = document.getElementById(id);
        const val = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));

        // Проверка на пустое значение
        if (isNaN(val)) {
            alert(`Пожалуйста, заполните поле "${name}".`);
            input.focus();
            return false;
        }

        // Проверка на минимальное/максимальное значение
        if (val < min || val > max) {
            alert(`Значение в поле "${name}" должно быть от ${min} до ${max}.`);
            input.focus();
            return false;
        }

        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Проверка адреса
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        // 2. Проверка общих габаритов строения
        if (!validateNumber('build-length', 'Общая длина строения')) return;
        if (!validateNumber('build-width', 'Общая ширина строения')) return;

        // 3. Проверка параметров в зависимости от выбранного типа фундамента
        const type = foundationTypeSelect.value;
        if (type === 'strip') {
            if (!validateNumber('strip-total-length', 'Общая длина ленты')) return;
            if (!validateNumber('strip-width', 'Ширина ленты')) return;
            if (!validateNumber('strip-depth', 'Глубина заложения')) return;
            if (!validateNumber('strip-height', 'Высота цоколя')) return;
        } else if (type === 'pile') {
            if (!validateNumber('pile-count', 'Количество свай')) return;
            if (!validateNumber('pile-length', 'Длина сваи')) return;
        }

        // 4. Проверка дополнительных материалов
        if (!validateNumber('sand-cushion', 'Песчаная подушка')) return;

        // Если все проверки пройдены, переходим на страницу результатов
        window.location.href = '../calculation/index.html';
    });

    clearBtn.addEventListener('click', () => {
        if(confirm('Вы уверены, что хотите сбросить все введенные данные?')) {
            form.reset(); 
            // Сбрасываем видимость секций
            foundationTypeSelect.dispatchEvent(new Event('change')); 
            toggleRebar.dispatchEvent(new Event('change'));
            
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