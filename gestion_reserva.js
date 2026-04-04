document.addEventListener("DOMContentLoaded", function () {
    const formGestion = document.getElementById("formGestion");
    const resultadoReserva = document.getElementById("resultadoReserva");

    // Evento al enviar el formulario (Click en Consultar reserva)
    formGestion.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue
        
        // Simplemente mostramos la tarjeta de la reserva
        resultadoReserva.classList.remove("d-none");
    });

    // Evento al limpiar el formulario (Click en Limpiar)
    formGestion.addEventListener("reset", function () {
        // Volvemos a ocultar el cuadro de la reserva
        resultadoReserva.classList.add("d-none");
    });
});
