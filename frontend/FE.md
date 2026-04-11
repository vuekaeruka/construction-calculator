This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
calc-foundation/index.html
calc-foundation/script.js
calc-foundation/style.css
calc-frame/index.html
calc-frame/script.js
calc-frame/style.css
calc-roof/index.html
calc-roof/script.js
calc-roof/style.css
calculation/index.html
calculation/script.js
calculation/style.css
client-card/index.html
client-card/script.js
client-card/style.css
clients/index.html
clients/script.js
clients/style.css
login/index.html
login/script.js
login/style.css
pic/logo.png
pic/view.png
README.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="calc-foundation/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Расчет фундамента | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <div class="header-left">
                <a href="../client-card/index.html" class="btn-back" id="btn-back" title="Вернуться назад">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <h1 class="page-title">Фундамент</h1>
            </div>
            <div class="header-actions">
                <button type="button" class="btn-secondary" id="clear-calc-btn">Очистить расчет</button>
            </div>
        </header>

        <div class="client-mini-card">
            <div class="client-details">
                <span class="label">Клиент:</span>
                <strong id="client-name">Загрузка данных...</strong>
                <span class="sub-text" id="client-phone"></span>
            </div>
        </div>

        <form id="calc-foundation-form" class="calc-form" novalidate>
            <div class="form-section address-section">
                <div class="input-group">
                    <input type="text" id="object-address" placeholder=" " required>
                    <label for="object-address">Ввести адрес объекта строительства</label>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-column">
                    <div class="form-section">
                        <h3 class="section-title">Тип фундамента</h3>
                        <div class="input-group">
                            <input type="text" id="foundation-type" value="Монолитная плита" disabled>
                            <label for="foundation-type">Поддерживаемый системой тип</label>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Габариты плиты</h3>
                        <div class="input-group">
                            <input type="number" id="plate-length" placeholder=" " min="2" max="100" step="0.1" required>
                            <label for="plate-length">Длина плиты, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="plate-width" placeholder=" " min="2" max="100" step="0.1" required>
                            <label for="plate-width">Ширина плиты, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="plate-height" placeholder=" " min="0.1" max="1.5" step="0.05" value="0.3" required>
                            <label for="plate-height">Толщина плиты, м</label>
                        </div>
                    </div>
                </div>

                <div class="form-column">
                    <div class="form-section">
                        <h3 class="section-title">Параметры армирования</h3>
                        <div class="input-group">
                            <input type="number" id="rebar-step" placeholder=" " min="0.1" max="0.5" step="0.05" value="0.2" required>
                            <label for="rebar-step">Шаг ячейки арматуры, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="rebar-length" placeholder=" " min="1" max="12" step="0.1" value="11.7" required>
                            <label for="rebar-length">Длина хлыста арматуры, м</label>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Параметры опалубки</h3>
                        <div class="input-group">
                            <input type="number" id="board-length" placeholder=" " min="1" max="6" step="0.5" value="6.0" required>
                            <label for="board-length">Длина доски опалубки, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="board-width" placeholder=" " min="0.1" max="0.5" step="0.01" value="0.15" required>
                            <label for="board-width">Ширина доски опалубки, м</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary btn-large" id="submit-btn">Рассчитать</button>
            </div>
        </form>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="calc-foundation/script.js">
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ИНИЦИАЛИЗАЦИЯ И URL ПАРАМЕТРЫ ---
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
    const form = document.getElementById('calc-foundation-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const addressInput = document.getElementById('object-address');
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');
    
    const textInputs = document.querySelectorAll('.input-group input');

    // Настройка кнопки "Назад"
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

    loadClientData();
    loadCalculationData();

    // --- 5. УПРАВЛЕНИЕ UI (Лейблы, валидация полей ввода) ---
    const updateLabelState = (input) => {
        const group = input.closest('.input-group');
        if (input.value !== undefined && input.value.toString().trim() !== '') {
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

    // --- 6. ВАЛИДАЦИЯ И ОТПРАВКА ДАННЫХ (SUBMIT) ---
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверки
        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        if (!validateNumber('plate-length', 'Длина плиты')) return;
        if (!validateNumber('plate-width', 'Ширина плиты')) return;
        if (!validateNumber('plate-height', 'Толщина плиты')) return;
        if (!validateNumber('rebar-step', 'Шаг ячейки арматуры')) return;
        if (!validateNumber('rebar-length', 'Длина хлыста арматуры')) return;
        if (!validateNumber('board-length', 'Длина доски опалубки')) return;
        if (!validateNumber('board-width', 'Ширина доски опалубки')) return;

        // Строгое соответствие FoundationSchema из бэкенда
        const payload = {
            client_id: parseInt(clientId),
            address: addressInput.value.trim(),
            construction_element: {
                foundation: {
                    length: parseFloat(document.getElementById('plate-length').value),
                    width: parseFloat(document.getElementById('plate-width').value),
                    height: parseFloat(document.getElementById('plate-height').value),
                    step_rebar: parseFloat(document.getElementById('rebar-step').value),
                    rebar_length: parseFloat(document.getElementById('rebar-length').value),
                    board_length: parseFloat(document.getElementById('board-length').value),
                    board_width: parseFloat(document.getElementById('board-width').value)
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
                alert(`Ошибка сервера: ${errorData.detail || 'Не удалось сохранить расчет'}`);
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
            // Небольшая задержка, чтобы браузер успел очистить value перед обновлением UI
            setTimeout(() => {
                textInputs.forEach(input => updateLabelState(input));
            }, 10);
        }
    });

    // --- 7. ФУТЕР И ПОПОВЕР АВТОРОВ ---
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
</file>

<file path="calc-foundation/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
.navbar-container { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }

.logo { 
    display: flex;
    align-items: center;
    font-weight: 800; 
    font-size: 20px; 
    letter-spacing: -0.02em; 
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2;}
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px;}
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1000px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-actions { display: flex; gap: 12px; }

.btn-back { 
    color: var(--text-secondary); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 40px; 
    height: 40px; 
    border-radius: var(--radius-md); 
    background: var(--surface-main); 
    border: 1px solid var(--border-color); 
    transition: var(--transition); 
    flex-shrink: 0;
    text-decoration: none;
}
.btn-back:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--surface-hover); }

.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); }
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; text-decoration: none;}
.btn-secondary:hover { background-color: var(--surface-hover); }
.btn-sm { padding: 8px 16px; justify-content: center;}
.btn-large { padding: 16px 32px; font-size: 16px; width: 100%; max-width: 300px; }

/* Карточка клиента (мини) */
.client-mini-card { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; }
.client-details { display: flex; align-items: baseline; gap: 12px; }
.client-details .label { color: var(--text-secondary); font-size: 13px; }
.client-details strong { color: var(--text-primary); font-size: 16px; }
.sub-text { color: var(--text-secondary); font-size: 13px; }

/* Стили Формы и Сетки */
.calc-form { display: flex; flex-direction: column; gap: 24px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }

.form-section { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.section-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }

/* Поля ввода */
.input-group { 
    position: relative; 
    width: 100%; 
    margin-top: 16px; 
    margin-bottom: 8px; 
}
.input-group input { 
    width: 100%; 
    background: transparent; 
    border: none; 
    border-bottom: 1px solid var(--border-color); 
    padding: 8px 0; 
    color: var(--text-primary); 
    font-size: 15px; 
    font-family: var(--font-family); 
    transition: var(--transition); 
    outline: none; 
}

.input-group input:disabled {
    color: var(--text-secondary);
    border-bottom: 1px solid rgba(255,255,255, 0.02);
}

/* Базовое состояние лейбла для INPUT */
.input-group label { 
    position: absolute; 
    left: 0; 
    top: 8px; 
    color: var(--text-secondary); 
    font-size: 15px; 
    pointer-events: none; 
    transition: var(--transition); 
}

/* Поднятое состояние лейбла через классы из JS */
.input-group.is-focused label, 
.input-group.has-value label { 
    top: -16px; 
    font-size: 11px; 
}

.input-group.is-focused label {
    color: var(--accent); 
}

.input-group.is-focused input { 
    border-bottom-color: var(--accent); 
}

/* Подвал формы */
.form-actions { display: flex; justify-content: flex-end; padding-top: 24px; border-top: 1px solid var(--border-color); margin-top: 16px; }

/* --- Футер и Авторы проекта --- */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto;
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

/* Состояние: Открыто */
.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* Кастомный скроллбар для окошка */
.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}

