const datos = {
    "nombre" : "",
    "empresa" : "",
    "email" : ""
}

async function handleOnSubmit() {
    var res = await fetch('/api/send2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    var text = await res.text();
    handleResponse(res.status, text);
};

function handleResponse(status, msg) {
    if (status === 200) {
        console.log('Estatus 200');
        console.log(msg);
    } else {
        console.log('Otros Estatus')
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