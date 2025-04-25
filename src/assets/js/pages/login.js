import { Api } from "../../../api/api.js";
const api = Api().init();

document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.querySelector('.login-form');
    const loginButton = loginForm.querySelector('.login-button');
    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');
    const errorMessage = loginForm.querySelector('.error-message');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginButton.setAttribute('disabled', 'disabled');
        loginButton.innerHTML = `<span><i class="fa-solid fa-spinner spinner"></i></span>`;

        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            loginButton.removeAttribute('disabled');
            loginButton.innerHTML = 'Đăng nhập';
            errorMessage.textContent = 'Vui lòng nhập email và mật khẩu.';
            return;
        }
        
        try{
            const users = await api.get('/users2', {
                custom: (user)=>(user.email === email && user.password === password)
            });
            if (users.length > 0){
                const user = users[0];
                localStorage.setItem('access_token', user.access_token);
                return window.location.href = '/index.html';
            }
            return errorMessage.textContent = 'Email hoặc mật khẩu không chính xác.';
        }catch(error){
            console.error('Login failed:', error);
        }finally{
            loginButton.removeAttribute('disabled');
            loginButton.innerHTML = 'Đăng nhập';
        }
    });
});
