const MODALCLASS = 'js-modal';
const MODALTRIGGERCLASS = 'js-modal-trigger';
const ACTIVECLASS = 'show';

const Modal = function ({
    modalTriggerClass = MODALTRIGGERCLASS,
    modalClass = MODALCLASS,
    activeClass = ACTIVECLASS
}) {
    const modal = document.querySelector(`.${modalClass}`);
    const modalTrigger = document.querySelector(`.${modalTriggerClass}`);
    if (!modal || !modalTrigger) return;
    const modalCloseBtns = modal.querySelectorAll('.modal-close');
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove(activeClass);
            document.body.classList.remove('overflow-hidden');
        })
    })
    function init() {
        modalTrigger.onclick = e => {
            document.body.classList.add('overflow-hidden');
            modal.classList.toggle(activeClass)
        };

    }
    return { init }
}

export default Modal;