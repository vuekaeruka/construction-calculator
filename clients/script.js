document.addEventListener('DOMContentLoaded', () => {
    // --- Состояние приложения (Mock Data) ---
    let clientsData = [
        { id: 1, fullName: 'Иванов Петр Сергеевич', phone: '+7 (999) 123-45-67', email: 'ivanov@stroy.ru', projects: 3, status: 'active' },
        { id: 2, fullName: 'Смирнова Анна', phone: '+7 (988) 765-43-21', email: 'smirnova@monolit.ru', projects: 1, status: 'active' },
        { id: 3, fullName: 'Соколов Алексей Владимирович', phone: '+7 (900) 000-00-00', email: 'sokolov@mail.ru', projects: 0, status: 'inactive' },
        { id: 4, fullName: 'Краснов Игорь', phone: '+7 (911) 222-33-44', email: 'krasnov@alfa-dev.ru', projects: 5, status: 'active' },
        { id: 5, fullName: 'Светлана Юрьевна', phone: '+7 (922) 111-22-33', email: 'sveta@zmost.ru', projects: 0, status: 'inactive' }
    ];

    // --- DOM Элементы ---
    const tableBody = document.getElementById('clients-table-body');
    const searchInput = document.getElementById('search-input');
    const logoutBtn = document.getElementById('logout-btn');

    // Элементы Фильтров
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterBadge = document.getElementById('filter-badge');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const statusCheckboxes = document.querySelectorAll('.status-filter');
    const projectsSelect = document.getElementById('projects-filter');
    
    // Элементы модального окна создания
    const modalOverlay = document.getElementById('create-modal');
    const createClientForm = document.getElementById('create-client-form');
    
    // Поля ввода
    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // --- Логика редиректа на страницу логина ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '../login/index.html';
        });
    }

    // --- Логика рендеринга таблицы ---
    const renderTable = (data) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 32px;">По вашему запросу ничего не найдено</td></tr>`;
            return;
        }

        data.forEach(client => {
            const tr = document.createElement('tr');
            
            // Делаем всю строку кликабельной для перехода в карточку
            tr.style.cursor = 'pointer';
            tr.onclick = () => {
                window.location.href = `../client-card/index.html?id=${client.id}`;
            };

            const statusBadge = client.status === 'active'
                ? '<span class="badge active">В работе</span>'
                : '<span class="badge inactive">Нет расчетов</span>';

            tr.innerHTML = `
                <td>
                    <strong>${client.fullName}</strong>
                    <span class="sub-text">ID: ${client.id.toString().padStart(4, '0')}</span>
                </td>
                <td>${client.phone}<span class="sub-text">${client.email}</span></td>
                <td>${client.projects} шт.</td>
                <td>${statusBadge}</td>
                <td class="text-right">
                    <a href="../client-card/index.html?id=${client.id}" class="link-action" onclick="event.stopPropagation();">Открыть →</a>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // --- Ядро: Общая функция поиска и фильтрации ---
    const applySearchAndFilters = () => {
        const query = searchInput.value.toLowerCase().trim();

        const activeStatuses = Array.from(statusCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const projectFilterValue = projectsSelect.value;
        
        const isFilterModified = activeStatuses.length < 2 || projectFilterValue !== 'all';
        filterBadge.style.display = isFilterModified ? 'inline-block' : 'none';

        const filteredData = clientsData.filter(client => {
            // Ищем только по ФИО
            const matchesSearch = client.fullName.toLowerCase().includes(query);
            const matchesStatus = activeStatuses.includes(client.status);
            
            let matchesProjects = true;
            if (projectFilterValue === 'with-projects') matchesProjects = client.projects > 0;
            if (projectFilterValue === 'no-projects') matchesProjects = client.projects === 0;
            
            return matchesSearch && matchesStatus && matchesProjects;
        });
        renderTable(filteredData);
    };

    // --- Управление Dropdown Фильтра ---
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        filterDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
            filterDropdown.classList.remove('active');
        }
    });

    applyFiltersBtn.addEventListener('click', () => {
        applySearchAndFilters();
        filterDropdown.classList.remove('active');
    });

    resetFiltersBtn.addEventListener('click', () => {
        statusCheckboxes.forEach(cb => cb.checked = true);
        projectsSelect.value = 'all';
        applySearchAndFilters();
    });

    searchInput.addEventListener('input', applySearchAndFilters);

    // --- Управление Модальным окном создания ---
    document.getElementById('open-modal-btn').addEventListener('click', () => modalOverlay.classList.add('active'));
    document.getElementById('close-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));
    document.getElementById('cancel-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));

    // --- ВАЛИДАЦИЯ И ОБРАБОТКА ФОРМЫ ---
    
    // Вспомогательная функция для проверки
    const validateForm = () => {
        const fullname = fullnameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        // 1. Проверка ФИО: запрещены цифры, лимит уже стоит в HTML (maxlength="50")
        const hasDigits = /\d/.test(fullname);
        if (hasDigits || fullname === '') {
            alert('Пожалуйста, введите корректное ФИО. Использование цифр недопустимо.');
            fullnameInput.focus();
            return false;
        }

        // 2. Проверка телефона: разрешены +, -, скобки, пробелы и цифры. Длина от 7 до 18. Буквы запрещены.
        const phoneRegex = /^[\+\(\)\- \d]{7,18}$/;
        if (!phoneRegex.test(phone) || /[a-zA-Zа-яА-Я]/.test(phone)) {
            alert('Введите корректный номер телефона. Разрешены только цифры и символы + ( ) -');
            phoneInput.focus();
            return false;
        }

        // 3. Проверка Email: обязательно наличие @ и точки после неё
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес (например: example@mail.ru).');
            emailInput.focus();
            return false;
        }

        return true;
    };

    createClientForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Останавливаем стандартную отправку формы
        
        // Если валидация не пройдена, прерываем выполнение
        if (!validateForm()) {
            return; 
        }

        // Если всё окей — редирект в карточку нового клиента
        window.location.href = '../client-card/index.html?id=new'; 
    });

    // Ограничение ввода в реальном времени
    fullnameInput.addEventListener('input', function() {
        // Удаляем цифры прямо во время ввода
        this.value = this.value.replace(/\d/g, '');
    });

    phoneInput.addEventListener('input', function() {
        // Удаляем буквы во время ввода
        this.value = this.value.replace(/[a-zA-Zа-яА-Я]/g, '');
    });

    // Инициализация
    renderTable(clientsData);
});