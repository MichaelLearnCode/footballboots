import Dropdown from "./component/Dropdown.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// navbar
const menuToggle = $('.menu-toggle');
const navMenu = $('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('collasped');
});

Dropdown({dropdownClass: 'js-dropdown-nav-item'}).init();