document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const currentClient = {
        id: 1,
        lastName: 'Тестовый',
        firstName: 'Тест',
        middleName: 'Тестович',
        phone: '+7 (900) 000-00-00',
        email: 'test@example.com',
        address: 'г. Ульяновск, ул. Тестовая, д. 35-45',
        organization: 'ООО "СтройИнвест"'
    };

    let clientCalculations = [
        { id: 2, name: 'Расчет №2', type: 'Каркас', date: '02.02.2021', status: 'active', address: 'г. Ульяновск, ул. Тестовая, д. 35-45' },
        { id: 3, name: 'Расчет №3', type: 'Фундамент', date: '03.02.2021', status: 'inactive', address: 'г. Ульяновск, ул. Тестовая, д. 35-45' },
        { id: 4, name: 'Расчет №4', type: 'Крыша', date: '02.02.2021', status: 'contract', address: 'г. Ульяновск, ул. Тестовая, д. 35-45' }
    ];

    // --- DOM Элементы ---
    // Блок инфо клиента
    const displayName = document.getElementById('display-name');
    const displayAddress = document.getElementById('display-address');
    const displayPhone = document.getElementById('display-phone');
    const displayEmail = document.getElementById('display-email');
    const displayOrg = document.getElementById('display-org');
    const orgContainer = document.getElementById('org-container');
    const editClientBtn = document.getElementById('edit-client-btn');
    
    // Модалка редактирования клиента
    const editClientModal = document.getElementById('edit-client-modal');
    const editClientForm = document.getElementById('edit-client-form');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    
    // Поля формы редактирования
    const inputLastName = document.getElementById('edit-lastname');
    const inputFirstName = document.getElementById('edit-firstname');
    const inputMiddleName = document.getElementById('edit-middlename');
    const inputOrg = document.getElementById('edit-org');
    const inputPhone = document.getElementById('edit-phone');
    const inputEmail = document.getElementById('edit-email');
    const inputAddress = document.getElementById('edit-address');

    // Таблица и Расчеты
    const tableBody = document.getElementById('calculations-table-body');
    const openCalcModalBtn = document.getElementById('open-calc-modal-btn');
    const selectCalcModal = document.getElementById('select-calc-modal');
    const closeCalcModalBtn = document.getElementById('close-calc-modal-btn');
    const calcOptionBtns = document.querySelectorAll('.calc-option-btn');

    // --- Функции рендеринга ---
    
    const renderClientInfo = () => {
        displayName.textContent = `${currentClient.lastName} ${currentClient.firstName} ${currentClient.middleName || ''}`.trim();
        displayAddress.textContent = currentClient.address || 'Не указан';
        displayPhone.textContent = currentClient.phone || 'Не указан';
        displayEmail.textContent = currentClient.email || 'Не указан';
        
        if (currentClient.organization) {
            displayOrg.textContent = currentClient.organization;
            orgContainer.style.display = 'flex';
        } else {
            orgContainer.style.display = 'none';
        }
    };

    const renderTable = () => {
        tableBody.innerHTML = '';
        
        if (clientCalculations.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 32px;">Нет сохраненных расчетов</td></tr>`;
            return;
        }

        clientCalculations.forEach(calc => {
            const tr = document.createElement('tr');
            
            let statusBadge = '';
            if (calc.status === 'active') statusBadge = '<span class="badge active">Актуален</span>';
            else if (calc.status === 'inactive') statusBadge = '<span class="badge inactive">Не актуален</span>';
            else if (calc.status === 'contract') statusBadge = '<span class="badge contract">Заключен договор</span>';

            tr.innerHTML = `
                <td onclick="window.location.href='../calculation/index.html?id=${calc.id}'">
                    <strong>${calc.name}</strong><br>
                    <span style="font-size: 12px; color: var(--text-secondary)">${calc.type}</span>
                </td>
                <td onclick="window.location.href='../calculation/index.html?id=${calc.id}'">${calc.date}</td>
                <td onclick="window.location.href='../calculation/index.html?id=${calc.id}'">${statusBadge}</td>
                <td onclick="window.location.href='../calculation/index.html?id=${calc.id}'">${calc.address}</td>
                <td class="text-right">
                    <div class="action-icons">
                        <button class="icon-btn copy" title="Копировать расчет" data-id="${calc.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                        <button class="icon-btn delete" title="Удалить расчет" data-id="${calc.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        document.querySelectorAll('.icon-btn.copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                alert(`Копирование расчета ID: ${btn.dataset.id}`);
            });
        });

        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if(confirm('Вы уверены, что хотите удалить этот расчет?')) {
                    clientCalculations = clientCalculations.filter(c => c.id != btn.dataset.id);
                    renderTable();
                }
            });
        });
    };

    // --- Логика копирования ---
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
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    });

    // --- Логика Модальных Окон ---

    // Модалка Редактирования Клиента
    editClientBtn.addEventListener('click', () => {
        inputLastName.value = currentClient.lastName;
        inputFirstName.value = currentClient.firstName;
        inputMiddleName.value = currentClient.middleName || '';
        inputOrg.value = currentClient.organization || '';
        inputPhone.value = currentClient.phone || '';
        inputEmail.value = currentClient.email || '';
        inputAddress.value = currentClient.address || '';
        
        editClientModal.classList.add('active');
    });

    closeEditModalBtn.addEventListener('click', () => editClientModal.classList.remove('active'));
    
    editClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentClient.lastName = inputLastName.value;
        currentClient.firstName = inputFirstName.value;
        currentClient.middleName = inputMiddleName.value;
        currentClient.organization = inputOrg.value;
        currentClient.phone = inputPhone.value;
        currentClient.email = inputEmail.value;
        currentClient.address = inputAddress.value;
        
        renderClientInfo();
        editClientModal.classList.remove('active');
    });

    // Модалка Выбора Типа Расчета
    openCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.add('active'));
    closeCalcModalBtn.addEventListener('click', () => selectCalcModal.classList.remove('active'));

    calcOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            alert(`Переход к форме расчета: ${type}`);
            selectCalcModal.classList.remove('active');
        });
    });

    // Закрытие модалок по клику вне окна
    window.addEventListener('click', (e) => {
        if (e.target === editClientModal) editClientModal.classList.remove('active');
        if (e.target === selectCalcModal) selectCalcModal.classList.remove('active');
    });

    // Первичный рендер
    renderClientInfo();
    renderTable();
});