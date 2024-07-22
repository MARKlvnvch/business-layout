import {showMenu, closeMenu, headerScrolling, firstLoad, openCustomersTab, openBusinessTab} from "./headerService.js";

export function headerHandler() {

    // Первоначальное состояние
    firstLoad()

    // Открыть Customers вкладку
    document.getElementById("CustomersTab").addEventListener("click", openCustomersTab);

    // Открыть Business вкладку
    document.getElementById("BusinessTab").addEventListener("click",openBusinessTab)

    // Открыть мобильное меню
    document.querySelector('.Menu-button').addEventListener('click', showMenu)

    //Закрыть мобильное меню
    document.getElementById('CloseMobileMenu-button').addEventListener('click', closeMenu)

    // Зафиксировать header
    window.addEventListener('scroll', headerScrolling)

}