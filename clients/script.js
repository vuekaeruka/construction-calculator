document.addEventListener('DOMContentLoaded', () => {
    // --- Состояние приложения (Mock Data) ---
    let clientsData = [
        { id: 1, company: 'ООО "СтройИнвест"', contact: 'Иванов Петр Сергеевич', phone: '+7 (999) 123-45-67', email: 'ivanov@stroy.ru', projects: 3, status: 'active' },
        { id: 2, company: 'Монолит Групп', contact: 'Смирнова Анна', phone: '+7 (988) 765-43-21', email: 'smirnova@monolit.ru', projects: 1, status: 'active' },
        { id: 3, company: 'ИП Соколов А.В.', contact: 'Алексей Соколов', phone: '+7 (900) 000-00-00', email: 'sokolov@mail.ru', projects: 0, status: 'inactive' },
        { id: 4, company: 'Альфа Девелопмент', contact: 'Краснов Игорь', phone: '+7 (911) 222-33-44', email: 'krasnov@alfa-dev.ru', projects: 5, status: 'active' },
        { id: 5, company: 'Западный Мост', contact: 'Светлана Юрьевна', phone: '+7 (922) 111-22-33', email: 'sveta@zmost.ru', projects: 0, status: 'inactive' }
    ];

    // --- DOM Элементы ---
    const tableBody = document.getElementById('clients-table-body');
    const searchInput = document.getElementById('search-input');

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

    // --- Логика рендеринга таблицы ---
    const renderTable = (data) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 32px;">По вашему запросу ничего не найдено</td></tr>`;
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
                    <strong>${client.company}</strong>
                    <span class="sub-text">ID: ${client.id.toString().padStart(4, '0')}</span>
                </td>
                <td>${client.contact}</td>
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
            const matchesSearch = client.company.toLowerCase().includes(query) ||
                                  client.contact.toLowerCase().includes(query);
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

    // Обработка формы создания клиента
    createClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // При создании нового клиента сразу переходим в его карточку, как описано в прецедентах (п.4 рис. 7-8)
        window.location.href = '../client-card/index.html?id=new'; 
    });

    // Инициализация
    renderTable(clientsData);
});