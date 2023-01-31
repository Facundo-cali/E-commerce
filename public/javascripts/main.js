const form = document.querySelector('form');
const username = document.querySelector('#username');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

let errores = {};//creamos un objeto con los errores, lo llenamos cuando salte algun error y cuando ya no esta el error lo borramos, cuando el array tengo algo dentro hacemos el event.preventDefault() y sino enviamos el formulario

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


form.addEventListener('submit', function(event) {
    checkInputs()
    if (Object.keys(errores).length > 0) { //chekeamos que no haya errores
        event.preventDefault(); 
    }
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const surnameValue = surname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    if (usernameValue === ''){
        setError(username, 'El campo no puede estar vacio');        
    }else{
        setSucces(username)
    }

    if (surnameValue === ''){
        setError(surname, 'El campo no puede estar vacio');        
    }else{
        setSucces(surname)
    }

    if (!isEmail(emailValue)){
        setError(email, 'El email ingresado no es valido')
    } else {
        setSucces(email)
    }

    if (passwordValue === ''){
        setError(password, 'El campo no puede estar vacio');        
    }else if (passwordValue.length < 5){
        setError(password, 'La contraseña debe tener al menos 5 caracteres');        
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