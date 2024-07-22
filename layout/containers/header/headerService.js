const customersTab = document.getElementById("CustomersTab")
const businessTab = document.getElementById("BusinessTab")

const contactButton = document.getElementById("Main-header-ContactButton")
const customersButton = document.getElementById("CustomersButton")

export function firstLoad() {
    businessTab.classList.add("active")
    contactButton.classList.add("active")
}

export function openCustomersTab() {
    customersTab.classList.add("active")
    businessTab.classList.remove("active")

    customersButton.classList.add("active")
    contactButton.classList.remove("active")
}

export function openBusinessTab() {
    businessTab.classList.add("active")
    customersTab.classList.remove("active")

    contactButton.classList.add("active")
    customersButton.classList.remove("active")
}

export function showMenu(event) {
    event.stopPropagation()
    document.querySelector('.Mobile-menu').classList.toggle("active")
}

// функция для закрытия меню
export function closeMenu(event) {
    event.stopPropagation()
    document.querySelector('.Mobile-menu').classList.remove('active')
}

export function headerScrolling() {
    if (window.scrollY > 38) document.getElementById('Main-header').style.top = '0';
    else document.getElementById('Main-header').style.top = '38px';
}