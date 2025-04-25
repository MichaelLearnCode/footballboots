import { Api } from "../../../api/api.js";
const api = Api().init();

document.addEventListener('DOMContentLoaded',async function () {
    const drawer = document.querySelector('.drawer');
    const drawerContent = document.querySelector('.drawer-content');
    const drawerCloseButton = drawer.querySelector('.drawer-close');
    const drawerToggleButton = document.querySelector('.drawer-toggle');

    drawerCloseButton.addEventListener('click', function () {
        drawer.classList.remove('show');
    });

    drawerToggleButton.addEventListener('click', function () {
        drawer.classList.add('show');
    });

    document.addEventListener('click', function (event) {
        if (!drawerContent.contains(event.target) && !drawerToggleButton.contains(event.target)) {
            drawer.classList.remove('show');
        }
    });
    const users = await api.get('/users2', {
        custom: (user) => user.access_token === localStorage.getItem('access_token')
    });
    const user = users[0];
    const profileEmail = document.querySelector('.profile-email');
    const profileName = document.querySelector('.profile-name');
    const profileAvatar = document.querySelector('.profile-avatar');
    profileAvatar.innerHTML = `
        <img class="rounded-circle" width="40%" style = 'aspect-ratio: 1/1' src="${user.avatar}" alt="" />`
    profileName.innerHTML = user.name;
    profileName.classList.remove('skeleton-text', 'skeleton');
    profileEmail.innerHTML = user.email;
    profileEmail.classList.remove('skeleton-text', 'skeleton');
    const logoutButtons = document.querySelectorAll('.logout-button');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function () {
            localStorage.removeItem('access_token');
            window.location.href = '/login.html';
        });
    });
});