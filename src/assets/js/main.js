import Dropdown from "./component/Dropdown.js";
import { Api } from "../../api/api.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const api = Api().init();

// navbar
const menuToggle = $('.menu-toggle');
const navMenu = $('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('collasped');
});

Dropdown({ dropdownClass: 'js-dropdown-nav-item' }).init();

// user
const access_token = localStorage.getItem('access_token');
document.addEventListener('DOMContentLoaded', async () => {
    const userWrapper = $('.user-wrapper');
    const userWrapperMobile = $('.user-wrapper-mobile');
    if (access_token && userWrapper && userWrapperMobile) {
        const users = await api.get('/users2', {
            custom: (user) => user.access_token === access_token
        });
        const user = users[0];
        userWrapper.innerHTML = `
            <a href="user.html" class="ms-auto text-decoration-none">
                <div class="d-flex items-center px-4">
                    <img class="rounded-circle" width="25px" height="25px" src="${user.avatar}" alt="" />
                    <h3 class="text-black ms-2">${user.name}</h3>
                </div>
            </a>
        `;
        userWrapperMobile.innerHTML = `
            <a href="user.html" class="d-md-none d-flex flex-center text-decoration-none me-3">
                <div class="d-flex items-center">
                    <img class="ms-auto rounded-circle" width="35px" height="35px"
                    src="${user.avatar}" alt="" />
                </div>
            </a>
        `;
    }
});