/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (ФОРМЫ КАЛЬКУЛЯТОРОВ)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 24px 16px;
    }

    /* Шапка страницы: элементы перестраиваются друг под друга */
    .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .header-left {
        width: 100%;
    }

    .header-actions {
        width: 100%;
    }

    /* Кнопка "Очистить расчет" на всю ширину */
    #clear-calc-btn {
        width: 100%;
        justify-content: center;
    }

    /* Инфо-карточка клиента: ставим ярлык и данные в столбик для экономии ширины */
    .client-mini-card {
        padding: 16px;
    }
    
    .client-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    
    /* Сетка формы: отключаем 2 колонки, делаем 1 колонку */
    .form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .form-section {
        padding: 16px;
    }

    /* Кнопка отправки "Рассчитать" */
    .form-actions {
        justify-content: center;
        width: 100%;
    }

    #submit-btn {
        width: 100%;
        max-width: none; /* Снимаем ограничение в 300px */
    }

    /* Поповер авторов: ограничиваем ширину, чтобы не вылезал за края мобильника */
    .authors-popover {
        width: 290px;
        padding: 20px;
    }
    .authors-list li {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</file>

<file path="calc-frame/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Расчет каркаса | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <div class="header-left">
                <a href="../client-card/index.html" class="btn-back" id="btn-back" title="Вернуться назад">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <h1 class="page-title">Каркас</h1>
            </div>
            <div class="header-actions">
                <button type="button" class="btn-secondary" id="clear-calc-btn">Очистить расчет</button>
            </div>
        </header>

        <div class="client-mini-card">
            <div class="client-details">
                <span class="label">Клиент:</span>
                <strong id="client-name">Загрузка данных...</strong>
                <span class="sub-text" id="client-phone"></span>
            </div>
        </div>

        <form id="calc-frame-form" class="calc-form" novalidate>
            <div class="form-section address-section">
                <div class="input-group">
                    <input type="text" id="object-address" placeholder=" " required>
                    <label for="object-address">Ввести адрес объекта строительства</label>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-column">
                    <div class="form-section">
                        <h3 class="section-title">Исходные данные</h3>
                        <div class="input-group">
                            <input type="number" id="wall-height" placeholder=" " min="2" max="10" step="0.1" required>
                            <label for="wall-height">Высота этажа, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="perimeter" placeholder=" " min="10" max="500" step="0.1" required>
                            <label for="perimeter">Периметр внешних стен, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="floor-slab-area" placeholder=" " min="10" max="500" step="0.1" required>
                            <label for="floor-slab-area">Площадь основания (перекрытия), м²</label>
                        </div>
                        
                        <div class="input-group select-group">
                            <label class="static-label">Толщина внешних стен</label>
                            <select id="ext-wall-thickness" class="custom-select">
                                <option value="150">150 мм</option>
                                <option value="200">200 мм</option>
                                <option value="250">250 мм</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="number" id="int-wall-length" placeholder=" " min="0" max="500" step="0.1" value="0">
                            <label for="int-wall-length">Длина внутренних стен, м</label>
                        </div>
                        
                        <div class="input-group select-group">
                            <label class="static-label">Толщина внутренних стен</label>
                            <select id="int-wall-thickness" class="custom-select">
                                <option value="0">Нет внутренних стен</option>
                                <option value="100">100 мм</option>
                                <option value="150">150 мм</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Обшивка внешних стен</h3>
                        <div class="input-group select-group">
                            <label class="static-label">ОСБ (обязательно)</label>
                            <select id="ext-osb-type" class="custom-select" data-category-name="ОСБ">
                                </select>
                        </div>
                        <div class="input-group select-group">
                            <label class="static-label">Пароизоляция</label>
                            <select id="ext-vapor-barrier" class="custom-select" data-category-name="Изоляц">
                                <option value="none">Без пароизоляции</option>
                            </select>
                        </div>
                        <div class="input-group select-group">
                            <label class="static-label">Ветрозащита</label>
                            <select id="ext-wind-protection" class="custom-select" data-category-name="Ветрозащит">
                                <option value="none">Без ветрозащиты</option>
                            </select>
                        </div>
                        <div class="input-group select-group">
                            <label class="static-label">Утеплитель</label>
                            <select id="ext-insulation" class="custom-select" data-category-name="Утеплител">
                                <option value="none">Без утеплителя</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="number" id="ext-insulation-thickness" placeholder=" " min="0" max="300" step="10" value="150">
                            <label for="ext-insulation-thickness">Толщина утеплителя, мм</label>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Обшивка внутренних стен</h3>
                        <div class="input-group select-group">
                            <label class="static-label">ОСБ</label>
                            <select id="int-osb-type" class="custom-select" data-category-name="ОСБ">
                                <option value="none">Без ОСБ</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-column">
                    <div class="form-section">
                        <label class="toggle-switch-wrapper">
                            <input type="checkbox" id="toggle-doors-windows" class="toggle-input">
                            <span class="toggle-slider"></span>
                            <h3 class="section-title toggle-title">Учесть двери и окна</h3>
                        </label>
                        
                        <div class="collapsible-content" id="doors-windows-content">
                            <div class="proem-section" id="ext-doors-section">
                                <h4 class="subsection-title">Внешние двери</h4>
                                <div class="proem-rows-container" data-proem-type="ext-door">
                                    <div class="proem-row initial-row">
                                        <div class="input-group">
                                            <input type="number" name="ext-door-height[]" placeholder=" " min="0.5" max="5" step="0.01">
                                            <label>Высота, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="ext-door-width[]" placeholder=" " min="0.5" max="5" step="0.01">
                                            <label>Ширина, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="ext-door-quantity[]" placeholder=" " min="1" max="100">
                                            <label>Кол-во</label>
                                        </div>
                                        <button type="button" class="icon-btn add-proem" title="Добавить">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="proem-section" id="int-doors-section">
                                <h4 class="subsection-title">Внутренние двери</h4>
                                <div class="proem-rows-container" data-proem-type="int-door">
                                    <div class="proem-row initial-row">
                                        <div class="input-group">
                                            <input type="number" name="int-door-height[]" placeholder=" " min="0.5" max="5" step="0.01">
                                            <label>Высота, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="int-door-width[]" placeholder=" " min="0.5" max="5" step="0.01">
                                            <label>Ширина, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="int-door-quantity[]" placeholder=" " min="1" max="100">
                                            <label>Кол-во</label>
                                        </div>
                                        <button type="button" class="icon-btn add-proem" title="Добавить">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="proem-section" id="windows-section">
                                <h4 class="subsection-title">Оконные проемы</h4>
                                <div class="proem-rows-container" data-proem-type="window">
                                    <div class="proem-row initial-row">
                                        <div class="input-group">
                                            <input type="number" name="window-height[]" placeholder=" " min="0.3" max="5" step="0.01">
                                            <label>Высота, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="window-width[]" placeholder=" " min="0.3" max="5" step="0.01">
                                            <label>Ширина, м</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="number" name="window-quantity[]" placeholder=" " min="1" max="100">
                                            <label>Кол-во</label>
                                        </div>
                                        <button type="button" class="icon-btn add-proem" title="Добавить">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="toggle-switch-wrapper">
                            <input type="checkbox" id="toggle-floors" class="toggle-input">
                            <span class="toggle-slider"></span>
                            <h3 class="section-title toggle-title">Добавить расчет перекрытий</h3>
                        </label>
                        
                        <div class="collapsible-content" id="floors-content">
                            <div class="input-group">
                                <input type="number" id="floor-thickness" placeholder=" " min="10" max="500" step="10">
                                <label for="floor-thickness">Толщина перекрытия, мм</label>
                            </div>
                            <div class="input-group select-group">
                                <label class="static-label">ОСБ</label>
                                <select id="floor-osb" class="custom-select" data-category-name="ОСБ">
                                    <option value="none">Без ОСБ</option>
                                </select>
                            </div>
                            <div class="input-group select-group">
                                <label class="static-label">Пароизоляция</label>
                                <select id="floor-vapor" class="custom-select" data-category-name="Изоляц">
                                    <option value="none">Без пароизоляции</option>
                                </select>
                            </div>
                            <div class="input-group select-group">
                                <label class="static-label">Ветрозащита</label>
                                <select id="floor-wind" class="custom-select" data-category-name="Ветрозащит">
                                    <option value="none">Без ветрозащиты</option>
                                </select>
                            </div>
                            <div class="input-group select-group">
                                <label class="static-label">Утеплитель</label>
                                <select id="floor-insulation" class="custom-select" data-category-name="Утеплител">
                                    <option value="none">Без утеплителя</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary btn-large" id="submit-btn">Рассчитать</button>
            </div>
        </form>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="calc-frame/script.js">
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
    
    const toggleFloors = document.getElementById('toggle-floors');
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

    const getOpenings = (type) => {
        const container = document.querySelector(`.proem-rows-container[data-proem-type="${type}"]`);
        if (!container) return null;
        const rows = container.querySelectorAll('.proem-row');
        const openings = [];
        rows.forEach(row => {
            const h = parseFloat(row.querySelector(`input[name="${type}-height[]"]`).value);
            const w = parseFloat(row.querySelector(`input[name="${type}-width[]"]`).value);
            const q = parseInt(row.querySelector(`input[name="${type}-quantity[]"]`).value);
            if (!isNaN(h) && !isNaN(w) && !isNaN(q)) {
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

        // --- ИЗМЕНЕНИЕ: Логика кросс-валидации внутренних стен ---
        const intWallLengthInput = document.getElementById('int-wall-length');
        const intWallLength = parseFloat(intWallLengthInput.value) || 0;
        
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
        // --- КОНЕЦ ИЗМЕНЕНИЯ ---

        const extInsulationId = getSelectIntOrNull('ext-insulation');
        if (extInsulationId !== null) {
            if (!validateNumber('ext-insulation-thickness', 'Толщина утеплителя (внешние стены)')) return;
        }

        if (toggleFloors.checked) {
            if (!validateNumber('floor-thickness', 'Толщина перекрытия')) return;
        }

        // ОСБ внешних стен обязательно
        const extOsbId = document.getElementById('ext-osb-type').value;
        if (!extOsbId || extOsbId === 'none') {
            alert('Пожалуйста, выберите ОСБ для внешних стен (обязательно).');
            document.getElementById('ext-osb-type').focus();
            return;
        }

        // 1. Собираем InitFrame
        const initFrame = {
            wall_height: parseFloat(document.getElementById('wall-height').value),
            ext_wall_perimeter: parseFloat(document.getElementById('perimeter').value),
            floor_slab_area: parseFloat(document.getElementById('floor-slab-area').value),
            int_wall_length: intWallLength,
            int_wall_thickness: intWallThickness,
            ext_wall_thickness: parseInt(document.getElementById('ext-wall-thickness').value) || 0,
            floor_slab_thickness: 0 // Обновится ниже, если перекрытия включены
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

        // 4. Собираем FloorSlab если включен
        let floorSlab = null;
        if (toggleFloors.checked) {
            initFrame.floor_slab_thickness = parseInt(document.getElementById('floor-thickness').value);
            floorSlab = {
                osb_id: getSelectIntOrNull('floor-osb'),
                steam_water_proofing_id: getSelectIntOrNull('floor-vapor'),
                wind_protection_id: getSelectIntOrNull('floor-wind'),
                insulation_id: getSelectIntOrNull('floor-insulation')
            };
        }

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
            floorsContent.classList.remove('active');
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
</file>

<file path="calc-frame/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
.navbar-container { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }

.logo { 
    display: flex;
    align-items: center;
    font-weight: 800; 
    font-size: 20px; 
    letter-spacing: -0.02em; 
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2;}
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px;}
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1000px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-actions { display: flex; gap: 12px; }

.btn-back { 
    color: var(--text-secondary); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 40px; 
    height: 40px; 
    border-radius: var(--radius-md); 
    background: var(--surface-main); 
    border: 1px solid var(--border-color); 
    transition: var(--transition); 
    flex-shrink: 0;
    text-decoration: none;
}
.btn-back:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--surface-hover); }

.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); }
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; text-decoration: none;}
.btn-secondary:hover { background-color: var(--surface-hover); }
.btn-sm { padding: 8px 16px; }
.btn-large { padding: 16px 32px; font-size: 16px; width: 100%; max-width: 300px; }

/* Карточка клиента (мини) */
.client-mini-card { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; }
.client-details { display: flex; align-items: baseline; gap: 12px; }
.client-details .label { color: var(--text-secondary); font-size: 13px; }
.client-details strong { color: var(--text-primary); font-size: 16px; }
.sub-text { color: var(--text-secondary); font-size: 13px; }

/* Стили Формы и Сетки */
.calc-form { display: flex; flex-direction: column; gap: 24px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }

.form-section { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.section-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }
.subsection-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 16px; margin-bottom: 8px; }

.input-row { display: flex; gap: 16px; align-items: center; width: 100%; }

/* Поля ввода */
.input-group { 
    position: relative; 
    width: 100%; 
    margin-top: 16px; 
    margin-bottom: 8px; 
}
.input-group input { 
    width: 100%; 
    background: transparent; 
    border: none; 
    border-bottom: 1px solid var(--border-color); 
    padding: 8px 0; 
    color: var(--text-primary); 
    font-size: 15px; 
    font-family: var(--font-family); 
    transition: var(--transition); 
    outline: none; 
}

.input-group input:disabled {
    color: var(--text-secondary);
    border-bottom: 1px solid rgba(255,255,255, 0.02);
}

/* Базовое состояние лейбла для INPUT */
.input-group label:not(.static-label) { 
    position: absolute; 
    left: 0; 
    top: 8px; 
    color: var(--text-secondary); 
    font-size: 15px; 
    pointer-events: none; 
    transition: var(--transition); 
}

/* Поднятое состояние лейбла через классы из JS */
.input-group.is-focused label:not(.static-label), 
.input-group.has-value label:not(.static-label) { 
    top: -16px; 
    font-size: 11px; 
}

.input-group.is-focused label:not(.static-label) {
    color: var(--accent); 
}

.input-group.is-focused input { 
    border-bottom-color: var(--accent); 
}

/* Селекты */
.select-group { margin-top: 16px; }
.static-label { 
    display: block; 
    font-size: 11px; 
    color: var(--text-secondary); 
    margin-bottom: 8px; 
    position: relative;
    pointer-events: auto; 
}
.custom-select { 
    width: 100%; 
    background: rgba(0, 0, 0, 0.3); 
    color: var(--text-primary); 
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-sm); 
    padding: 10px 12px; 
    font-family: var(--font-family); 
    font-size: 14px; 
    outline: none; 
    appearance: none; 
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
    background-repeat: no-repeat; 
    background-position: right 12px center; 
    background-size: 16px; 
    cursor: pointer; 
    transition: var(--transition); 
}
.custom-select:focus { border-color: var(--accent); }
.custom-select option { background: var(--bg-main); color: var(--text-primary); }

