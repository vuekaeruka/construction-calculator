document.addEventListener('DOMContentLoaded', () => {
    // Массив для хранения реальных данных с сервера
    let clientsData = [];

    // --- DOM Элементы ---
    const tableBody = document.getElementById('clients-table-body');
    const searchInput = document.getElementById('search-input');
    const logoutBtn = document.getElementById('logout-btn');

    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterBadge = document.getElementById('filter-badge');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const projectsSelect = document.getElementById('projects-filter');
    
    const modalOverlay = document.getElementById('create-modal');
    const createClientForm = document.getElementById('create-client-form');
    
    const lastnameInput = document.getElementById('lastname');
    const firstnameInput = document.getElementById('firstname');
    const middlenameInput = document.getElementById('middlename');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // --- ЗАГРУЗКА ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ ---
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

    // Логика выхода
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { 
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '../login/index.html'; 
        });
    }

    // --- Вспомогательная функция: форматирование телефона для таблицы ---
    const formatPhoneForDisplay = (digits) => {
        if (!digits) return 'Не указан';
        if (digits.length === 11) {
            return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
        }
        return digits;
    };

    // --- Логика рендеринга таблицы ---
    const renderTable = (data) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 32px;">По вашему запросу ничего не найдено</td></tr>`;
            return;
        }

        data.forEach(client => {
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer';
            tr.onclick = () => { window.location.href = `../client-card/index.html?id=${client.id}`; };

            tr.innerHTML = `
                <td>
                    <strong>${client.fullName}</strong>
                    <span class="sub-text">ID: ${client.id.toString().padStart(4, '0')}</span>
                </td>
                <td>${client.phone}<span class="sub-text">${client.email}</span></td>
                <td>${client.projects} шт.</td>
                <td class="text-right">
                    <a href="../client-card/index.html?id=${client.id}" class="link-action" onclick="event.stopPropagation();">Открыть →</a>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // --- ЗАГРУЗКА КЛИЕНТОВ С БЭКЕНДА (GET) ---
    const fetchClients = async () => {
        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch('/api/clients/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                clientsData = data.map(c => ({
                    id: c.id,
                    fullName: `${c.last_name} ${c.first_name} ${c.patronymic || ''}`.trim(),
                    phone: formatPhoneForDisplay(c.phone_number),
                    email: c.email,
                    projects: c.calculations_count || 0 
                }));
                applySearchAndFilters(); 
            } else {
                console.error('Ошибка при загрузке клиентов');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось связаться с сервером для загрузки клиентов.');
        }
    };

    // --- Фильтры и Поиск ---
    const applySearchAndFilters = () => {
        const query = searchInput.value.toLowerCase().trim();
        const projectFilterValue = projectsSelect.value;
        
        const isFilterModified = projectFilterValue !== 'all';
        filterBadge.style.display = isFilterModified ? 'inline-block' : 'none';

        const filteredData = clientsData.filter(client => {
            const matchesSearch = client.fullName.toLowerCase().includes(query);
            
            let matchesProjects = true;
            if (projectFilterValue === 'with-projects') matchesProjects = client.projects > 0;
            if (projectFilterValue === 'no-projects') matchesProjects = client.projects === 0;
            
            return matchesSearch && matchesProjects;
        });
        renderTable(filteredData);
    };

    filterBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        filterDropdown.classList.toggle('active'); 
    });

    applyFiltersBtn.addEventListener('click', () => { applySearchAndFilters(); filterDropdown.classList.remove('active'); });
    resetFiltersBtn.addEventListener('click', () => { projectsSelect.value = 'all'; applySearchAndFilters(); });
    searchInput.addEventListener('input', applySearchAndFilters);

    // --- ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    // --- ЕДИНЫЙ ОБРАБОТЧИК КЛИКА ПО ДОКУМЕНТУ ---
    document.addEventListener('click', (e) => { 
        if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
            filterDropdown.classList.remove('active');
        }
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });

    // --- Модалка создания клиента ---
    document.getElementById('open-modal-btn').addEventListener('click', () => modalOverlay.classList.add('active'));
    document.getElementById('close-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));
    document.getElementById('cancel-modal-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));

    // --- ВАЛИДАЦИЯ ПЕРЕД ОТПРАВКОЙ ---
    const validateForm = () => {
        const lastName = lastnameInput.value.trim();
        const firstName = firstnameInput.value.trim();
        const middleName = middlenameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
        
        if (!lastName || !firstName) {
            alert('Поля "Фамилия" и "Имя" обязательны для заполнения.');
            return false;
        }

        if (!nameRegex.test(lastName) || !nameRegex.test(firstName) || (middleName && !nameRegex.test(middleName))) {
            alert('Пожалуйста, используйте только буквы, пробелы и дефисы в полях ФИО.');
            return false;
        }

        const rawPhoneDigits = phone.replace(/\D/g, '');
        if (rawPhoneDigits.length < 11) {
            alert('Введите корректный номер телефона (не менее 11 цифр).');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес.');
            return false;
        }

        return true;
    };

    // --- ОТПРАВКА НОВОГО КЛИЕНТА НА БЭКЕНД (POST) ---
    createClientForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        if (!validateForm()) return; 

        const cleanPhone = phoneInput.value.replace(/\D/g, '').substring(0, 11);

        const payload = {
            last_name: lastnameInput.value.trim(),
            first_name: firstnameInput.value.trim(),
            patronymic: middlenameInput.value.trim() || "", 
            phone_number: cleanPhone,
            email: emailInput.value.trim()
        };

        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch('/api/clients/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const newClient = await response.json();
                
                modalOverlay.classList.remove('active');
                createClientForm.reset();
                await fetchClients();
            } else {
                const errorData = await response.json();
                alert(`Ошибка создания: ${errorData.detail || 'Проверьте данные (возможно, email или телефон уже заняты)'}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось подключиться к серверу.');
        }
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
        let inputNumbersValue = input.value.replace(/\D/g, '').substring(0, 11); 
        let selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) return input.value = "";

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) { input.value = inputNumbersValue; }
            return;
        }

        formattedInputValue = '+' + inputNumbersValue[0];
        
        if (inputNumbersValue.length > 1) { formattedInputValue += ' (' + inputNumbersValue.substring(1, 4); }
        if (inputNumbersValue.length >= 5) { formattedInputValue += ') ' + inputNumbersValue.substring(4, 7); }
        if (inputNumbersValue.length >= 8) { formattedInputValue += '-' + inputNumbersValue.substring(7, 9); }
        if (inputNumbersValue.length >= 10) { formattedInputValue += '-' + inputNumbersValue.substring(9, 11); }
        
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) { e.target.value = ""; }
    };

    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);

    // Первичная загрузка данных с сервера при открытии страницы
    fetchClients();
});