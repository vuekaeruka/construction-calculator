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

    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterBadge = document.getElementById('filter-badge');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const statusCheckboxes = document.querySelectorAll('.status-filter');
    const projectsSelect = document.getElementById('projects-filter');
    
    const modalOverlay = document.getElementById('create-modal');
    const createClientForm = document.getElementById('create-client-form');
    
    const lastnameInput = document.getElementById('lastname');
    const firstnameInput = document.getElementById('firstname');
    const middlenameInput = document.getElementById('middlename');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // --- Логика редиректа ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { window.location.href = '../login/index.html'; });
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
            tr.style.cursor = 'pointer';
            tr.onclick = () => { window.location.href = `../client-card/index.html?id=${client.id}`; };

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

    // --- Фильтры ---
    const applySearchAndFilters = () => {
        const query = searchInput.value.toLowerCase().trim();
        const activeStatuses = Array.from(statusCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const projectFilterValue = projectsSelect.value;
        
        const isFilterModified = activeStatuses.length < 2 || projectFilterValue !== 'all';
        filterBadge.style.display = isFilterModified ? 'inline-block' : 'none';

        const filteredData = clientsData.filter(client => {
            const matchesSearch = client.fullName.toLowerCase().includes(query);
            const matchesStatus = activeStatuses.includes(client.status);
            
            let matchesProjects = true;
            if (projectFilterValue === 'with-projects') matchesProjects = client.projects > 0;
            if (projectFilterValue === 'no-projects') matchesProjects = client.projects === 0;
            
            return matchesSearch && matchesStatus && matchesProjects;
        });
        renderTable(filteredData);
    };

    filterBtn.addEventListener('click', (e) => { e.stopPropagation(); filterDropdown.classList.toggle('active'); });
    document.addEventListener('click', (e) => { if (!filterDropdown.contains(e.target) && e.target !== filterBtn) filterDropdown.classList.remove('active'); });
    applyFiltersBtn.addEventListener('click', () => { applySearchAndFilters(); filterDropdown.classList.remove('active'); });
    resetFiltersBtn.addEventListener('click', () => { statusCheckboxes.forEach(cb => cb.checked = true); projectsSelect.value = 'all'; applySearchAndFilters(); });
    searchInput.addEventListener('input', applySearchAndFilters);

    document.getElementById('open-modal-btn').addEventListener('click', () => modalOverlay.classList.add('active'));
    document.getElementById('close-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));
    document.getElementById('cancel-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));

    // --- ВАЛИДАЦИЯ ---
    const validateForm = () => {
        const lastName = lastnameInput.value.trim();
        const firstName = firstnameInput.value.trim();
        const middleName = middlenameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
        
        if (!lastName || !firstName) {
            alert('Поля "Фамилия" и "Имя" обязательны для заполнения.');
            if (!lastName) lastnameInput.focus(); else firstnameInput.focus();
            return false;
        }

        if (!nameRegex.test(lastName) || !nameRegex.test(firstName) || (middleName && !nameRegex.test(middleName))) {
            alert('Пожалуйста, используйте только буквы, пробелы и дефисы в полях ФИО.');
            return false;
        }

        const rawPhoneDigits = phone.replace(/\D/g, '');
        if (rawPhoneDigits.length < 11) {
            alert('Введите корректный номер телефона (не менее 11 цифр).');
            phoneInput.focus();
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес.');
            emailInput.focus();
            return false;
        }

        return true;
    };

    createClientForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        if (!validateForm()) return; 
        window.location.href = '../client-card/index.html?id=new'; 
    });

    // --- УМНАЯ ЕДИНАЯ МАСКИРОВКА ВВОДА ---
    
    const onlyLetters = function() {
        this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, '');
    };
    lastnameInput.addEventListener('input', onlyLetters);
    firstnameInput.addEventListener('input', onlyLetters);
    middlenameInput.addEventListener('input', onlyLetters);

    const onPhoneInput = function (e) {
        let input = e.target;
        // Оставляем только цифры и сразу обрубаем всё, что длиннее 11 символов
        let inputNumbersValue = input.value.replace(/\D/g, '').substring(0, 11); 
        let selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        // Строгий формат: +X (XXX) XXX-XX-XX
        formattedInputValue = '+' + inputNumbersValue[0];
        
        if (inputNumbersValue.length > 1) {
            formattedInputValue += ' (' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            // Теперь здесь жестко substring(9, 11), хвост не пройдет
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
        
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    };

    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);

    // Инициализация
    renderTable(clientsData);
});