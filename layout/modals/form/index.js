import {openModalForm, closeModalForm, closeSuccessModal, closeFormClickOmModalForm} from "./modals.js"
import {Form} from "./form.js";
import {handleMaskDelete, handleMaskInput, handlePhoneMask} from "./phoneMask.js";

export function modalFormHandler() {

    const modalForm = document.querySelector(".ModalForm")
    const openFormButtons = document.querySelectorAll(".OpenFormButton");
    const closeFormButton = document.getElementById("ModalFormCloseButton");
    const closeSuccessModalButton = document.getElementById("SuccessModal-CloseButton")
    const superButton = document.getElementById("ContactButton-SuccessModal")
    const cookieModal = document.querySelector(".CookiesModal")

    const form = document.querySelector('[name=Form]');
    const f = new Form(form);
    const number = f.number

    // Слушатели событий для маски номера телефона

    number.addEventListener("input", handlePhoneMask, false);
    number.addEventListener("focus", handlePhoneMask, false);
    number.addEventListener("blur", handlePhoneMask, false);
    number.addEventListener("keydown", handlePhoneMask, false);
    number.addEventListener("keydown", handleMaskDelete, false);
    number.addEventListener("input", handleMaskInput, false);

    // Слушатели событий для формы

    openFormButtons.forEach(contactButton => contactButton.addEventListener("click", openModalForm));
    closeFormButton.addEventListener("click", closeModalForm);
    modalForm.addEventListener('click', () => closeFormClickOmModalForm(event))

    // Слушатели событий для окна с текстом об успешном выполнении

    closeSuccessModalButton.addEventListener('click', closeSuccessModal);
    superButton.addEventListener('click', closeSuccessModal);

    // Слушатели событий для окна с cookie

    setTimeout(() => cookieModal.classList.add("active"), 3000)
    document.getElementById("CookiesModal-ContactButton").addEventListener("click", () => cookieModal.classList.remove("active"))
    document.getElementById("CookiesModal-closeButton").addEventListener("click", () => {cookieModal.classList.remove("active")})
    document.querySelector(".SecondaryContactButton").addEventListener("click", () => cookieModal.classList.remove("active"))

}