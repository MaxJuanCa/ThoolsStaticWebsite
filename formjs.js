window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                datos.nombre = $('#nombre').val();
                datos.empresa = $('#empresa').val();
                datos.cargo = $('#cargo').val();
                datos.email = $('#email').val();
                datos.celular = $('#celular').val();
                datos.direccion = $('#direccion').val();
                datos.fecha = $('#fecha').val();
                datos.interesado = $('#interesado option:selected').text();
                datos.mensaje = $('#mensaje').val();
                console.log(datos);
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

function enableBtn () {
    $("#submit").attr("disabled", false)
}

function disableBtn () {
    $("#submit").attr("disabled", true)
}

$(document).ready(function(){
    $("#fecha").datepicker({
        language: 'es',
        todayHighlight: true,
        autoclose: true,
        clearBtn: true,
        weekStart: 0,
        format: {
            toDisplay: function (date, format, language) {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                var d = new Date(date);
                var e = new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
                return e.toLocaleDateString('es-CO', options);
            },
            toValue: function (date, format, language) {
                var d = new Date(date);
                return new Date(d);
            }
        }
    });
});


const datos = {
    nombre : "",
    empresa : "",
    cargo: "",
    email: "",
    celular: "",
    direccion: "",
    fecha: "",
    interesado: "",
    mensaje: ""
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
        $('#contacto').hide();
        $('#gracias').show();
    } else {
        console.log('Otros Estatus');
        console.log(msg);
    }
};