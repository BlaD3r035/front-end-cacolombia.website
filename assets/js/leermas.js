function toggleTexto(boton) {
    var texto = boton.previousElementSibling; 
    var textoCompleto = texto.dataset.completo; 

    if (!textoCompleto) {
        console.error("El atributo data-completo no se encontró en el elemento <p>");
        return; 
    }

    if (boton.innerHTML === "Leer más") {
        texto.innerHTML = textoCompleto; 
        boton.innerHTML = "Leer menos";
    } else {
        texto.innerHTML = textoCompleto.substring(0, 50) + "..."; 
        boton.innerHTML = "Leer más";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    var textos = document.querySelectorAll('.empresa'); 
    textos.forEach(function(texto) {
        var textoCompleto = texto.dataset.completo; 
        if (textoCompleto) {
            texto.innerHTML = textoCompleto.substring(0, 50) + "...";
        }
    });
});
