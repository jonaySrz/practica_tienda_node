
function filtrar(){

    if (filtro.value == 'todos') {

        window.location = "/"
    } 
    else {
        pag_form.value = pagina.innerText

        form.submit();
    }
}

window.addEventListener('load', ()=>{
    let page = parseInt(pagina.innerText)
    let pages = parseInt(paginas.innerText)

    if (page == 1){
        anterior.setAttribute('disabled', 'true')
        siguiente.removeAttribute('disabled')
    }

    if (page > 1){
        anterior.removeAttribute('disabled')
        siguiente.removeAttribute('disabled')
    }

    if (page == pages){
        anterior.removeAttribute('disabled')
        siguiente.setAttribute('disabled', 'true')
    }

    if (page == pages && page == 1){
        anterior.setAttribute('disabled', 'true')
        siguiente.setAttribute('disabled', 'true')
    }
})

function siguientePagina (){  
    pagina.innerText = parseInt(pagina.innerText) + 1

    pag_form.value = pagina.innerText

        form.submit();
}

function anteriorPagina (){
    pagina.innerText = parseInt(pagina.innerText) - 1

    pag_form.value = pagina.innerText

        form.submit();
}

function nuevo(){
    window.location = "/show"
}

function editar(id){
    window.location = `/show/${id}`
}

