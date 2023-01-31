//Este script es para dar aviso al usuario cuando la cantidad enviada al carrito es 0 y no enviar esto al carrito;
const form = document.querySelector('#cant');
const cant = document.querySelector('#cantidad');

let errores = 0;

form.addEventListener('submit', function(event) {
    checkInputs()
    if (errores > 0) { //chekeamos que no haya errores
        event.preventDefault(); 
    }
})

function checkInputs() {
    const cantValue = cant.value;
    console.log(cantValue);

    if (cantValue < 1){
        let formControl = cant.parentElement;
        let small = formControl.querySelector('small');

        small.innerText = 'El campo no puede ser 0';
        errores = 1;    
    }else{
        let formControl = cant.parentElement;
        let small = formControl.querySelector('small')

        small.innerText = ''
        errores = 0;
    }
}