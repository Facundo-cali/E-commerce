const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

let errores = {};

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.addEventListener('submit', function(event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) { //chekeamos que no haya errores
        event.preventDefault(); 
    }
})

function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!isEmail(emailValue)){
        setError(email, 'El email ingresado no es valido')
    } else {
        setSucces(email)
    }

    if (passwordValue === ''){
        setError(password, 'El campo no puede estar vacio');        
    }else{
        setSucces(password)
    }
}

function setError(input ,message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'form__completar error'
    errores[input.name] = message;
}

function setSucces(input) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small')

    small.innerText = ''
    formControl.className = 'form__completar succes'

    delete errores[input.name]
}