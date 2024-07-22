let keyCode;

// Заполнение маски номера телфона
export function handlePhoneMask(event) {

    event.keyCode && (keyCode = event.keyCode);

    let position = this.selectionStart;

    if (position < 3 && event.keyCode !== 8 && event.keyCode !== 46) event.preventDefault();

    let matrix = "+7 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length ? val.charAt(i++) : a;
        });

    i = new_value.indexOf("_");
    if (i !== -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
    }

    let reg = matrix.substr(0, this.value.length).replace(/_+/g, function(a) {
        return "\\d{1," + a.length + "}";
    }).replace(/[+()]/g, "\\$&");

    reg = new RegExp("^" + reg + "$");

    if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) this.value = new_value;

    if (event.type === "blur" && this.value.length < 5) this.value = "";
    if (event.type === "blur" && this.value.length < 18) {
        document.getElementById("FieldNumber").classList.add("rejected")
        document.getElementById("Main-form-warning").classList.add("rejected")
    } else {
        document.getElementById("FieldNumber").classList.remove("rejected")
        document.getElementById("Main-form-warning").classList.remove("rejected")
    }

}

// Очистка поля с номером телефона
export function handleMaskDelete() {
    if (this.selectionStart === 0 && this.selectionEnd === this.value.length) this.value = "";
}

// Начало маски номера телефона
export function handleMaskInput() {
    if (this.value === "") this.value = "+7 ";
}