/* Toggle Switch (Переключатели) */
.toggle-switch-wrapper { display: flex; align-items: center; cursor: pointer; gap: 12px; margin-bottom: 8px; }
.toggle-title { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.toggle-input { display: none; }
.toggle-slider { position: relative; width: 40px; height: 20px; background-color: var(--surface-hover); border-radius: 20px; transition: var(--transition); border: 1px solid var(--border-color); }
.toggle-slider::before { content: ""; position: absolute; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: var(--text-secondary); border-radius: 50%; transition: var(--transition); }
.toggle-input:checked + .toggle-slider { background-color: rgba(239, 68, 68, 0.2); border-color: var(--accent); }
.toggle-input:checked + .toggle-slider::before { transform: translateX(20px); background-color: var(--accent); }

/* Раскрывающиеся блоки */
.collapsible-content, .dynamic-param-block { display: none; flex-direction: column; gap: 8px; animation: fadeIn 0.3s ease; }
.collapsible-content { border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: 8px; }
.collapsible-content.active { display: flex; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

/* Подвал формы */
.form-actions { display: flex; justify-content: flex-end; padding-top: 24px; border-top: 1px solid var(--border-color); margin-top: 16px; }

/* ДИНАМИЧЕСКИЕ ПРОЕМЫ (Двери и Окна) */
.proem-section {
    margin-bottom: 24px;
}

.proem-row {
    display: flex;
    gap: 16px; 
    align-items: flex-end; 
    margin-bottom: 16px;
}

.proem-row .input-group {
    flex: 1;
    min-width: 0; 
}

/* Стили для кнопок Плюс (+) и Минус (-) */
.icon-btn {
    border: none;
    background: transparent;
    padding: 8px;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px; 
}

/* Зеленый цвет для плюсика */
.add-proem {
    color: #10B981; 
}
.add-proem:hover {
    background-color: rgba(16, 185, 129, 0.1);
}

/* Красный цвет для минуса */
.remove-proem {
    color: var(--accent);
}
.remove-proem:hover {
    background-color: rgba(239, 68, 68, 0.1);
}

.icon-btn svg {
    stroke-width: 2.5;
}

/* --- Футер и Авторы проекта --- */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto;
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

/* Состояние: Открыто */
.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* Кастомный скроллбар для окошка */
.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}


/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (ФОРМЫ КАЛЬКУЛЯТОРОВ)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 20px 16px;
        width: 100%;
        overflow-x: hidden;
    }

    /* Шапка страницы: элементы перестраиваются друг под друга */
    .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .header-left {
        width: 100%;
    }

    .header-actions {
        width: 100%;
    }

    /* Кнопка "Очистить расчет" на всю ширину */
    #clear-calc-btn {
        width: 100%;
        justify-content: center;
    }

    /* ИСПРАВЛЕНО: Карточка клиента - жесткий столбик без слипания текста */
    .client-mini-card {
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    
    .client-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Убрано baseline */
        width: 100%;
        gap: 4px;
    }

    .client-details .label {
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 2px;
    }
    
    .client-details strong {
        font-size: 16px;
        color: var(--text-primary);
        white-space: normal; /* Разрешаем перенос текста */
        word-wrap: break-word;
        line-height: 1.3;
    }

    .client-details .sub-text {
        font-size: 14px;
        color: var(--text-secondary);
        margin-top: 2px;
    }

    /* Сетка формы: отключаем 2 колонки, делаем 1 колонку */
    .calc-form {
        width: 100%;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .form-section {
        padding: 16px;
    }

    /* Динамические проемы (Двери и Окна) на мобильных */
    .proem-row {
        flex-wrap: wrap; /* Разрешаем перенос элементов на новую строку */
        background: rgba(255, 255, 255, 0.02);
        padding: 12px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(255, 255, 255, 0.05);
        gap: 12px;
    }
    
    .proem-row .input-group {
        flex: 1 1 45%; 
    }

    .proem-row .icon-btn {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        margin-top: 8px;
        margin-bottom: 0;
        padding: 12px;
    }

    /* ИСПРАВЛЕНО: Кнопка отправки "Рассчитать" без отступов и по центру */
    .form-actions {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px 0 0 0; /* Убраны боковые отступы */
        margin-top: 16px;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    #submit-btn {
        width: 100%;
        max-width: 100%; /* Полностью снимаем ограничение ширины */
        margin: 0; /* Гарантируем, что нет сдвигов вбок */
    }

    /* Поповер авторов: ограничиваем ширину, чтобы не вылезал за края мобильника */
    .authors-popover {
        width: 290px;
        padding: 20px;
    }
    .authors-list li {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</file>

<file path="calc-roof/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Расчет крыши | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <div class="header-left">
                <a href="../client-card/index.html" class="btn-back" id="btn-back" title="Вернуться назад">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <h1 class="page-title">Крыша</h1>
            </div>
            <div class="header-actions">
                <button type="button" class="btn-secondary" id="clear-calc-btn">Очистить расчет</button>
            </div>
        </header>

        <div class="client-mini-card">
            <div class="client-details">
                <span class="label">Клиент:</span>
                <strong id="client-name">Загрузка данных...</strong>
                <span class="sub-text" id="client-phone"></span>
            </div>
        </div>

        <form id="calc-roof-form" class="calc-form" novalidate>
            <div class="form-section address-section">
                <div class="input-group">
                    <input type="text" id="object-address" placeholder=" " required>
                    <label for="object-address">Ввести адрес объекта строительства</label>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-column">
                    <div class="form-section">
                        <h3 class="section-title">Конфигурация крыши</h3>
                        <div class="input-group select-group">
                            <label class="static-label">Тип крыши</label>
                            <select id="roof-type" class="custom-select">
                                <option value="Односкатная">Односкатная</option>
                                <option value="Двускатная" selected>Двускатная</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Габариты скатов</h3>
                        <div class="input-group">
                            <input type="number" id="slope-width" placeholder=" " min="2" max="100" step="0.1" required>
                            <label for="slope-width">Ширина ската, м</label>
                        </div>
                        <div class="input-group">
                            <input type="number" id="left-slope-length" placeholder=" " min="2" max="100" step="0.1" required>
                            <label for="left-slope-length">Длина (основного/левого) ската, м</label>
                        </div>
                        <div class="input-group" id="right-slope-group">
                            <input type="number" id="right-slope-length" placeholder=" " min="2" max="100" step="0.1" required>
                            <label for="right-slope-length">Длина правого ската, м</label>
                        </div>
                    </div>
                </div>

                <div class="form-column">
                    <div class="form-section">
                        <h3 class="section-title">Материалы обшивки</h3>
                        <div class="input-group select-group">
                            <label class="static-label">ОСБ</label>
                            <select id="osb-id" class="custom-select" data-category-name="ОСБ">
                                <option value="none">Без ОСБ</option>
                            </select>
                        </div>
                        <div class="input-group select-group">
                            <label class="static-label">Гидро-пароизоляция</label>
                            <select id="water-proofing-id" class="custom-select" data-category-name="Изоляция">
                                <option value="none">Без изоляции</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="toggle-switch-wrapper">
                            <input type="checkbox" id="toggle-insulation" class="toggle-input" checked>
                            <span class="toggle-slider"></span>
                            <h3 class="section-title toggle-title">Утепление кровли</h3>
                        </label>
                        
                        <div class="collapsible-content active" id="insulation-content" style="display: flex;">
                            <div class="input-group select-group">
                                <label class="static-label">Материал утеплителя</label>
                                <select id="insulation-id" class="custom-select" data-category-name="Утеплитель">
                                    </select>
                            </div>
                            <div class="input-group">
                                <input type="number" id="insulation-thickness" placeholder=" " min="50" max="400" step="10" value="200">
                                <label for="insulation-thickness">Толщина утепления, мм</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary btn-large" id="submit-btn">Рассчитать</button>
            </div>
        </form>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="calc-roof/script.js">
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ИНИЦИАЛИЗАЦИЯ И URL ПАРАМЕТРЫ ---
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

    // --- 3. DOM ЭЛЕМЕНТЫ ---
    const backBtn = document.getElementById('btn-back');
    const form = document.getElementById('calc-roof-form');
    const clearBtn = document.getElementById('clear-calc-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const addressInput = document.getElementById('object-address');
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');

    const roofTypeSelect = document.getElementById('roof-type');
    const rightSlopeGroup = document.getElementById('right-slope-group');
    const rightSlopeInput = document.getElementById('right-slope-length');

    const toggleInsulation = document.getElementById('toggle-insulation');
    const insulationContent = document.getElementById('insulation-content');
    
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

    // НОВАЯ ФУНКЦИЯ: Динамическая загрузка материалов из базы данных бэкенда
    const loadMaterials = async () => {
        try {
            const response = await fetch('/api/materials/');
            if (response.ok) {
                const materials = await response.json();
                
                // Находим все селекты, в которых прописан атрибут data-category-name
                const selects = document.querySelectorAll('select[data-category-name]');
                
                selects.forEach(select => {
                    const categoryName = select.getAttribute('data-category-name').toLowerCase();
                    
                    // Ищем опцию 'none' (чтобы сохранить её, например "Без ОСБ")
                    const noneOption = Array.from(select.options).find(opt => opt.value === 'none');
                    
                    select.innerHTML = ''; // Очищаем жестко заданные старые опции
                    if (noneOption) select.appendChild(noneOption);
                    
                    // Фильтруем материалы, пришедшие от бэкенда, по имени категории
                    const filteredMaterials = materials.filter(m => 
                        m.category && m.category.name.toLowerCase().includes(categoryName)
                    );
                    
                    // Добавляем актуальные материалы в выпадающий список
                    filteredMaterials.forEach(mat => {
                        const option = document.createElement('option');
                        option.value = mat.id;
                        option.textContent = mat.name; // Можно добавить цену: + ` (${mat.market_price} ₽)`
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
    loadMaterials(); // Вызываем загрузку материалов

    // --- 5. УПРАВЛЕНИЕ UI (Лейблы, валидация) ---
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

    // --- 6. ДИНАМИЧЕСКИЕ СЕКЦИИ И ПРОВЕРКИ ---
    const updateRoofTypeVisibility = () => {
        if (roofTypeSelect.value === 'Двускатная') {
            rightSlopeGroup.style.display = 'block';
            rightSlopeInput.setAttribute('required', 'true');
        } else {
            rightSlopeGroup.style.display = 'none';
            rightSlopeInput.removeAttribute('required');
            rightSlopeInput.value = ''; // Очищаем значение
            updateLabelState(rightSlopeInput);
        }
    };
    roofTypeSelect.addEventListener('change', updateRoofTypeVisibility);
    updateRoofTypeVisibility();

    toggleInsulation.addEventListener('change', (e) => {
        insulationContent.style.display = e.target.checked ? 'flex' : 'none';
    });

    const validateNumber = (id, name) => {
        const input = document.getElementById(id);
        
        if (input.offsetParent === null) {
            return true;
        }

        const val = parseFloat(input.value);
        if (isNaN(val)) {
            alert(`Пожалуйста, заполните поле "${name}".`);
            input.focus();
            return false;
        }

        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));

        if (!isNaN(val) && (val < min || val > max)) {
            alert(`Значение в поле "${name}" должно быть от ${min} до ${max}.`);
            input.focus();
            return false;
        }

        return true;
    };

    // --- 7. ПОДГОТОВКА И ОТПРАВКА ДАННЫХ (API) ---
    const getSelectIntOrNull = (id) => {
        const val = document.getElementById(id).value;
        return (val && val !== 'none' && val !== '') ? parseInt(val) : null;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (addressInput.value.trim() === '') {
            alert('Пожалуйста, введите адрес объекта строительства.');
            addressInput.focus();
            return;
        }

        if (!validateNumber('slope-width', 'Ширина ската')) return;
        if (!validateNumber('left-slope-length', 'Длина (основного/левого) ската')) return;
        if (!validateNumber('right-slope-length', 'Длина правого ската')) return; 
        if (!validateNumber('insulation-thickness', 'Толщина утепления')) return;

        const roofType = roofTypeSelect.value;
        const isInsulated = toggleInsulation.checked;

        const initRoof = {
            slope_width: parseFloat(document.getElementById('slope-width').value),
            left_slope_length: parseFloat(document.getElementById('left-slope-length').value),
            roof_type: roofType,
            right_slope_length: roofType === 'Двускатная' 
                ? parseFloat(document.getElementById('right-slope-length').value) 
                : null
        };

        const roofModification = {
            osb_id: getSelectIntOrNull('osb-id'),
            water_proofing_id: getSelectIntOrNull('water-proofing-id'),
            insulation_id: isInsulated ? getSelectIntOrNull('insulation-id') : null,
            insulation_thickness: isInsulated ? parseFloat(document.getElementById('insulation-thickness').value) : 0 
        };

        const payload = {
            client_id: parseInt(clientId),
            address: addressInput.value.trim(),
            construction_element: {
                roof: {
                    init_roof: initRoof,
                    roof_modification: roofModification
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
            toggleInsulation.dispatchEvent(new Event('change'));
            roofTypeSelect.dispatchEvent(new Event('change'));
            document.querySelectorAll('.custom-select').forEach(select => select.selectedIndex = 0);
            setTimeout(() => textInputs.forEach(input => updateLabelState(input)), 10);
        }
    });

    // --- 8. ФУТЕР И ПОПОВЕР АВТОРОВ ---
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
</file>

<file path="calc-roof/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
.navbar-container { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }

.logo { 
    display: flex;
    align-items: center;
    font-weight: 800; 
    font-size: 20px; 
    letter-spacing: -0.02em; 
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2;}
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px;}
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1000px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-actions { display: flex; gap: 12px; }

.btn-back { 
    color: var(--text-secondary); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 40px; 
    height: 40px; 
    border-radius: var(--radius-md); 
    background: var(--surface-main); 
    border: 1px solid var(--border-color); 
    transition: var(--transition); 
    flex-shrink: 0;
    text-decoration: none;
}
.btn-back:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--surface-hover); }

.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); }
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; text-decoration: none;}
.btn-secondary:hover { background-color: var(--surface-hover); }
.btn-sm { padding: 8px 16px; }
.btn-large { padding: 16px 32px; font-size: 16px; width: 100%; max-width: 300px; }

/* Карточка клиента (мини) */
.client-mini-card { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; }
.client-details { display: flex; align-items: baseline; gap: 12px; }
.client-details .label { color: var(--text-secondary); font-size: 13px; }
.client-details strong { color: var(--text-primary); font-size: 16px; }
.sub-text { color: var(--text-secondary); font-size: 13px; }

/* Стили Формы и Сетки */
.calc-form { display: flex; flex-direction: column; gap: 24px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }

.form-section { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.section-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }
.subsection-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 16px; margin-bottom: 8px; }

.input-row { display: flex; gap: 16px; align-items: center; width: 100%; }

/* Поля ввода (Управление через классы JS) */
.input-group { 
    position: relative; 
    width: 100%; 
    margin-top: 16px; 
    margin-bottom: 8px; 
}
.input-group input { 
    width: 100%; 
    background: transparent; 
    border: none; 
    border-bottom: 1px solid var(--border-color); 
    padding: 8px 0; 
    color: var(--text-primary); 
    font-size: 15px; 
    font-family: var(--font-family); 
    transition: var(--transition); 
    outline: none; 
}

/* Базовое состояние лейбла для INPUT */
.input-group label:not(.static-label) { 
    position: absolute; 
    left: 0; 
    top: 8px; 
    color: var(--text-secondary); 
    font-size: 15px; 
    pointer-events: none; 
    transition: var(--transition); 
}

/* Поднятое состояние лейбла через классы из JS */
.input-group.is-focused label:not(.static-label), 
.input-group.has-value label:not(.static-label) { 
    top: -16px; 
    font-size: 11px; 
}

.input-group.is-focused label:not(.static-label) {
    color: var(--accent); 
}

.input-group.is-focused input { 
    border-bottom-color: var(--accent); 
}

/* Селекты */
.select-group { margin-top: 16px; }
.static-label { 
    display: block; 
    font-size: 11px; 
    color: var(--text-secondary); 
    margin-bottom: 8px; 
    position: relative;
    pointer-events: auto; 
}
.custom-select { 
    width: 100%; 
    background: rgba(0, 0, 0, 0.3); 
    color: var(--text-primary); 
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-sm); 
    padding: 10px 12px; 
    font-family: var(--font-family); 
    font-size: 14px; 
    outline: none; 
    appearance: none; 
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
    background-repeat: no-repeat; 
    background-position: right 12px center; 
    background-size: 16px; 
    cursor: pointer; 
    transition: var(--transition); 
}
.custom-select:focus { border-color: var(--accent); }
.custom-select option { background: var(--bg-main); color: var(--text-primary); }

/* Toggle Switch (Переключатели) */
.toggle-switch-wrapper { display: flex; align-items: center; cursor: pointer; gap: 12px; margin-bottom: 8px; }
.toggle-title { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.toggle-input { display: none; }
.toggle-slider { position: relative; width: 40px; height: 20px; background-color: var(--surface-hover); border-radius: 20px; transition: var(--transition); border: 1px solid var(--border-color); }
.toggle-slider::before { content: ""; position: absolute; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: var(--text-secondary); border-radius: 50%; transition: var(--transition); }
.toggle-input:checked + .toggle-slider { background-color: rgba(239, 68, 68, 0.2); border-color: var(--accent); }
.toggle-input:checked + .toggle-slider::before { transform: translateX(20px); background-color: var(--accent); }

/* Раскрывающиеся блоки */
.collapsible-content, .dynamic-param-block { display: none; flex-direction: column; gap: 8px; animation: fadeIn 0.3s ease; }
.collapsible-content { border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: 8px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

/* Подвал формы */
.form-actions { display: flex; justify-content: flex-end; padding-top: 24px; border-top: 1px solid var(--border-color); margin-top: 16px; }

/* --- Футер и Авторы проекта --- */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto;
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

/* Состояние: Открыто */
.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* Кастомный скроллбар для окошка */
.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}


/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (ФОРМЫ КАЛЬКУЛЯТОРОВ)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 24px 16px;
    }

    /* Шапка страницы: элементы перестраиваются друг под друга */
    .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .header-left {
        width: 100%;
    }

    .header-actions {
        width: 100%;
    }

    /* Кнопка "Очистить расчет" на всю ширину */
    #clear-calc-btn {
        width: 100%;
        justify-content: center;
    }

    /* Инфо-карточка клиента: ставим ярлык и данные в столбик для экономии ширины */
    .client-mini-card {
        padding: 16px;
    }
    
    .client-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    
    /* Сетка формы: отключаем 2 колонки, делаем 1 колонку */
    .form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .form-section {
        padding: 16px;
    }

    /* Кнопка отправки "Рассчитать" */
    .form-actions {
        justify-content: center;
        width: 100%;
    }

    #submit-btn {
        width: 100%;
        max-width: none; /* Снимаем ограничение в 300px */
    }

    /* Поповер авторов: ограничиваем ширину, чтобы не вылезал за края мобильника */
    .authors-popover {
        width: 290px;
        padding: 20px;
    }
    .authors-list li {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</file>

<file path="calculation/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Расчет | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <div class="header-left">
                <a href="../clients/index.html" class="btn-back" id="back-btn" title="Вернуться назад">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <h1 class="page-title">Расчет <span id="calc-id-display" class="title-id">Загрузка...</span></h1>
                <div class="status-badge" id="calc-status">Загрузка...</div>
            </div>
            <div class="header-actions">
                <button type="button" class="btn-secondary" id="send-email-btn" title="Отправить смету клиенту">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Отправить
                </button>
                <button type="button" class="btn-secondary" id="change-status-btn">Заключить договор</button>
            </div>
        </header>

        <div class="info-panels-grid">
            <div class="info-panel">
                <div class="panel-row">
                    <span class="label">Дата расчета:</span>
                    <strong id="calc-date">--.--.----</strong>
                </div>
                <div class="panel-row">
                    <span class="label">Адрес объекта:</span>
                    <strong id="calc-address">Загрузка...</strong>
                </div>
            </div>
            <div class="info-panel">
                <div class="panel-row">
                    <span class="label">Клиент:</span>
                    <strong id="client-name">Загрузка...</strong>
                </div>
                <div class="panel-row">
                    <span class="label">Контакты:</span>
                    <span id="client-phone"></span>
                </div>
            </div>
        </div>

        <div class="calculation-content">
            <div class="content-header">
                <h2>Детализация сметы</h2>
                <button class="btn-primary btn-sm" id="add-element-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Добавить элемент
                </button>
            </div>

            <div id="calculations-container" class="accordion-container">
            </div>

            <div class="grand-total-card">
                <span class="total-label">ИТОГО стоимость материалов:</span>
                <span class="total-value" id="grand-total-sum">0 ₽</span>
            </div>
        </div>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <div class="modal-overlay" id="select-calc-modal">
        <div class="modal-card select-calc-card">
            <div class="modal-header">
                <h2>Добавить конструктивный элемент</h2>
                <button class="btn-close" id="close-calc-modal-btn" aria-label="Закрыть">×</button>
            </div>
            <div class="calc-options-grid">
                <button class="calc-option-btn" data-type="frame">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path></svg>
                    Каркас
                </button>
                <button class="calc-option-btn" data-type="foundation">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="18" width="18" height="4" rx="1"></rect><rect x="5" y="10" width="14" height="8"></rect><path d="M8 10V6"></path><path d="M16 10V6"></path></svg>
                    Фундамент
                </button>
                <button class="calc-option-btn" data-type="roof">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="2 12 12 2 22 12"></polygon><path d="M12 2v20"></path></svg>
                    Крыша
                </button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="calculation/script.js">
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ПАРАМЕТРЫ URL И ИНИЦИАЛИЗАЦИЯ ---
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId');
    const calcId = urlParams.get('calcId');

    if (!calcId) {
        alert('ID расчета не найден');
        window.location.href = '../clients/index.html';
        return;
    }

    document.getElementById('back-btn').href = clientId ? `../client-card/index.html?id=${clientId}` : '../clients/index.html';
    document.getElementById('calc-id-display').textContent = `№${calcId}`;

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

    // --- 3. DOM ЭЛЕМЕНТЫ ---
    const clientNameEl = document.getElementById('client-name');
    const clientPhoneEl = document.getElementById('client-phone');
    const calcAddressEl = document.getElementById('calc-address');
    const calcDateEl = document.getElementById('calc-date');
    const calcStatusEl = document.getElementById('calc-status');
    const changeStatusBtn = document.getElementById('change-status-btn');
    const sendEmailBtn = document.getElementById('send-email-btn');
    const container = document.getElementById('calculations-container');
    const grandTotalEl = document.getElementById('grand-total-sum');
    const addElementBtn = document.getElementById('add-element-btn');

    let currentCalcData = null;

    // --- 4. ФОРМАТИРОВАНИЕ ---
    const formatMoney = (num) => Number(num).toLocaleString('ru-RU') + ' ₽';
    const formatDate = (isoString) => {
        if (!isoString) return '--.--.----';
        return new Date(isoString).toLocaleDateString('ru-RU');
    };
    const formatPhone = (digits) => {
        if (!digits) return '';
        if (digits.length === 11) return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
        return digits;
    };

    // --- 5. РЕНДЕРИНГ ДАННЫХ И ТАБЛИЦ ---
    const renderCalculation = (data) => {
        const client = data.client || {};
        clientNameEl.textContent = `${client.last_name || ''} ${client.first_name || ''} ${client.patronymic || ''}`.trim() || 'Имя не указано';
        clientPhoneEl.textContent = formatPhone(client.phone_number) || 'Телефон не указан';
        calcAddressEl.textContent = data.address || 'Адрес не указан';
        calcDateEl.textContent = formatDate(data.created_at);

        calcStatusEl.textContent = data.status;
        calcStatusEl.className = 'status-badge ' + (data.status === 'Актуален' ? 'active' : (data.status === 'Заключен договор' ? 'contract' : 'inactive'));

        const isContractSigned = data.status === 'Заключен договор';

        if (isContractSigned) {
            changeStatusBtn.textContent = 'Договор заключен';
            changeStatusBtn.disabled = true;
            changeStatusBtn.style.cursor = 'default';
            changeStatusBtn.style.background = 'rgba(59, 130, 246, 0.1)';
            changeStatusBtn.style.color = '#3B82F6';
            changeStatusBtn.style.borderColor = 'rgba(59, 130, 246, 0.2)';
            addElementBtn.style.display = 'none'; 
        } else {
            changeStatusBtn.textContent = 'Заключить договор';
            changeStatusBtn.disabled = false;
            changeStatusBtn.style.cursor = 'pointer';
            changeStatusBtn.style.background = 'transparent';
            changeStatusBtn.style.color = 'var(--text-primary)';
            changeStatusBtn.style.borderColor = 'var(--border-color)';
            addElementBtn.style.display = 'inline-flex';
        }

        container.innerHTML = '';
        let grandTotal = data.price || 0;

        if (!data.elements || data.elements.length === 0) {
            container.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-secondary); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">В этом расчете пока нет элементов. Выберите элемент для добавления.</div>';
        } else {
            data.elements.forEach(element => {
                const accItem = document.createElement('div');
                accItem.className = 'accordion-item active';

                let tableRowsHTML = '';
                
                element.subelements.forEach(sub => {
                    if(sub.positions.length > 0) {
                        // Строка категории (не превращается в карточку на мобилках)
                        tableRowsHTML += `<tr class="category-row"><td colspan="5">${sub.sub_element_name}</td></tr>`;
                        sub.positions.forEach(pos => {
                            // ИЗМЕНЕНО: Добавлены data-label для мобильной адаптации
                            tableRowsHTML += `
                                <tr>
                                    <td data-label="Материал">${pos.material.name}</td>
                                    <td class="text-right" data-label="Ед. изм.">${pos.material.unit}</td>
                                    <td class="text-right" data-label="Количество">${pos.quantity}</td>
                                    <td class="text-right" data-label="Цена за ед.">${formatMoney(pos.material.market_price)}</td>
                                    <td class="text-right font-medium" data-label="Стоимость">${formatMoney(pos.price)}</td>
                                </tr>
                            `;
                        });
                    }
                });

                if (tableRowsHTML === '') {
                    tableRowsHTML = `<tr><td colspan="5" class="text-center" style="color: var(--text-secondary);">Нет добавленных материалов</td></tr>`;
                }

                accItem.innerHTML = `
                    <div class="accordion-header">
                        <div class="acc-title-group">
                            <svg class="acc-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            <h3>${element.element_name}</h3>
                        </div>
                        <div class="acc-actions">
                            <span class="block-total">${formatMoney(element.price)}</span>
                        </div>
                    </div>
                    <div class="accordion-body">
                        <div class="table-responsive">
                            <table class="data-table calc-table">
                                <thead>
                                    <tr>
                                        <th>Материал</th>
                                        <th class="text-right">Ед. изм.</th>
                                        <th class="text-right">Количество</th>
                                        <th class="text-right">Цена за ед.</th>
                                        <th class="text-right">Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRowsHTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                const header = accItem.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    accItem.classList.toggle('active');
                });

                container.appendChild(accItem);
            });
        }

        grandTotalEl.textContent = formatMoney(grandTotal);
    };

    // --- 6. ВЗАИМОДЕЙСТВИЕ С API ---
    const fetchCalculation = async () => {
        try {
            const response = await fetch(`/api/calculations/${calcId}`);
            if (response.ok) {
                currentCalcData = await response.json();
                renderCalculation(currentCalcData);
            } else {
                alert('Не удалось загрузить расчет. Возможно, он был удален.');
                window.location.href = '../clients/index.html';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Сбой соединения с сервером.');
        }
    };

    fetchCalculation();

    // --- 7. ИЗМЕНЕНИЕ СТАТУСА (Договор) ---
    changeStatusBtn.addEventListener('click', async () => {
        if (!currentCalcData || currentCalcData.status === 'Заключен договор') return;
        
        try {
            changeStatusBtn.disabled = true;
            changeStatusBtn.textContent = 'Обработка...';

            const response = await fetch(`/api/calculations/${calcId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Заключен договор' })
            });

            if (response.ok) {
                const updatedData = await response.json();
                currentCalcData.status = updatedData.status;
                renderCalculation(currentCalcData);
            } else {
                const err = await response.json();
                alert(`Ошибка обновления статуса: ${err.detail}`);
                renderCalculation(currentCalcData); 
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Сбой соединения.');
            renderCalculation(currentCalcData);
        }
    });

    // --- 8. ОТПРАВКА СМЕТЫ НА ПОЧТУ ---
    sendEmailBtn.addEventListener('click', async () => {
        if (!currentCalcData) return;

        const originalHTML = sendEmailBtn.innerHTML;
        sendEmailBtn.innerHTML = `Отправка...`;
        sendEmailBtn.disabled = true;

        try {
            const response = await fetch(`/api/email/send/${calcId}`, {
                method: 'POST'
            });

            if (response.ok) {
                sendEmailBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Отправлено
                `;
                sendEmailBtn.style.color = '#10B981';
                sendEmailBtn.style.borderColor = '#10B981';
                sendEmailBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                alert(`Подробная смета успешно отправлена клиенту: ${currentCalcData.client.email}`);
            } else {
                const err = await response.json();
                alert(`Ошибка при отправке письма: ${err.detail || 'Внутренняя ошибка сервера'}`);
                sendEmailBtn.innerHTML = originalHTML;
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось связаться с сервером для отправки письма.');
            sendEmailBtn.innerHTML = originalHTML;
        } finally {
            setTimeout(() => {
                sendEmailBtn.innerHTML = originalHTML;
                sendEmailBtn.style = '';
                sendEmailBtn.disabled = false;
            }, 3000);
        }
    });

    // --- 9. ЛОГИКА МОДАЛЬНОГО ОКНА (Добавить элемент) ---
    const selectCalcModal = document.getElementById('select-calc-modal');
    const closeCalcModalBtn = document.getElementById('close-calc-modal-btn');
    const calcOptionBtns = document.querySelectorAll('.calc-option-btn');

    addElementBtn.addEventListener('click', () => {
        if (currentCalcData && currentCalcData.elements) {
            const hasRoof = currentCalcData.elements.some(el => el.element_name === 'Крыша');
            const hasFoundation = currentCalcData.elements.some(el => el.element_name === 'Фундамент');

            calcOptionBtns.forEach(btn => {
                const type = btn.dataset.type;
                if (type === 'roof') {
                    btn.style.display = hasRoof ? 'none' : 'flex';
                } else if (type === 'foundation') {
                    btn.style.display = hasFoundation ? 'none' : 'flex';
                }
            });
        }
        selectCalcModal.classList.add('active');
    });

    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const activeClientId = currentCalcData ? currentCalcData.client.id : clientId;
            if (type === 'frame') window.location.href = `../calc-frame/index.html?clientId=${activeClientId}&calcId=${calcId}`;
            else if (type === 'foundation') window.location.href = `../calc-foundation/index.html?clientId=${activeClientId}&calcId=${calcId}`;
            else if (type === 'roof') window.location.href = `../calc-roof/index.html?clientId=${activeClientId}&calcId=${calcId}`;
        });
    });

    // --- 10. ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
        
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });
});
</file>

<file path="calculation/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
    background-color: var(--bg-main); 
    color: var(--text-primary); 
    font-family: var(--font-family); 
    -webkit-font-smoothing: antialiased; 
    min-height: 100vh; 
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
.navbar-container { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }

.logo { 
    display: flex;
    align-items: center;
    font-weight: 800; 
    font-size: 20px; 
    letter-spacing: -0.02em; 
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2;}
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px;}
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

/* Шапка страницы */
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.header-left { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.header-actions { display: flex; gap: 12px; }

.btn-back { 
    color: var(--text-secondary); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 40px; 
    height: 40px; 
    border-radius: var(--radius-md); 
    background: var(--surface-main); 
    border: 1px solid var(--border-color); 
    transition: var(--transition); 
    flex-shrink: 0;
    text-decoration: none;
}
.btn-back:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--surface-hover); }

.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
.title-id { color: var(--text-secondary); font-weight: 500; }

/* Бейджи статусов */
.status-badge { display: inline-flex; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
.status-badge.active { background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); }
.status-badge.contract { background: rgba(59, 130, 246, 0.1); color: #3B82F6; border: 1px solid rgba(59, 130, 246, 0.2); }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center;}
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 6px; }
.btn-secondary:hover { background: var(--surface-hover); }
.btn-outline-danger { background-color: transparent; color: var(--accent); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); }
.btn-outline-danger:hover { background: rgba(239, 68, 68, 0.1); border-color: var(--accent); }
.btn-sm { padding: 8px 16px; font-size: 13px; }

/* Инфо-панели */
.info-panels-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
.info-panel { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.panel-row { display: flex; gap: 8px; font-size: 15px; }
.panel-row .label { color: var(--text-secondary); width: 130px; flex-shrink: 0; }
.panel-row strong { color: var(--text-primary); font-weight: 500; }

/* Блок с расчетами */
.calculation-content { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; }
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); }
.content-header h2 { font-size: 20px; font-weight: 700; }

/* Аккордеоны с таблицами */
.accordion-container { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
.accordion-item { border: 1px solid var(--border-light); border-radius: var(--radius-sm); background: rgba(0, 0, 0, 0.2); overflow: hidden; }
.accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: rgba(255, 255, 255, 0.02); cursor: pointer; user-select: none; transition: var(--transition); }
.accordion-header:hover { background: rgba(255, 255, 255, 0.05); }
.acc-title-group { display: flex; align-items: center; gap: 12px; }
.acc-title-group h3 { font-size: 16px; font-weight: 600; margin: 0; }
.acc-icon { color: var(--text-secondary); transition: transform 0.3s ease; }
.accordion-item.active .acc-icon { transform: rotate(180deg); color: var(--text-primary); }
.acc-actions { display: flex; align-items: center; gap: 24px; }
.block-total { font-weight: 700; font-size: 16px; color: var(--text-primary); }
.accordion-body { display: none; border-top: 1px solid var(--border-light); background: var(--bg-main); }
.accordion-item.active .accordion-body { display: block; animation: fadeIn 0.3s ease; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* Таблица сметы */
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th { padding: 14px 20px; font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.02); }
.data-table td { padding: 14px 20px; font-size: 14px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); vertical-align: middle; }
.data-table tr:hover:not(.category-row) { background: rgba(255, 255, 255, 0.02); }
.category-row td { background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 8px 20px; border-bottom: 1px solid var(--border-color); }
.text-right { text-align: right; }
.text-center { text-align: center; }
.font-medium { font-weight: 600; }

/* ИТОГО */
.grand-total-card { display: flex; justify-content: flex-end; align-items: center; gap: 24px; padding: 24px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-md); }
.total-label { font-size: 18px; font-weight: 600; color: var(--text-primary); text-transform: uppercase; }
.total-value { font-size: 28px; font-weight: 800; color: var(--accent); }

/* Модальные окна */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 100; opacity: 0; visibility: hidden; transition: var(--transition); }
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal-card { background: var(--surface-modal); border: 1px solid var(--border-color); border-radius: var(--radius-md); width: 100%; max-width: 480px; padding: 32px; transform: scale(0.95); transition: var(--transition); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
.modal-overlay.active .modal-card { transform: scale(1); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-close { background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer; line-height: 1; transition: var(--transition); }
.btn-close:hover { color: var(--text-primary); }

.calc-options-grid { display: flex; flex-direction: column; gap: 16px; }
.calc-option-btn { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; color: var(--text-primary); font-family: var(--font-family); font-size: 16px; font-weight: 600; cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 16px; justify-content: flex-start; }
.calc-option-btn svg { color: var(--text-secondary); transition: var(--transition); }
.calc-option-btn:hover { background: var(--surface-hover); border-color: var(--accent); transform: translateX(5px); }
.calc-option-btn:hover svg { color: var(--accent); }

/* --- Футер и Авторы проекта --- */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto;
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}


/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (СМЕТА / РАСЧЕТ)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 20px 16px;
        width: 100%;
        overflow-x: hidden; 
    }

    /* Шапка: элементы друг под другом */
    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    
    .header-left {
        width: 100%;
        flex-wrap: wrap;
    }

    .header-actions {
        width: 100%;
        flex-direction: column;
        gap: 12px;
    }
    
    .header-actions button {
        width: 100%;
        justify-content: center;
    }

    /* Инфо-панели */
    .info-panels-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .panel-row {
        flex-direction: column;
        gap: 4px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding-bottom: 8px;
        margin-bottom: 8px;
    }
    
    .panel-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    
    .panel-row .label {
        font-size: 12px;
        width: 100%;
    }

    /* Блок с расчетами */
    .calculation-content {
        padding: 16px; 
        width: 100%;
        box-sizing: border-box;
    }

    .content-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .content-header button {
        width: 100%;
        justify-content: center;
    }

    .accordion-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .acc-actions {
        width: 100%;
        justify-content: space-between;
    }

    /* --- АДАПТАЦИЯ ТАБЛИЦЫ СМЕТЫ (Table-to-Cards) --- */
    .data-table thead {
        display: none;
    }

    .data-table, .data-table tbody, .data-table tr, .data-table td {
        display: block;
        width: 100%;
        box-sizing: border-box;
    }

    /* Карточка отдельного материала */
    .data-table tr:not(.category-row) {
        background: var(--surface-main);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        margin-bottom: 12px;
        padding: 12px 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* ИСПРАВЛЕНО: Спец. стили для строки-заголовка категории */
    .data-table tr.category-row {
        background: var(--bg-main) !important; /* Жестко красим в цвет фона страницы */
        border: none;
        padding: 0;
        margin-bottom: 8px;
        margin-top: 24px; 
        box-shadow: none;
    }

    .data-table tr.category-row td {
        background: var(--bg-main) !important; /* Жестко красим саму ячейку */
        color: var(--text-secondary); 
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-bottom: 1px solid var(--border-color);
        text-align: left;
        padding: 0 0 8px 0; 
        display: block;
    }

    .data-table tr.category-row td::before {
        display: none;
    }

    /* Ячейки внутри карточки материала */
    .data-table td:not(.category-row td) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        text-align: right;
        gap: 12px;
    }

    .data-table td:not(.category-row td):last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    /* Ярлыки столбцов (взяты из data-label) */
    .data-table td:not(.category-row td)::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--text-secondary);
        text-align: left;
        flex-shrink: 0;
    }

    /* ИТОГО */
    .grand-total-card {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 8px;
        padding: 20px 16px;
        width: 100%; 
        box-sizing: border-box;
        border-radius: var(--radius-md);
        margin-top: 16px;
    }
    
    .total-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: none; 
        white-space: normal; 
        word-wrap: break-word; 
        width: 100%;
        text-align: center;
        line-height: 1.3;
    }
    
    .total-value {
        font-size: 28px;
        word-break: break-word; 
        text-align: center;
        line-height: 1.2;
    }

    /* Модальное окно */
    .modal-card {
        padding: 24px 16px;
        max-width: 90%;
        box-sizing: border-box;
    }
    
    .calc-option-btn {
        padding: 16px;
        font-size: 15px;
    }
}
</file>

<file path="client-card/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Карточка клиента | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <div class="header-left">
                <a href="../clients/index.html" class="btn-back" title="Вернуться к списку клиентов">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <h1 class="page-title">Карточка клиента</h1>
            </div>
            <button class="btn-primary" id="open-calc-modal-btn">Создать расчет</button>
        </header>

        <div class="client-info-card" id="client-info-card">
            <div class="client-info-header">
                <h2 class="client-info-title">Информация о клиенте</h2>
                <button class="btn-secondary btn-sm" id="edit-client-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Изменить
                </button>
            </div>
            
            <div class="client-details-grid">
                <div class="detail-item">
                    <span class="detail-label">ФИО</span>
                    <div class="detail-value-group">
                        <span id="display-name" class="detail-value">Загрузка...</span>
                        <button class="icon-btn copy-btn" data-copy-target="display-name" title="Скопировать ФИО">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

                <div class="detail-item">
                    <span class="detail-label">Телефон</span>
                    <div class="detail-value-group">
                        <span id="display-phone" class="detail-value">Загрузка...</span>
                        <button class="icon-btn copy-btn" data-copy-target="display-phone" title="Скопировать телефон">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

                <div class="detail-item">
                    <span class="detail-label">E-mail</span>
                    <div class="detail-value-group">
                        <span id="display-email" class="detail-value">Загрузка...</span>
                        <button class="icon-btn copy-btn" data-copy-target="display-email" title="Скопировать E-mail">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-card">
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Расчет</th>
                            <th>Дата</th>
                            <th>Статус</th>
                            <th>Адрес строительства</th>
                            <th class="text-right">Действия</th>
                        </tr>
                    </thead>
                    <tbody id="calculations-table-body">
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <div class="modal-overlay" id="edit-client-modal">
        <div class="modal-card">
            <div class="modal-header">
                <h2>Редактировать клиента</h2>
                <button class="btn-close" id="close-edit-modal-btn" aria-label="Закрыть">×</button>
            </div>
            <form class="modal-form" id="edit-client-form" novalidate>
                <div class="input-group">
                    <input type="text" id="edit-lastname" placeholder=" " required maxlength="50">
                    <label for="edit-lastname">Фамилия</label>
                </div>
                <div class="input-group">
                    <input type="text" id="edit-firstname" placeholder=" " required maxlength="50">
                    <label for="edit-firstname">Имя</label>
                </div>
                <div class="input-group">
                    <input type="text" id="edit-middlename" placeholder=" " maxlength="50">
                    <label for="edit-middlename">Отчество</label>
                </div>
                <div class="input-group">
                    <input type="tel" id="edit-phone" placeholder=" " required maxlength="18">
                    <label for="edit-phone">Телефон</label>
                </div>
                <div class="input-group">
                    <input type="email" id="edit-email" placeholder=" " required maxlength="100">
                    <label for="edit-email">E-mail</label>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" id="cancel-edit-modal-btn">Отмена</button>
                    <button type="submit" class="btn-primary">Сохранить</button>
                </div>
            </form>
        </div>
    </div>

    <div class="modal-overlay" id="select-calc-modal">
        <div class="modal-card select-calc-card">
            <div class="modal-header">
                <h2>Выбор конструктивного элемента</h2>
                <button class="btn-close" id="close-calc-modal-btn" aria-label="Закрыть">×</button>
            </div>
            <div class="calc-options-grid">
                <button class="calc-option-btn" data-type="frame">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path></svg>
                    Каркас
                </button>
                <button class="calc-option-btn" data-type="foundation">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="18" width="18" height="4" rx="1"></rect><rect x="5" y="10" width="14" height="8"></rect><path d="M8 10V6"></path><path d="M16 10V6"></path></svg>
                    Фундамент
                </button>
                <button class="calc-option-btn" data-type="roof">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="2 12 12 2 22 12"></polygon><path d="M12 2v20"></path></svg>
                    Крыша
                </button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="client-card/script.js">
document.addEventListener('DOMContentLoaded', () => {
    // --- ЗАГРУЗКА ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ И ЛОГИКА ВЫХОДА ---
    const logoutBtn = document.getElementById('logout-btn');
    const token = localStorage.getItem('access_token');
    
    const loadUserProfile = async () => {
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

    // --- ИНИЦИАЛИЗАЦИЯ КАРТОЧКИ КЛИЕНТА (ЖЕСТКАЯ ВАЛИДАЦИЯ ID) ---
    const urlParams = new URLSearchParams(window.location.search);
    const rawClientId = urlParams.get('id');
    const clientId = parseInt(rawClientId, 10);

    if (isNaN(clientId)) {
        alert('Ошибка: некорректный ID клиента в адресной строке.');
        window.location.href = '../clients/index.html';
        return;
    }

    let currentClient = {};
    let clientCalculations = [];

    // --- DOM Элементы ---
    const displayName = document.getElementById('display-name');
    const displayPhone = document.getElementById('display-phone');
    const displayEmail = document.getElementById('display-email');
    const editClientBtn = document.getElementById('edit-client-btn');
    
    const editClientModal = document.getElementById('edit-client-modal');
    const editClientForm = document.getElementById('edit-client-form');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    const cancelEditModalBtn = document.getElementById('cancel-edit-modal-btn');
    
    const inputLastName = document.getElementById('edit-lastname');
    const inputFirstName = document.getElementById('edit-firstname');
    const inputMiddleName = document.getElementById('edit-middlename');
    const inputPhone = document.getElementById('edit-phone');
    const inputEmail = document.getElementById('edit-email');

    const tableBody = document.getElementById('calculations-table-body');
    const openCalcModalBtn = document.getElementById('open-calc-modal-btn');
    const selectCalcModal = document.getElementById('select-calc-modal');
    const closeCalcModalBtn = document.getElementById('close-calc-modal-btn');
    const calcOptionBtns = document.querySelectorAll('.calc-option-btn');

    // --- Вспомогательные функции форматирования ---
    const formatPhoneForDisplay = (digits) => {
        if (!digits) return 'Не указан';
        if (digits.length === 11) {
            return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
        }
        return digits;
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('ru-RU');
    };

    const formatMoney = (num) => {
        return Number(num).toLocaleString('ru-RU') + ' ₽';
    };

    // --- ФУНКЦИИ РЕНДЕРИНГА UI ---
    const renderClientInfo = () => {
        displayName.textContent = `${currentClient.last_name || ''} ${currentClient.first_name || ''} ${currentClient.patronymic || ''}`.trim() || 'Загрузка...';
        displayPhone.textContent = formatPhoneForDisplay(currentClient.phone_number);
        displayEmail.textContent = currentClient.email || 'Не указан';
    };

    const renderTable = () => {
        tableBody.innerHTML = '';
        if (clientCalculations.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 32px;">Нет сохраненных расчетов</td></tr>`;
            return;
        }

        clientCalculations.forEach(calc => {
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer'; 
            
            let statusBadge = '';
            if (calc.status === 'Актуален') statusBadge = '<span class="badge active">Актуален</span>';
            else if (calc.status === 'Не актуален') statusBadge = '<span class="badge inactive">Не актуален</span>';
            else if (calc.status === 'Заключен договор') statusBadge = '<span class="badge contract">Заключен договор</span>';
            else statusBadge = `<span class="badge">${calc.status}</span>`;

            // ИСПРАВЛЕНО: Используем надежный clientId из URL, а не currentClient.id
            const calcUrl = `../calculation/index.html?clientId=${clientId}&calcId=${calc.id}`;

            tr.innerHTML = `
                <td data-label="Расчет" onclick="window.location.href='${calcUrl}'">
                    <div class="td-content">
                        <strong>Расчет №${calc.id}</strong>
                        <span class="sub-text">${formatMoney(calc.price)}</span>
                    </div>
                </td>
                <td data-label="Дата" onclick="window.location.href='${calcUrl}'">${formatDate(calc.created_at)}</td>
                <td data-label="Статус" onclick="window.location.href='${calcUrl}'">${statusBadge}</td>
                <td data-label="Адрес" onclick="window.location.href='${calcUrl}'">
                    <div class="td-content address-content">
                        ${calc.address || 'Не указан'}
                    </div>
                </td>
                <td data-label="Действия" class="text-right">
                    <div class="action-icons">
                        <button class="icon-btn delete" title="Удалить расчет" data-id="${calc.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Обработчик для удаления расчета
        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const calcIdToDelete = btn.dataset.id;
                
                if (!confirm(`Вы уверены, что хотите навсегда удалить расчет №${calcIdToDelete}?`)) return;

                try {
                    const response = await fetch(`/api/calculations/${calcIdToDelete}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.ok) {
                        fetchCalculationsData();
                    } else {
                        const errorData = await response.json();
                        alert(`Ошибка удаления: ${errorData.detail || 'Не удалось удалить расчет'}`);
                    }
                } catch (error) {
                    console.error('Ошибка сети:', error);
                    alert('Не удалось связаться с сервером для удаления расчета.');
                }
            });
        });
    };

    // --- ВЗАИМОДЕЙСТВИЕ С БЭКЕНДОМ (API) ---
    const fetchClientData = async () => {
        try {
            const response = await fetch(`/api/clients/${clientId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                currentClient = await response.json();
                renderClientInfo();
            } else {
                let errorDetails = '';
                try {
                    const errData = await response.json();
                    errorDetails = JSON.stringify(errData.detail || errData);
                } catch(e) {}
                
                alert(`Не удалось загрузить данные клиента.\nОшибка сервера: ${response.status}\nДетали: ${errorDetails}`);
                window.location.href = '../clients/index.html';
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Ошибка сети при загрузке клиента.');
            window.location.href = '../clients/index.html';
        }
    };

    const fetchCalculationsData = async () => {
        try {
            const response = await fetch(`/api/calculations/?client_id=${clientId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                clientCalculations = await response.json();
                renderTable();
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    // --- Кнопки копирования в буфер ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copyTarget;
            const textToCopy = document.getElementById(targetId).textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                btn.classList.add('success');
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('success');
                }, 2000);
            });
        });
    });

    // --- Логика Модалки Редактирования ---
    editClientBtn.addEventListener('click', () => {
        inputLastName.value = currentClient.last_name || '';
        inputFirstName.value = currentClient.first_name || '';
        inputMiddleName.value = currentClient.patronymic || '';
        
        let phone = currentClient.phone_number || '';
        if (phone.length === 11) {
            phone = `+${phone[0]} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 9)}-${phone.substring(9, 11)}`;
        }
        inputPhone.value = phone;
        inputEmail.value = currentClient.email || '';
        
        editClientModal.classList.add('active');
        
        document.querySelectorAll('#edit-client-form .input-group input').forEach(input => {
            if (input.value) input.closest('.input-group').classList.add('has-value');
        });
    });

    closeEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    cancelEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    
    // --- ВАЛИДАЦИЯ И ОБНОВЛЕНИЕ КЛИЕНТА (PUT) ---
    const validateEditForm = () => {
        const lastName = inputLastName.value.trim();
        const firstName = inputFirstName.value.trim();
        const phone = inputPhone.value.trim();
        const email = inputEmail.value.trim();

        if (!lastName || !firstName) {
            alert('Поля "Фамилия" и "Имя" обязательны для заполнения.');
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

    editClientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateEditForm()) return;
        
        const newPhone = inputPhone.value.replace(/\D/g, '').substring(0, 11);
        const newEmail = inputEmail.value.trim();

        const finalPhone = (newPhone === currentClient.phone_number) ? null : newPhone;
        const finalEmail = (newEmail === currentClient.email) ? null : newEmail;

        const payload = {
            last_name: inputLastName.value.trim(),
            first_name: inputFirstName.value.trim(),
            patronymic: inputMiddleName.value.trim() || "",
            phone_number: finalPhone,
            email: finalEmail
        };

        try {
            const response = await fetch(`/api/clients/${clientId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const updatedClient = await response.json();
                currentClient = updatedClient; 
                renderClientInfo();            
                editClientModal.classList.remove('active');
            } else {
                const errorData = await response.json();
                alert(`Ошибка сохранения: ${errorData.detail || 'Проверьте уникальность email и телефона'}`);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Не удалось связаться с сервером.');
        }
    });

    // --- УМНАЯ ЕДИНАЯ МАСКИРОВКА ВВОДА ---
    const onlyLetters = function() { 
        this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, ''); 
    };
    inputLastName.addEventListener('input', onlyLetters);
    inputFirstName.addEventListener('input', onlyLetters);
    inputMiddleName.addEventListener('input', onlyLetters);
    
    const onPhoneInput = function (e) {
        let input = e.target;
        let inputNumbersValue = input.value.replace(/\D/g, '').substring(0, 11);
        let selectionStart = input.selectionStart;
        if (!inputNumbersValue) return input.value = "";
        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue;
            return;
        }
        let formattedInputValue = '+' + inputNumbersValue[0];
        if (inputNumbersValue.length > 1) formattedInputValue += ' (' + inputNumbersValue.substring(1, 4);
        if (inputNumbersValue.length >= 5) formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        if (inputNumbersValue.length >= 8) formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        if (inputNumbersValue.length >= 10) formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) e.target.value = "";
    };

    inputPhone.addEventListener('input', onPhoneInput);
    inputPhone.addEventListener('keydown', onPhoneKeyDown);

    // --- Логика Модалки Создания Расчета ---
    openCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.add('active'));
    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            // ИСПРАВЛЕНО: Используем надежный clientId из URL
            if (type === 'frame') window.location.href = `../calc-frame/index.html?clientId=${clientId}`;
            else if (type === 'foundation') window.location.href = `../calc-foundation/index.html?clientId=${clientId}`;
            else if (type === 'roof') window.location.href = `../calc-roof/index.html?clientId=${clientId}`;
            selectCalcModal.classList.remove('active');
        });
    });

    // --- ФУТЕР И ПОПОВЕР АВТОРОВ ---
    const authorsBtn = document.getElementById('authors-btn');
    const authorsPopover = document.getElementById('authors-popover');

    if (authorsBtn && authorsPopover) {
        authorsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorsPopover.classList.toggle('active');
        });
    }

    // Обработчик клика по окну для закрытия модалок и поповера
    window.addEventListener('click', (e) => {
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
        
        if (authorsPopover && authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });

    // Запускаем загрузку данных при открытии страницы
    fetchClientData();
    fetchCalculationsData();
});
</file>

<file path="client-card/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar {
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 10;
}
.navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.02em;
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2; }
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px; }
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.header-left { display: flex; align-items: center; gap: 16px; }

.btn-back {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; 
    height: 40px; 
    border-radius: var(--radius-md);
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    transition: var(--transition);
    flex-shrink: 0;
    text-decoration: none;
}
.btn-back:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--surface-hover); }

.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center;}
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 8px; justify-content: center; }
.btn-secondary:hover { background-color: var(--surface-hover); }
.btn-sm { padding: 8px 16px; }

/* Карточка клиента */
.client-info-card {
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    margin-bottom: 32px;
}
.client-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
}
.client-info-title { font-size: 20px; font-weight: 700; color: var(--text-primary); }
.client-details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px 16px; }
.detail-item { display: flex; flex-direction: column; gap: 6px; }
.detail-label { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
.detail-value-group { display: flex; align-items: center; gap: 8px; }
.detail-value { font-size: 15px; color: var(--text-primary); font-weight: 500; }

/* Кнопки копирования */
.copy-btn { opacity: 0.4; padding: 4px; background: none; border: none; color: var(--text-secondary); cursor: pointer; transition: var(--transition); border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.copy-btn:hover { opacity: 1; color: var(--accent); background: rgba(239, 68, 68, 0.1); }
.copy-btn.success { color: #10B981; opacity: 1; }

/* Таблица */
.table-card { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th { padding: 16px 24px; font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-light); background: rgba(0, 0, 0, 0.2); }
.data-table td { padding: 16px 24px; font-size: 14px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); vertical-align: middle; cursor: pointer; }
.data-table tbody tr { transition: var(--transition); }
.data-table tbody tr:hover { background: var(--surface-hover); }
.text-right { text-align: right; }

/* Вспомогательные классы для содержимого ячеек таблиц */
.td-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}
.address-content {
    max-width: 350px;
    word-wrap: break-word;
    white-space: normal;
}
.data-table td .sub-text {
    display: block;
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
}

/* Статусы */
.badge { display: inline-flex; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.badge.active { background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); }
.badge.inactive { background: rgba(161, 161, 170, 0.1); color: #A1A1AA; border: 1px solid rgba(161, 161, 170, 0.2); }
.badge.contract { background: rgba(59, 130, 246, 0.1); color: #3B82F6; border: 1px solid rgba(59, 130, 246, 0.2); }

/* Действия в таблице */
.action-icons { display: flex; gap: 12px; justify-content: flex-end; }
.icon-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; transition: var(--transition); padding: 4px; border-radius: 4px; }
.icon-btn:hover { background: rgba(255, 255, 255, 0.1); color: var(--text-primary); }
.icon-btn.delete:hover { color: var(--accent); background: rgba(239, 68, 68, 0.1); }

/* Модальные окна */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 100; opacity: 0; visibility: hidden; transition: var(--transition); }
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal-card { background: var(--surface-modal); border: 1px solid var(--border-color); border-radius: var(--radius-md); width: 100%; max-width: 480px; padding: 32px; transform: scale(0.95); transition: var(--transition); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
.modal-overlay.active .modal-card { transform: scale(1); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-close { background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer; line-height: 1; transition: var(--transition); }
.btn-close:hover { color: var(--text-primary); }
.modal-form { display: flex; flex-direction: column; gap: 20px; }
.input-group { position: relative; width: 100%; }
.input-group input { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--border-color); padding: 12px 0; color: var(--text-primary); font-size: 15px; font-family: var(--font-family); transition: var(--transition); outline: none; }
.input-group label { position: absolute; left: 0; top: 12px; color: var(--text-secondary); font-size: 15px; pointer-events: none; transition: var(--transition); }
.input-group input:focus, .input-group input:not(:placeholder-shown) { border-bottom-color: var(--accent); }
.input-group input:focus + label, .input-group input:not(:placeholder-shown) + label { top: -12px; font-size: 11px; color: var(--accent); }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px; }

/* Сетка выбора конструктивного элемента */
.calc-options-grid { display: flex; flex-direction: column; gap: 16px; }
.calc-option-btn { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; color: var(--text-primary); font-family: var(--font-family); font-size: 16px; font-weight: 600; cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 16px; justify-content: flex-start; }
.calc-option-btn svg { color: var(--text-secondary); transition: var(--transition); }
.calc-option-btn:hover { background: var(--surface-hover); border-color: var(--accent); transform: translateX(5px); }
.calc-option-btn:hover svg { color: var(--accent); }

/* --- Футер и Авторы проекта --- */
.app-footer { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 10; padding: 24px 0; margin-top: auto; }
.copyright { color: var(--text-secondary); font-size: 12px; }
.authors-popover-container { position: relative; }
.authors-trigger { color: var(--text-secondary); font-size: 13px; cursor: pointer; transition: var(--transition); text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 4px; }
.authors-trigger:hover { color: var(--text-primary); text-decoration-color: var(--text-primary); }

.authors-popover { position: absolute; bottom: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(10px); width: 340px; background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7); backdrop-filter: blur(15px); opacity: 0; visibility: hidden; transition: var(--transition); z-index: 20; max-height: 300px; overflow-y: auto; }
.authors-popover.active { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.authors-popover::-webkit-scrollbar { width: 6px; }
.authors-popover::-webkit-scrollbar-track { background: transparent; margin: 12px 0; }
.authors-popover::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
.authors-popover::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }

.popover-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; text-align: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }
.authors-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
.authors-list li { display: flex; justify-content: space-between; align-items: center; font-size: 13px; gap: 16px; }
.authors-list li span { color: var(--text-secondary); font-weight: 500; }
.authors-list li a { color: var(--accent); text-decoration: none; font-weight: 600; transition: var(--transition); white-space: nowrap; }
.authors-list li a:hover { text-shadow: 0 0 8px rgba(239, 68, 68, 0.4); color: var(--text-primary); }

/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (КАРТОЧКА КЛИЕНТА)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 24px 16px;
    }

    /* Шапка страницы: элементы друг под другом */
    .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .header-left {
        width: 100%;
    }

    #open-calc-modal-btn {
        width: 100%;
        justify-content: center;
    }

    /* Карточка с информацией о клиенте */
    .client-info-card {
        padding: 16px;
    }

    .client-info-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    #edit-client-btn {
        width: 100%;
        justify-content: center;
    }

    /* Детали клиента в одну колонку на мобилке */
    .client-details-grid {
        grid-template-columns: 1fr; 
        gap: 16px;
    }

    /* --- АДАПТАЦИЯ ТАБЛИЦЫ РАСЧЕТОВ (Table-to-Cards) --- */
    
    .data-table thead {
        display: none;
    }

    .data-table, .data-table tbody, .data-table tr, .data-table td {
        display: block;
        width: 100%;
    }

    .data-table tr {
        background: var(--surface-main);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        margin-bottom: 16px;
        padding: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .data-table td {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        text-align: right;
        font-size: 14px;
    }

    /* Адаптация контента ячейки для мобильных (отменяем левое выравнивание десктопа) */
    .data-table td .td-content {
        align-items: flex-end;
        text-align: right;
    }
    
    .data-table td .address-content {
        max-width: 180px;
    }

    /* Убираем полоску у последней ячейки (где кнопки действий) */
    .data-table td:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-top: 8px;
        justify-content: flex-end; 
    }

    /* Добавляем подписи столбцов через CSS */
    .data-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--text-secondary);
        text-align: left;
        padding-right: 16px;
        flex-shrink: 0;
        margin-top: 2px;
    }

    /* Фикс для значков и кнопок внутри ячеек */
    .data-table td > .badge {
        display: inline-block;
        text-align: right;
    }

    .action-icons {
        width: 100%;
        justify-content: flex-end;
    }

    /* Модальные окна */
    .modal-card {
        padding: 24px 16px;
        max-width: 90%;
        box-sizing: border-box; /* ИСПРАВЛЕНО: не дает модалке стать шире экрана */
    }

    .modal-actions {
        flex-direction: column-reverse;
        width: 100%;
    }

    /* ИСПРАВЛЕНО: центрируем текст внутри кнопок, когда они на 100% ширины */
    .modal-actions button {
        width: 100%;
        justify-content: center;
    }
    
    /* Поповер авторов */
    .authors-popover {
        width: 290px;
        padding: 20px;
    }
    .authors-list li {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</file>

<file path="clients/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Клиенты | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
            </div>
            <div class="user-profile">
                <div class="user-info-text">
                    <span class="user-name" id="current-user-name">Загрузка...</span>
                    <span class="user-role" id="current-user-login"></span>
                </div>
                <button id="logout-btn" class="btn-secondary btn-sm" style="margin-left: 12px;">Выйти</button>
            </div>
        </div>
    </header>

    <main class="container">
        <header class="page-header">
            <h1 class="page-title">Клиенты</h1>
            <div class="controls-bar">
                <div class="search-wrapper">
                    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="search-input" class="search-input" placeholder="Поиск по ФИО...">
                </div>

                <div class="filter-wrapper" id="filter-wrapper">
                    <button class="btn-secondary" id="filter-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        Фильтры
                        <span class="filter-badge" id="filter-badge" style="display: none;"></span>
                    </button>

                    <div class="filter-dropdown" id="filter-dropdown">
                        <div class="filter-group">
                            <h4 class="filter-title">Наличие проектов</h4>
                            <select id="projects-filter" class="custom-select">
                                <option value="all">Все клиенты</option>
                                <option value="with-projects">Есть проекты (>0)</option>
                                <option value="no-projects">Без проектов (0)</option>
                            </select>
                        </div>
                        <div class="filter-actions">
                            <button class="btn-secondary btn-sm" id="reset-filters">Сбросить</button>
                            <button class="btn-primary btn-sm" id="apply-filters">Применить</button>
                        </div>
                    </div>
                </div>
                <button class="btn-primary" id="open-modal-btn">+ Создать</button>
            </div>
        </header>

        <div class="table-card">
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Клиенты</th>
                            <th>Телефон</th>
                            <th>Проекты</th>
                            <th class="text-right">Действия</th>
                        </tr>
                    </thead>
                    <tbody id="clients-table-body">
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <div class="modal-overlay" id="create-modal">
        <div class="modal-card">
            <div class="modal-header">
                <h2>Новый клиент</h2>
                <button class="btn-close" id="close-modal-btn" aria-label="Закрыть">×</button>
            </div>
            <form class="modal-form" id="create-client-form" novalidate>
                <div class="input-group">
                    <input type="text" id="lastname" placeholder=" " required maxlength="50">
                    <label for="lastname">Фамилия</label>
                </div>
                <div class="input-group">
                    <input type="text" id="firstname" placeholder=" " required maxlength="50">
                    <label for="firstname">Имя</label>
                </div>
                <div class="input-group">
                    <input type="text" id="middlename" placeholder=" " maxlength="50">
                    <label for="middlename">Отчество</label>
                </div>
                <div class="input-group">
                    <input type="tel" id="phone" placeholder=" " required maxlength="18">
                    <label for="phone">Телефон</label>
                </div>
                <div class="input-group">
                    <input type="email" id="email" placeholder=" " required>
                    <label for="email">Почта</label>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" id="cancel-modal-btn">Отмена</button>
                    <button type="submit" class="btn-primary">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
</file>

<file path="clients/script.js">
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

    // --- Вспомогательная функция: форматирование телефона ---
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

            // ИСПРАВЛЕНО: Добавлены обертки <div class="td-content"> для правильного выравнивания
            tr.innerHTML = `
                <td data-label="Клиент">
                    <div class="td-content">
                        <strong>${client.fullName}</strong>
                        <span class="sub-text">ID: ${client.id.toString().padStart(4, '0')}</span>
                    </div>
                </td>
                <td data-label="Контакты">
                    <div class="td-content">
                        ${client.phone}
                        <span class="sub-text">${client.email}</span>
                    </div>
                </td>
                <td data-label="Проекты">
                    <div class="td-content">
                        ${client.projects} шт.
                    </div>
                </td>
                <td class="text-right" data-label="Действия">
                    <div class="td-content" style="align-items: flex-end;">
                        <a href="../client-card/index.html?id=${client.id}" class="link-action" onclick="event.stopPropagation();">Открыть →</a>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // --- ЗАГРУЗКА КЛИЕНТОВ С БЭКЕНДА (GET) ---
    const fetchClients = async () => {
        try {
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
</file>

<file path="clients/style.css">
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.4);
    --surface-hover: rgba(34, 34, 34, 0.8);
    --surface-modal: rgba(26, 26, 26, 0.95);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-light: rgba(255, 255, 255, 0.1);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
    background-color: var(--bg-main); 
    color: var(--text-primary); 
    font-family: var(--font-family); 
    -webkit-font-smoothing: antialiased; 
    min-height: 100vh; 
    display: flex;
    flex-direction: column;
}

/* Навигация */
.navbar { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
.navbar-container { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }

.logo { 
    display: flex;
    align-items: center;
    font-weight: 800; 
    font-size: 20px; 
    letter-spacing: -0.02em; 
}
.logo-image {
    height: 60px;
    width: auto;
    display: block;
}

/* Профиль пользователя */
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info-text { display: flex; flex-direction: column; align-items: flex-end;}
.user-name { color: var(--text-primary); font-size: 14px; font-weight: 500; line-height: 1.2;}
.user-role { color: var(--text-secondary); font-size: 12px; margin-top: 4px;}
.avatar { width: 32px; height: 32px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }

/* Основной контент */
.container { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 40px 24px; 
    width: 100%;
    flex: 1;
}

/* Шапка страницы */
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.page-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
.controls-bar { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }

/* Поиск */
.search-wrapper { position: relative; width: 320px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); }
.search-input { width: 100%; background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 12px 10px 40px; color: var(--text-primary); font-size: 14px; font-family: var(--font-family); transition: var(--transition); }
.search-input:focus { outline: none; border-color: var(--accent); background: rgba(0, 0, 0, 0.4); }

/* Фильтры */
.filter-wrapper { position: relative; }
.filter-dropdown { position: absolute; top: calc(100% + 8px); right: 0; background: var(--surface-modal); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; width: 280px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: var(--transition); z-index: 20; }
.filter-dropdown.active { opacity: 1; visibility: visible; transform: translateY(0); }
.filter-group { margin-bottom: 20px; }
.filter-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
.filter-actions { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid var(--border-color); padding-top: 16px; }
.filter-badge { background: var(--accent); color: #FFF; font-size: 10px; font-weight: 700; width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-left: 6px; }

/* Кастомный селект для фильтра */
.custom-select { width: 100%; background: rgba(0, 0, 0, 0.3); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 12px; font-family: var(--font-family); font-size: 14px; outline: none; appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; cursor: pointer; transition: var(--transition); }
.custom-select:focus { border-color: var(--accent); }
.custom-select option { background: var(--bg-main); color: var(--text-primary); }

/* Кнопки */
.btn-primary { background-color: var(--accent); color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 700; font-family: var(--font-family); cursor: pointer; transition: var(--transition); }
.btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.btn-secondary { background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 14px; font-weight: 500; font-family: var(--font-family); cursor: pointer; transition: var(--transition); display: flex; align-items: center; gap: 6px; }
.btn-secondary:hover { background: var(--surface-hover); }
.btn-sm { padding: 8px 16px; flex: 1; justify-content: center; }

/* Таблица */
.table-card { background: var(--surface-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th { padding: 16px 24px; font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.02); }
.data-table td { padding: 16px 24px; font-size: 15px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); transition: var(--transition); vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: rgba(255, 255, 255, 0.03); }

/* Выравнивание и обертки для ячеек */
.td-content { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.sub-text { display: block; font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
.text-right { text-align: right; }
.link-action { color: var(--accent); text-decoration: none; font-weight: 500; transition: var(--transition); }
.link-action:hover { text-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }

/* Модальное окно */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 100; opacity: 0; visibility: hidden; transition: var(--transition); }
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal-card { background: var(--surface-modal); border: 1px solid var(--border-color); border-radius: var(--radius-md); width: 100%; max-width: 480px; padding: 32px; transform: scale(0.95); transition: var(--transition); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
.modal-overlay.active .modal-card { transform: scale(1); }

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-header h2 { font-size: 20px; font-weight: 700; }
.btn-close { background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer; line-height: 1; transition: var(--transition); }
.btn-close:hover { color: var(--text-primary); }

.modal-form { display: flex; flex-direction: column; gap: 20px; }
.input-group { position: relative; width: 100%; }
.input-group input { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--border-color); padding: 8px 0; color: var(--text-primary); font-size: 15px; font-family: var(--font-family); transition: var(--transition); outline: none; }
.input-group label { position: absolute; left: 0; top: 8px; color: var(--text-secondary); font-size: 15px; pointer-events: none; transition: var(--transition); }
.input-group input:focus, .input-group input:not(:placeholder-shown) { border-bottom-color: var(--accent); }
.input-group input:focus + label, .input-group input:not(:placeholder-shown) + label { top: -12px; font-size: 11px; color: var(--accent); }

.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px; }

/* --- Футер и Авторы проекта --- */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto;
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

/* Состояние: Открыто */
.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* Кастомный скроллбар для окошка */
.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}


/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ (КЛИЕНТЫ)
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: 24px 16px;
    }

    /* Исправление "уехавших" кнопок в панели управления */
    .controls-bar {
        flex-direction: column; 
        align-items: stretch;
        gap: 12px;
    }

    .search-wrapper {
        width: 100%;
        max-width: 100%;
    }

    /* Объединяем кнопку Фильтров и Создать в один ряд */
    .filter-wrapper,
    #filter-btn,
    #open-modal-btn {
        width: 100%;
        flex: 1; 
    }

    .controls-bar > .filter-wrapper {
        display: flex;
        gap: 12px;
    }

    /* Убираем сдвиг выпадающего меню фильтров, делаем его на всю ширину */
    .filter-dropdown {
        left: 0;
        right: 0;
        width: 100%;
        top: 110%; 
    }

    /* --- АДАПТАЦИЯ ТАБЛИЦЫ (Table-to-Cards) --- */
    
    .data-table thead {
        display: none;
    }

    .data-table, .data-table tbody, .data-table tr, .data-table td {
        display: block;
        width: 100%;
    }

    .data-table tr {
        background: var(--surface-main);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        margin-bottom: 16px;
        padding: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .data-table td {
        display: flex;
        justify-content: space-between; 
        align-items: flex-start;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        text-align: right;
        font-size: 14px;
    }

    /* Выравнивание текста ячейки справа */
    .data-table td .td-content {
        align-items: flex-end;
        text-align: right;
    }

    /* ИСПРАВЛЕНО: возвращаем нормальное распределение по краям для последней ячейки */
    .data-table td:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-top: 8px;
        justify-content: space-between; 
    }

    .data-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--text-secondary);
        text-align: left;
        padding-right: 16px;
    }

    .modal-card {
        padding: 24px 16px;
        max-width: 90%;
    }

    .modal-actions {
        flex-direction: column-reverse;
        width: 100%;
    }

    .modal-actions button {
        width: 100%;
    }
}
</file>

