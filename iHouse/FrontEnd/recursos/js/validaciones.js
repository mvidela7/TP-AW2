const formulario = document.getElementById("formulario-contacto");

if (formulario) {

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();

        const email = document.getElementById("email").value.trim();

        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "") {
            alert("Por favor, ingresá tu nombre.");
            return;
        }

        if (email === "") {
            alert("Por favor, ingresá tu email.");
            return;
        }

        if (!email.includes("@")) {
            alert("Por favor, ingresá un email válido.");
            return;
        }

        if (mensaje === "") {
            alert("Por favor, ingresá un mensaje.");
            return;
        }

        console.log("Datos enviados:");

        console.log("Nombre:", nombre);

        console.log("Email:", email);

        console.log("Mensaje:", mensaje);

        alert("¡Mensaje enviado correctamente!");

        formulario.reset();
    });
}