document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    
    // Переключение видимости пароля
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Меняем прозрачность иконки для визуального фидбека
        togglePasswordBtn.style.opacity = type === 'text' ? '1' : '0.6';
    });
    
    // Обработка отправки формы (редирект)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // В реальном приложении здесь был бы AJAX-запрос на авторизацию
        // Редирект на дашборд клиентов
        window.location.href = '../clients/index.html';
    });
});