<file path="login/index.html">
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход | Строительный калькулятор</title>
    <link rel="icon" href="../pic/view.png" type="image/png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="login-wrapper">
        <div class="login-logo">
            <img src="../pic/logo.png" alt="Строительный калькулятор" class="logo-image">
        </div>
        
        <div class="login-card">
            <h1 class="login-title">Вход</h1>
            <form id="login-form" class="login-form">
                <div class="input-group">
                    <input type="text" id="username" placeholder=" " required autocomplete="username">
                    <label for="username">Логин</label>
                </div>
                <div class="input-group">
                    <input type="password" id="password" placeholder=" " required autocomplete="current-password">
                    <label for="password">Пароль</label>
                    <button type="button" class="toggle-password" id="toggle-password" aria-label="Показать пароль">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                <button type="submit" class="btn-primary">Войти</button>
            </form>

            <div class="register-link-container">
                <span style="color: var(--text-secondary);">Нет аккаунта?</span>
                <a href="#" id="open-register-modal" class="link-action">Зарегистрироваться</a>
            </div>
        </div>
    </main>

    <footer class="app-footer">
        <div class="authors-popover-container">
            <div class="authors-popover" id="authors-popover">
                <h3 class="popover-title">Команда "Opora Team"</h3>
                <ul class="authors-list">
                    <li><span>Project Manager</span> <a href="https://t.me/Samso" target="_blank">@Samso</a></li>
                    <li><span>Backend-разработчик</span> <a href="https://t.me/zZencorZz" target="_blank">@zZencorZz</a></li>
                    <li><span>Frontend-разработчик</span> <a href="https://t.me/Afrobobus" target="_blank">@Afrobobus</a></li>
                    <li><span>DevOps-разработчик</span> <a href="https://t.me/amiuglyyyy" target="_blank">@amiuglyyyy</a></li>
                    <li><span>QA-менеджер</span> <a href="https://t.me/KoT_ITshniK" target="_blank">@KoT_ITshniK</a></li>
                    <li><span>Репозиторий</span> <a href="https://github.com/vuekaeruka/construction-calculator" target="_blank">GitHub</a></li>
                </ul>
            </div>
            <span class="authors-trigger" id="authors-btn">Авторы проекта</span>
        </div>
        <div class="copyright">2026, все права защищены.</div>
    </footer>

    <div class="modal-overlay" id="register-modal">
        <div class="modal-card">
            <div class="modal-header">
                <h2>Регистрация</h2>
                <button class="btn-close" id="close-register-modal-btn" aria-label="Закрыть">×</button>
            </div>
            <form class="modal-form" id="register-form" novalidate>
                <div class="input-group">
                    <input type="text" id="reg-lastname" placeholder=" " required maxlength="255">
                    <label for="reg-lastname">Фамилия</label>
                </div>
                <div class="input-group">
                    <input type="text" id="reg-firstname" placeholder=" " required maxlength="255">
                    <label for="reg-firstname">Имя</label>
                </div>
                <div class="input-group">
                    <input type="text" id="reg-login" placeholder=" " required maxlength="50">
                    <label for="reg-login">Логин</label>
                </div>
                <div class="input-group">
                    <input type="password" id="reg-password" placeholder=" " required maxlength="255">
                    <label for="reg-password">Пароль</label>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" id="cancel-register-modal-btn">Отмена</button>
                    <button type="submit" class="btn-primary">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
