// Открыть модально окно
export function openModalForm() {
    document.querySelector(".ModalForm").classList.add("active")
}

// Закрыть модальное окно
export function closeModalForm() {
    document.querySelector(".ModalForm").classList.remove("active")
}

// Закрыть форму при нажатии вне области
export function closeFormClickOmModalForm(event) {
    if (event.target === document.querySelector(".ModalForm")) {
        document.querySelector(".ModalForm").classList.remove("active")
    }
}

// Закрыть модальные окна с сообщением об успешном заполнении
export function closeSuccessModal() {
    document.querySelector(".ModalForm").classList.remove("active")
    document.querySelector(".SuccessModal").classList.remove("active")
}