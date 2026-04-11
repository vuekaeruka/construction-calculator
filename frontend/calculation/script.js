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
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const exportMenuBtn = document.getElementById('export-menu-btn');
    const exportDropdown = document.getElementById('export-dropdown');
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
                    const validPositions = sub.positions.filter(pos => pos.quantity > 0);

                    if(validPositions.length > 0) {
                        tableRowsHTML += `<tr class="category-row"><td colspan="5">${sub.sub_element_name}</td></tr>`;
                        validPositions.forEach(pos => {
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

    // --- 8.5. ЛОГИКА МЕНЮ ЭКСПОРТА ---
    if (exportMenuBtn && exportDropdown) {
        exportMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            exportDropdown.classList.toggle('active');
        });
    }

    // --- 8.6. ЭКСПОРТ В PDF ---
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            if (!currentCalcData) return;

            exportDropdown.classList.remove('active'); // Сразу закрываем меню
            const originalHTML = exportMenuBtn.innerHTML; // Меняем текст на главной кнопке
            exportMenuBtn.innerHTML = 'Генерация...';
            exportMenuBtn.disabled = true;

            const elementToExport = document.getElementById('pdf-export-area');

            const accordions = elementToExport.querySelectorAll('.accordion-item');
            const wasClosed = [];
            accordions.forEach((acc, index) => {
                if (!acc.classList.contains('active')) {
                    wasClosed.push(index);
                    acc.classList.add('active');
                }
            });

            if (addElementBtn) addElementBtn.style.display = 'none';

            const opt = {
                margin:       10,
                filename:     `Smeta_${calcId}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#0A0A0A' }, 
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(elementToExport).save().then(() => {
                exportMenuBtn.innerHTML = originalHTML;
                exportMenuBtn.disabled = false;

                if (addElementBtn && currentCalcData.status !== 'Заключен договор') {
                    addElementBtn.style.display = 'inline-flex';
                }
                
                wasClosed.forEach(index => {
                    accordions[index].classList.remove('active');
                });
            }).catch(err => {
                console.error('Ошибка генерации PDF:', err);
                alert('Произошла ошибка при создании PDF-файла.');
                exportMenuBtn.innerHTML = originalHTML;
                exportMenuBtn.disabled = false;
            });
        });
    }

    // --- 8.7. ЭКСПОРТ В EXCEL (CSV) ---
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', () => {
            if (!currentCalcData || !currentCalcData.elements) return;

            exportDropdown.classList.remove('active'); // Сразу закрываем меню

            // Добавляем BOM (Byte Order Mark), чтобы Excel правильно распознал UTF-8 (русские символы)
            let csvContent = "\uFEFF"; 
            
            // Заголовки столбцов
            csvContent += "Конструкция;Категория;Материал;Ед. изм.;Количество;Цена за ед.;Стоимость\n";

            currentCalcData.elements.forEach(element => {
                const constrName = `"${element.element_name.replace(/"/g, '""')}"`;

                element.subelements.forEach(sub => {
                    const validPositions = sub.positions.filter(pos => pos.quantity > 0);
                    
                    if (validPositions.length > 0) {
                        const categoryName = `"${sub.sub_element_name.replace(/"/g, '""')}"`;
                        
                        validPositions.forEach(pos => {
                            const materialName = `"${pos.material.name.replace(/"/g, '""')}"`;
                            const unit = `"${pos.material.unit}"`;
                            const quantity = pos.quantity;
                            const pricePerUnit = pos.material.market_price;
                            const totalCost = pos.price;

                            // Формируем строку и добавляем в общий контент (используем точку с запятой для русского Excel)
                            csvContent += `${constrName};${categoryName};${materialName};${unit};${quantity};${pricePerUnit};${totalCost}\n`;
                        });
                    }
                });
            });

            // Итоговая стоимость
            csvContent += `\n;;;;;ИТОГО:;${currentCalcData.price}\n`;

            // Создаем Blob и скачиваем файл
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `Smeta_${calcId}.csv`);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

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

        // Закрытие меню экспорта при клике вне него
        if (exportDropdown && exportDropdown.classList.contains('active') && 
            !exportDropdown.contains(e.target) && 
            e.target !== exportMenuBtn) {
            exportDropdown.classList.remove('active');
        }
    });
});