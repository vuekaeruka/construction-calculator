document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId') || '1';
    const calcId = urlParams.get('calcId') || '101';
    
    // --- Настройка кнопки назад ---
    document.getElementById('back-btn').href = `../client-card/index.html?id=${clientId}`;
    document.getElementById('calc-id-display').textContent = `№${calcId}`;

    // --- Моковые Данные ---
    // Добавлен email для симуляции отправки
    const clientsDb = {
        '1': { fullName: 'Иванов Петр Сергеевич', phone: '+7 (999) 123-45-67', email: 'ivanov@stroy.ru', address: 'г. Ульяновск, ул. Тестовая, д. 35' }
    };

    if (clientsDb[clientId]) {
        document.getElementById('client-name').textContent = clientsDb[clientId].fullName;
        document.getElementById('client-phone').textContent = clientsDb[clientId].phone;
        document.getElementById('calc-address').textContent = clientsDb[clientId].address;
    }

    const calculationData = [
        {
            type: 'frame',
            title: 'Результат расчета каркаса',
            editUrl: `../calc-frame/index.html?clientId=${clientId}&calcId=${calcId}`,
            items: [
                { category: 'Внешние стены', name: 'Доска 50*150*6000', unit: 'м3', qty: 2.4, price: 16500 },
                { category: 'Внешние стены', name: 'Утеплитель мин. вата', unit: 'м3', qty: 18.5, price: 2100 },
                { category: 'Внешние стены', name: 'ОСБ 12 мм', unit: 'шт', qty: 45, price: 850 },
                { category: 'Внешние стены', name: 'Ветрозащита мембрана', unit: 'рулон', qty: 2, price: 2500 },
                { category: 'Внутренние стены', name: 'Доска 50*100*6000', unit: 'м3', qty: 1.2, price: 16500 },
                { category: 'Перекрытия', name: 'Доска 50*200*6000', unit: 'м3', qty: 3.1, price: 17000 }
            ]
        },
        {
            type: 'foundation',
            title: 'Результат расчета фундамента',
            editUrl: `../calc-foundation/index.html?clientId=${clientId}&calcId=${calcId}`,
            items: [
                { category: 'Бетонные работы', name: 'Бетон М250 (B20)', unit: 'м3', qty: 12.5, price: 4200 },
                { category: 'Бетонные работы', name: 'Песок карьерный', unit: 'т', qty: 8, price: 600 },
                { category: 'Арматура', name: 'Арматура 12 мм (продольная)', unit: 'мп', qty: 320, price: 45 },
                { category: 'Арматура', name: 'Арматура 8 мм (поперечная)', unit: 'мп', qty: 150, price: 28 }
            ]
        }
    ];

    // --- Рендеринг Таблиц ---
    const container = document.getElementById('calculations-container');
    const grandTotalEl = document.getElementById('grand-total-sum');
    let grandTotal = 0;

    const formatMoney = (num) => {
        return num.toLocaleString('ru-RU') + ' ₽';
    };

    const renderCalculations = () => {
        container.innerHTML = '';
        grandTotal = 0;

        calculationData.forEach((calcBlock) => {
            const accItem = document.createElement('div');
            accItem.className = 'accordion-item active';

            const groupedItems = {};
            let blockTotal = 0;
            
            calcBlock.items.forEach(item => {
                if (!groupedItems[item.category]) groupedItems[item.category] = [];
                const sum = item.qty * item.price;
                blockTotal += sum;
                groupedItems[item.category].push({ ...item, sum });
            });

            grandTotal += blockTotal;

            let tableRowsHTML = '';
            for (const [category, items] of Object.entries(groupedItems)) {
                tableRowsHTML += `<tr class="category-row"><td colspan="5">${category}</td></tr>`;
                items.forEach(item => {
                    tableRowsHTML += `
                        <tr>
                            <td>${item.name}</td>
                            <td class="text-center">${item.unit}</td>
                            <td class="text-right">${item.qty}</td>
                            <td class="text-right">${formatMoney(item.price)}</td>
                            <td class="text-right font-medium">${formatMoney(item.sum)}</td>
                        </tr>
                    `;
                });
            }

            accItem.innerHTML = `
                <div class="accordion-header">
                    <div class="acc-title-group">
                        <svg class="acc-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        <h3>${calcBlock.title}</h3>
                    </div>
                    <div class="acc-actions">
                        <span class="block-total">${formatMoney(blockTotal)}</span>
                        <button class="btn-secondary btn-sm edit-btn" onclick="event.stopPropagation(); window.location.href='${calcBlock.editUrl}'">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Изменить
                        </button>
                    </div>
                </div>
                <div class="accordion-body">
                    <div class="table-responsive">
                        <table class="data-table calc-table">
                            <thead>
                                <tr>
                                    <th>Материал</th>
                                    <th class="text-center">Ед. изм.</th>
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

        grandTotalEl.textContent = formatMoney(grandTotal);
    };

    renderCalculations();

    // --- Логика отправки на почту ---
    const sendEmailBtn = document.getElementById('send-email-btn');
    sendEmailBtn.addEventListener('click', () => {
        // Берем email из моковой БД или используем заглушку
        const emailAddress = clientsDb[clientId] ? clientsDb[clientId].email : 'почту клиента';
        
        // Визуальная анимация кнопки
        const originalHTML = sendEmailBtn.innerHTML;
        sendEmailBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Отправлено
        `;
        sendEmailBtn.style.color = '#10B981';
        sendEmailBtn.style.borderColor = '#10B981';
        sendEmailBtn.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        
        alert(`Подробная смета успешно отправлена на адрес: ${emailAddress}`);
        
        // Возврат кнопки в исходное состояние через 3 секунды
        setTimeout(() => {
            sendEmailBtn.innerHTML = originalHTML;
            sendEmailBtn.style.color = '';
            sendEmailBtn.style.borderColor = '';
            sendEmailBtn.style.backgroundColor = '';
        }, 3000);
    });

    // --- Логика изменения статуса ---
    const statusBadge = document.getElementById('calc-status');
    const changeStatusBtn = document.getElementById('change-status-btn');
    let isContracted = false;

    changeStatusBtn.addEventListener('click', () => {
        if (!isContracted) {
            statusBadge.textContent = 'Заключен договор';
            statusBadge.className = 'status-badge contract';
            changeStatusBtn.textContent = 'Вернуть в Актуален';
            changeStatusBtn.classList.replace('btn-secondary', 'btn-outline-danger');
            isContracted = true;
        } else {
            statusBadge.textContent = 'Актуален';
            statusBadge.className = 'status-badge active';
            changeStatusBtn.textContent = 'Заключить договор';
            changeStatusBtn.classList.replace('btn-outline-danger', 'btn-secondary');
            isContracted = false;
        }
    });

    // --- Логика Модального окна "Добавить элемент" ---
    const addElementBtn = document.getElementById('add-element-btn');
    const selectCalcModal = document.getElementById('select-calc-modal');
    const closeCalcModalBtn = document.getElementById('close-calc-modal-btn');
    const calcOptionBtns = document.querySelectorAll('.calc-option-btn');

    addElementBtn.addEventListener('click', () => selectCalcModal.classList.add('active'));
    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (type === 'frame') window.location.href = `../calc-frame/index.html?clientId=${clientId}&mode=add`;
            else if (type === 'foundation') window.location.href = `../calc-foundation/index.html?clientId=${clientId}&mode=add`;
            else if (type === 'roof') window.location.href = `../calc-roof/index.html?clientId=${clientId}&mode=add`;
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
    });
});