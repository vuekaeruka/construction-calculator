document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. АВТОРИЗАЦИЯ (ЛОГИН)
    // ==========================================
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('username');
    const loginPasswordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    
    // Переключение видимости пароля
    togglePasswordBtn.addEventListener('click', () => {
        const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPasswordInput.setAttribute('type', type);
        togglePasswordBtn.style.opacity = type === 'text' ? '1' : '0.6';
    });
    
    // Отправка формы входа
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (!username || !password) {
            alert('Пожалуйста, введите логин и пароль.');
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                window.location.href = '../clients/index.html';
            } else {
                const errorData = await response.json();
                alert(`Ошибка входа: ${errorData.detail || 'Неверный логин или пароль'}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен.');
        }
    });


    // ==========================================
    // 2. РЕГИСТРАЦИЯ (МОДАЛЬНОЕ ОКНО)
    // ==========================================
    const registerModal = document.getElementById('register-modal');
    const openRegisterModalBtn = document.getElementById('open-register-modal');
    const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');
    const cancelRegisterModalBtn = document.getElementById('cancel-register-modal-btn');
    const registerForm = document.getElementById('register-form');

    // Открытие окна регистрации
    openRegisterModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.add('active');
    });

    const closeModal = () => {
        registerModal.classList.remove('active');
        registerForm.reset(); 
    };

    closeRegisterModalBtn.addEventListener('click', closeModal);
    cancelRegisterModalBtn.addEventListener('click', closeModal);

    // Отправка формы регистрации
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const lastName = document.getElementById('reg-lastname').value.trim();
        const firstName = document.getElementById('reg-firstname').value.trim();
        const login = document.getElementById('reg-login').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        // --- ВАЛИДАЦИЯ ---
        if (!lastName || !firstName || !login || !password) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
        if (!nameRegex.test(lastName) || !nameRegex.test(firstName)) {
            alert('Имя и фамилия могут содержать только буквы, пробелы и дефисы.');
            return;
        }

        if (lastName.length > 255 || firstName.length > 255) {
            alert('Имя и фамилия не должны превышать 255 символов.');
            return;
        }

        const loginRegex = /^[a-zA-Z0-9_]+$/;
        if (!loginRegex.test(login)) {
            alert('Логин может содержать только латинские буквы, цифры и знак подчеркивания (_).');
            return;
        }

        if (login.length < 3 || login.length > 50) {
            alert('Логин должен содержать от 3 до 50 символов.');
            return;
        }

        if (password.length < 6 || password.length > 255) {
            alert('Пароль должен содержать от 6 до 255 символов.');
            return;
        }
        // --- КОНЕЦ ВАЛИДАЦИИ ---

        const payload = {
            last_name: lastName,
            first_name: firstName,
            login: login,
            password: password
        };

        try {
            // ИЗМЕНЕНО: относительный путь к API
            const response = await fetch('/api/auth/register', {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                window.location.href = '../clients/index.html';
            } else {
                const errorData = await response.json();
                alert(`Ошибка регистрации: ${errorData.detail || 'Пользователь с таким логином уже существует'}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось подключиться к серверу.');
        }
    });

    // ==========================================
    // 3. ФУТЕР И ПОПОВЕР АВТОРОВ
    // ==========================================
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    authorsBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Останавливаем всплытие события, чтобы окно не закрылось сразу
        authorsPopover.classList.toggle('active');
    });

    // Единый обработчик клика по окну (закрывает и регистрацию, и авторов)
    window.addEventListener('click', (e) => {
        // Закрытие регистрации по клику на фон
        if (e.target === registerModal) {
            closeModal();
        }
        
        // Закрытие поповера авторов, если клик был не по нему
        if (authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });
});