</file>

<file path="login/script.js">
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

    // Единый обработчик клика по окну (закрывает поповер авторов)
    window.addEventListener('click', (e) => {
        // Закрытие поповера авторов, если клик был не по нему
        if (authorsPopover.classList.contains('active') && 
            !authorsPopover.contains(e.target) && 
            e.target !== authorsBtn) {
            authorsPopover.classList.remove('active');
        }
    });

});
</file>

<file path="login/style.css">
/* Базовые настройки и переменные (изолированный скоуп Login) */
:root {
    --bg-main: #0A0A0A;
    --surface-main: rgba(26, 26, 26, 0.65);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --accent: #EF4444;
    --accent-hover: #DC2626;
    --border-color: rgba(255, 255, 255, 0.05);
    --border-focus: rgba(239, 68, 68, 0.5);
    --radius-sm: 4px;
    --radius-md: 6px;
    --transition: all 0.3s ease;
    --font-family: 'Inter', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ИСПРАВЛЕНО: Теперь body это flex-колонка, а не просто центровщик */
body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* ИСПРАВЛЕНО: wrapper занимает всё пространство и выталкивает футер вниз */
.login-wrapper {
    width: 100%;
    max-width: 420px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.login-logo {
    margin-bottom: 32px;
}

.login-logo .logo-image {
    height: 48px; 
    width: auto;
    display: block;
}

.login-card {
    background: var(--surface-main);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 48px 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    width: 100%; 
}

.login-title {
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 32px;
    letter-spacing: -0.02em;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* Плавающие лейблы */
.input-group {
    position: relative;
    width: 100%;
}

.input-group input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
    color: var(--text-primary);
    font-size: 16px;
    font-family: var(--font-family);
    transition: var(--transition);
    outline: none;
}

.input-group label {
    position: absolute;
    left: 0;
    top: 12px;
    color: var(--text-secondary);
    font-size: 16px;
    pointer-events: none;
    transition: var(--transition);
}

.input-group input:focus,
.input-group input:not(:placeholder-shown) {
    border-bottom-color: var(--accent);
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
    top: -12px;
    font-size: 12px;
    color: var(--accent);
}

.toggle-password {
    position: absolute;
    right: 0;
    top: 12px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-password:hover {
    color: var(--text-primary);
}

.btn-primary {
    background-color: var(--accent);
    color: #FFFFFF;
    border: none;
    border-radius: var(--radius-sm);
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    font-family: var(--font-family);
    cursor: pointer;
    transition: var(--transition);
    margin-top: 8px;
}

.btn-primary:hover {
    background-color: var(--accent-hover);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
}

/* --- Ссылка на регистрацию --- */
.register-link-container {
    margin-top: 24px;
    text-align: center;
    font-size: 14px;
}

.link-action {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    margin-left: 6px;
}

.link-action:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

/* --- Модальное окно --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-card {
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    width: 100%;
    max-width: 480px;
    padding: 32px;
    transform: scale(0.95);
    transition: var(--transition);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.modal-overlay.active .modal-card {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.modal-header h2 {
    font-size: 24px;
    font-weight: 700;
}

.btn-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
    transition: var(--transition);
}

.btn-close:hover {
    color: var(--text-primary);
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-family);
    cursor: pointer;
    transition: var(--transition);
}

.btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
}

/* --- Футер и Авторы проекта --- */
/* ИСПРАВЛЕНО: Убрали position: fixed */
.app-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    padding: 24px 0;
    margin-top: auto; /* Мягко прижимает к низу */
}

.copyright {
    color: var(--text-secondary);
    font-size: 12px;
}

.authors-popover-container {
    position: relative;
}

.authors-trigger {
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.authors-trigger:hover {
    color: var(--text-primary);
    text-decoration-color: var(--text-primary);
}

/* Окошко со списком (Поповер) */
.authors-popover {
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 340px;
    background: var(--surface-main);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 20;
    max-height: 300px;
    overflow-y: auto; 
}

.authors-popover.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.authors-popover::-webkit-scrollbar {
    width: 6px;
}
.authors-popover::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
}
.authors-popover::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
.authors-popover::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}

.popover-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 12px;
}

.authors-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.authors-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    gap: 16px;
}

.authors-list li span {
    color: var(--text-secondary);
    font-weight: 500;
}

.authors-list li a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    white-space: nowrap;
}

.authors-list li a:hover {
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    color: var(--text-primary);
}


/* ==========================================
   АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
   ========================================== */

@media (max-width: 480px) {
    .login-wrapper {
        padding: 16px;
    }
    
    .login-card {
        padding: 32px 24px;
    }

    .login-title {
        font-size: 24px;
        margin-bottom: 24px;
    }

    /* Модальное окно регистрации */
    .modal-card {
        padding: 24px 16px;
    }

    .modal-header h2 {
        font-size: 20px;
    }

    .modal-actions {
        flex-direction: column-reverse; /* Кнопка "Отмена" внизу */
        width: 100%;
    }

    .modal-actions button {
        width: 100%;
    }

    /* Поповер авторов */
    .authors-popover {
        width: 290px;
        padding: 20px;
    }
    
    .authors-list li {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</file>

<file path="README.md">
# construction-calculator
</file>

</files>
