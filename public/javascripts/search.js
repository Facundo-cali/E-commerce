document.addEventListener("keyup", e=>{
    if (e.target.matches('#buscador')) {
        document.querySelectorAll('.oferta_ind').forEach(prod => {
            if (prod.innerText.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                prod.classList.remove('filtro');
            } else {
                prod.classList.add('filtro');
            }
            
        })
    } 
    
})