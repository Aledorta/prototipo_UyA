// Asegúrate de que este código está al final del body, justo antes de cerrar </body>
document.getElementById("formReserva").addEventListener("submit", reservar);
document.getElementById("formReserva").addEventListener("reset", limpiarResumen);
document.querySelectorAll("#tradicional, #furgoneta, #lujo, #minibus, #bus, #sillaInfantil, #equipajeExtra, #mascota, #pasajeros, #descuento").forEach(function(control){
    control.addEventListener("change", actualizarEstimado);
});

function limpiarResumen(){
    var resumen = document.getElementById("resumen");
    resumen.innerHTML = "";
    resumen.className = "";

    document.querySelectorAll(".error-msg").forEach(function(e){
        e.remove();
    });

    document.querySelectorAll(".is-invalid").forEach(function(e){
        e.classList.remove("is-invalid");
    });
}

function reservar(event) {
    event.preventDefault();

    var resumen = document.getElementById("resumen");
    resumen.innerHTML = "";
    resumen.className = "";

    // Recopilaciones de variables
    var nombre = document.getElementById("nombre");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");
    var origen = document.getElementById("origen");
    var destino = document.getElementById("destino");
    var fecha = document.getElementById("fecha");
    var hora = document.getElementById("hora");
    var pasajeros = document.getElementById("pasajeros");
    
    var sillaInfantil = document.getElementById("sillaInfantil").checked;
    var equipajeExtra = document.getElementById("equipajeExtra").checked;
    var mascota = document.getElementById("mascota").checked;
    
    var descuento = document.getElementById("descuento").value;
    var vehiculo = document.querySelector('input[name="vehiculo"]:checked');

    // Limpia los mensajes de error
    document.querySelectorAll(".error-msg").forEach(function(e){ e.remove(); });
    document.querySelectorAll(".is-invalid").forEach(function(e){ e.classList.remove("is-invalid"); });
    var hayError = false;

    // Comprobacion de todos las variables
    if (nombre.value === "") {
        mostrarError(nombre, "El nombre es obligatorio");
        hayError = true;
    }

    if (email.value === "") {
        mostrarError(email, "El email es obligatorio");
        hayError = true;
    } else if (email.value.indexOf("@") === -1) {
        mostrarError(email, "Debe contener @");
        hayError = true;
    }

    if (telefono.value === "") {
        mostrarError(telefono, "El teléfono es obligatorio");
        hayError = true;
    }

    if (fecha.value === "") {
        mostrarError(fecha, "Introduce fecha del servicio");
        hayError = true;
    }

    if (hora.value === "") {
        mostrarError(hora, "Introduce hora de recogida");
        hayError = true;
    }

    if (pasajeros.value === "" || pasajeros.value <= 0) {
        mostrarError(pasajeros, "Número de pasajeros inválido");
        hayError = true;
    }

    if (!vehiculo) {
        // Adaptado para mostrar el error en la sección de vehículos
        var contenedorVehiculo = document.getElementById("tradicional").parentNode.parentNode;
        var errorV = document.createElement("div");
        errorV.className = "text-danger error-msg mb-2";
        errorV.textContent = "Selecciona un tipo de vehículo";
        contenedorVehiculo.insertBefore(errorV, contenedorVehiculo.children[1]);
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Calcular los precios por vehículo (Adaptado de tu lógica de habitación)
    var precioBase = 0;
    var tipoVehiculo = "";

    if (vehiculo.id === "tradicional") {
        precioBase = 30;
        tipoVehiculo = "Taxi Tradicional";
    }
    if (vehiculo.id === "furgoneta") {
        precioBase = 50;
        tipoVehiculo = "Taxi Furgoneta";
    }
    if (vehiculo.id === "lujo") {
        precioBase = 80;
        tipoVehiculo = "Taxi de Lujo";
    }
    if (vehiculo.id === "minibus") {
        precioBase = 120;
        tipoVehiculo = "Minibus";
    }
    if (vehiculo.id === "bus") {
        precioBase = 200;
        tipoVehiculo = "Bus Grande";
    }

    // Calcular los extras (Adaptado de tu lógica de desayuno/parking)
    var extras = 0;

    if (sillaInfantil) {
        extras += 10;
    }
    if (equipajeExtra) {
        extras += 15;
    }
    if (mascota) {
        extras += 15;
    }

    // Calcular valor total de la reserva
    var total = precioBase + extras;

    // Aplicador de descuento
    if (descuento === "PROMO10") {
        total = total * 0.9;
    }

    // Tabla de resumen de reserva (Exactamente tu misma función de impresión)
    var titulo = document.createElement("h4");
    titulo.textContent = "Resumen de la reserva";

    var p1 = document.createElement("p");
    p1.textContent = "Nombre: " + nombre.value;

    var p2 = document.createElement("p");
    p2.textContent = "Email: " + email.value;

    var p3 = document.createElement("p");
    p3.textContent = "Ruta: " + origen.options[origen.selectedIndex].text + " ➝ " + destino.options[destino.selectedIndex].text;

    var p4 = document.createElement("p");
    p4.textContent = "Vehículo: " + tipoVehiculo;

    var p5 = document.createElement("p");
    p5.textContent = "Pasajeros: " + pasajeros.value;

    var p6 = document.createElement("p");
    p6.id = "totalReserva";
    p6.textContent = "Total: " + total.toFixed(2) + " €";

    resumen.className = "alert alert-success mt-4";
    resumen.appendChild(titulo);
    resumen.appendChild(p1);
    resumen.appendChild(p2);
    resumen.appendChild(p3);
    resumen.appendChild(p4);
    resumen.appendChild(p5);
    resumen.appendChild(p6);
}

// Funcion para imprimir errores debajo de cada elemento
function mostrarError(input, mensaje){
    input.classList.add("is-invalid");

    var error = document.createElement("div");
    error.className = "text-danger error-msg";
    error.textContent = mensaje;

    input.parentNode.appendChild(error);
}

// Funciones para estimar precio adaptadas
function obtenerPrecioVehiculo(vehiculo) {
    if (!vehiculo) return 0;
    if (vehiculo.id === "tradicional") return 30;
    if (vehiculo.id === "furgoneta") return 50;
    if (vehiculo.id === "lujo") return 80;
    if (vehiculo.id === "minibus") return 120;
    if (vehiculo.id === "bus") return 200;
    return 0;
}

function actualizarEstimado() {
    var resumen = document.getElementById("resumen");
    var totalReserva = document.getElementById("totalReserva");
    
    if (!totalReserva) {
        totalReserva = document.createElement("p");
        totalReserva.id = "totalReserva";
        resumen.appendChild(totalReserva);
    }

    var sillaInfantil = document.getElementById("sillaInfantil").checked;
    var equipajeExtra = document.getElementById("equipajeExtra").checked;
    var mascota = document.getElementById("mascota").checked;
    var descuento = document.getElementById("descuento").value;
    var vehiculo = document.querySelector('input[name="vehiculo"]:checked');

    if (!vehiculo) {
        resumen.className = "alert alert-secondary mt-3";
        totalReserva.textContent = "Total: --";
        return;
    }

    var precioBase = obtenerPrecioVehiculo(vehiculo);
    var extras = 0;

    if (sillaInfantil) extras += 10;
    if (equipajeExtra) extras += 15;
    if (mascota) extras += 15;

    var total = precioBase + extras;
    
    if (descuento === "PROMO10") {
        total = total * 0.9;
    }

    resumen.className = "alert alert-info mt-3";
    totalReserva.textContent = "Total: " + total.toFixed(2) + " €";
}
