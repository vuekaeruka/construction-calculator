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