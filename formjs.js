const datos = {
    nombre : "",
    empresa : "",
    email : ""
}

async function handleOnSubmit() {
    var res = await fetch('/api/send2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    db.collection("Clientes").add({
        Email: datos.email,
        Empresa: datos.empresa,
        Nombre: datos.nombre
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    var text = await res.text();
    handleResponse(res.status, text);
};

function handleResponse(status, msg) {
    if (status === 200) {
        console.log('Estatus 200');
        console.log(msg);
        $("#nombre").attr("disabled", true);
        $("#email").attr("disabled", true);
        $("#empresa").attr("disabled", true);
        $("#enviado").show();
        $("#submit").off("click");
    } else {
        console.log('Otros Estatus');
        console.log(msg);
    }
};



$(document).ready(function () {
    $('#nombre').change(function () {
        datos.nombre = $(this).val();
        console.log(datos);
    });

    $('#empresa').change(function () {
        datos.empresa = $(this).val();
        console.log(datos);
    });

    $('#email').change(function () {
        datos.email = $(this).val();
        console.log(datos);
    });

    $('#submit').click(function (e) {
        event.preventDefault();
        handleOnSubmit()
    });

});