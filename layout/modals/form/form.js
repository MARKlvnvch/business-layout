export class Form {

    static patternName = /^[A-Za-z]*$/;
    static patternEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
    static patternNumber = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/

    static errorMess = [
        'This field is required.', // 0
        'Error', // 1
        'Invalid email.', // 2
        'Invalid phone number.', // 3
    ];

    constructor(form) {

        this.form = form;
        this.fields = this.form.querySelectorAll('.Form-control');
        this.button = this.form.querySelector('[type=submit]');
        this.isError = false;
        this.isCorrect = false;
        this.number = this.form.querySelector(`[name="number"]`);

        this.eventsHandler();

    }

    static getElement(input) {
        return input.parentElement.nextElementSibling;
    }

    eventsHandler() {

        this.button.addEventListener('click', this.validForm.bind(this));

        this.form.addEventListener('focus', () => {
            const element = document.activeElement;
            if (element === this.button) return;
            this.cleanError(element);
        }, true);

        for (let field of this.fields) {
            field.addEventListener('blur', this.validBlurField.bind(this));
        }

        this.button.addEventListener('click', this.showSuccessModal.bind(this))

    }

    cleanError(el) {
        const span = Form.getElement(el);
        span.classList.remove("active");
        document.querySelector(".requireFlag").forEach(flag => flag.classList.remove("active"))
        this.fields.forEach(field => field.classList.remove("rejected"));
        this.isError = false;
    }

    validBlurField(e) {

        const target = e.target;
        const property = target.getAttribute('name');
        const value = target.value;

        const formData = new FormData();
        formData.append(property, value);

        const error = this.getErrorMessage(formData, property);

        if (
            this.getErrorMessage(new FormData(this.form), "username") === '' &&
            this.getErrorMessage(new FormData(this.form), "email") === '' &&
            this.getErrorMessage(new FormData(this.form), "number") === ''
        ) {
            this.isCorrect = true
            this.button.disabled = false
        }

        if (error.length === 0) {
            target.classList.remove('rejected')
            return;
        }
        this.showErrorMessage(property, error);

    }

    validForm(e) {

        e.preventDefault();

        const formData = new FormData(this.form);
        let error;

        for (let property of formData.keys()) {

            error = this.getErrorMessage(formData, property);

            if (error.length === 0) continue;

            this.isError = true
            this.button.disabled = true
            this.isCorrect = false
            this.showErrorMessage(property, error);

        }


        if (this.isError) return;

    }

    getErrorMessage(formData, property) {

        let error = '';

        const validate = {
            username: () => {
                if (formData.get('username').length === 0) {
                    error = Form.errorMess[0];
                } else if (Form.patternName.test(formData.get('username')) === false) {
                    error = Form.errorMess[1];
                }
            },
            email: () => {
                if (formData.get('email').length === 0) {
                    error = Form.errorMess[0];
                } else if (Form.patternEmail.test(formData.get('email')) === false) {
                    error = Form.errorMess[2];
                }
            },
            number: () => {
                if (formData.get('number').length === 0) {
                    error = Form.errorMess[0]
                } else if (Form.patternNumber.test(formData.get('number')) === false) {
                    error = Form.errorMess[3]
                }
            }
        }

        validate[property]();

        return error;

    }

    showErrorMessage(property, error) {
        const input = this.form.querySelector(`[name=${property}]`);
        const span = Form.getElement(input);
        span.innerHTML = error;
        span.classList.add("active");
        input.classList.add('rejected')
        document.querySelectorAll(".requireFlag").forEach(flag => flag.classList.add("active"))
    }

    showSuccessModal() {
        if (this.isCorrect) {
            document.querySelector(".SuccessModal").classList.add("active")
            document.querySelector(".ModalForm").classList.remove("active")
            document.querySelectorAll(".requireFlag").forEach(flag => flag.classList.remove("active"))
            this.form.reset()
        }
    }

}