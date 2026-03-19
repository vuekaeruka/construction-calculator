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

    // Моковая "База данных"
    const clientsDb = {
        '1': { fullName: 'Иванов Петр Сергеевич', phone: '+7 (999) 123-45-67' },
        '2': { fullName: 'Смирнова Анна', phone: '+7 (988) 765-43-21' },
        'new': { fullName: 'Новый Клиент', phone: 'Не указан' }
    };

    if (clientId && clientsDb[clientId]) {
        document.getElementById('client-name').textContent = clientsDb[clientId].fullName;
        document.getElementById('client-phone').textContent = clientsDb[clientId].phone;
    } else {
        document.getElementById('client-name').textContent = 'Клиент не выбран';
    }

    // --- 2. ЭЛЕМЕНТЫ ФОРМЫ ---
    const form = document.getElementById('calc-roof-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const addressInput = document.getElementById('object-address');

    const toggleInsulation = document.getElementById('toggle-insulation');
    const insulationContent = document.getElementById('insulation-content');
    
    const textInputs = document.querySelectorAll('.input-group input');

    // --- 3. УПРАВЛЕНИЕ ЛЕЙБЛАМИ И БЛОКИРОВКА НЕКОРРЕКТНОГО ВВОДА ---
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

            // Авто-обрезка значений больше максимального
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

    // --- 4. РАСКРЫВАЮЩИЕСЯ СЕКЦИИ ---
    toggleInsulation.addEventListener('change', (e) => {
        if (e.target.checked) {
            insulationContent.style.display = 'flex';
        } else {
            insulationContent.style.display = 'none';
        }
    });

    // --- 5. ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ ---
    
    // Вспомогательная функция проверки числовых полей
    const validateNumber = (id, name) => {
        const input = document.getElementById(id);
        
        // Если поле скрыто (например, выключили утепление), не валидируем его
        if (input.closest('.collapsible-content') && input.closest('.collapsible-content').style.display === 'none') {
            return true;
        }

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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Проверка адреса перед расчетом
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        // 2. Проверка габаритов
        if (!validateNumber('house-length', 'Длина дома')) return;
        if (!validateNumber('house-width', 'Ширина дома')) return;
        if (!validateNumber('roof-height', 'Высота конька')) return;
        if (!validateNumber('overhang-length', 'Длина свесов')) return;

        // 3. Проверка утепления (если включено)
        if (toggleInsulation.checked) {
            if (!validateNumber('insulation-thickness', 'Толщина утепления')) return;
        }

        // Если все проверки пройдены:
        window.location.href = '../calculation/index.html';
    });

    // --- 6. КНОПКИ ДЕЙСТВИЙ ---
    clearBtn.addEventListener('click', () => {
        if(confirm('Вы уверены, что хотите сбросить все введенные данные?')) {
            form.reset(); 
            toggleInsulation.dispatchEvent(new Event('change'));
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });
});