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
    autosize($('textarea'));
    $('#slogan').addClass('animated zoomIn');
});

function removeCaptchaValidation () {
    $('.g-recaptcha').removeClass('is-invalid');
    $('.g-recaptcha>div').removeClass('border rounded border-danger');
}

window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            var response = grecaptcha.getResponse();
            if(response.length == 0){
                $('.g-recaptcha>div').addClass('border rounded border-danger');
                $('.g-recaptcha').addClass('is-invalid');
                event.preventDefault();
                event.stopPropagation();
            }
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

                datosBI.Nombre = $('#nombre').val();
                datosBI.Empresa = $('#empresa').val();
                datosBI.Cargo = $('#cargo').val();
                datosBI.Email = $('#email').val();
                datosBI.Direccion = $('#direccion').val();
                datosBI.Mensaje = $('#mensaje').val();
                datosBI.Fechayhoracreacion = (new Date(Date.now() - 18000000)).toISOString();
                datosBI.FechaTentativa = (new Date($('#fecha').datepicker('getDate').getTime() - 18000000)).toISOString();
                datosBI.Celular = $('#celular').val();
                datosBI.interesado = $('#interesado option:selected').text();
                $('.g-recaptcha>div').removeClass('border rounded border-danger');
                $('#enviando').addClass('d-inline')
                handleBIsend();
                handleOnSubmit();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

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

const datosBI = [{
    "Nombre" : "",
    "Empresa" : "",
    "Cargo" : "",
    "Email" : "",
    "Direccion" : "",
    "Mensaje": "",
    "Fechayhoracreacion" : "",
    "FechaTentativa" : "",
    "Celular": "",
    "Interesado": ""
}]

async function handleBIsend() {
    var res = await fetch('https://api.powerbi.com/beta/74489909-68bd-46b6-9d1b-3f73ef0f56b6/datasets/dd8515af-8c82-41e5-b31e-cb08f19b612a/rows?noSignUpCheck=1&key=%2Fdh%2B0Zst%2FoJuMIEGRS96%2BXUGncA3GPIIvWtYRyy3DlP7JsF9ONOhmlEH1PDwWf%2Bs8BlmAHGpU%2FVXJN7AfUS86g%3D%3D', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosBI)
    });
    var text = await res.text();
    handleResponseBI(res.status, text);
};


async function handleOnSubmit() {
    $("#submit").attr("disabled", false)
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
        console.log('Datos enviados a recipientes de e-mail exitosamente (Código 200)');
        console.log(msg);
        $('#contacto').hide();
        $('#gracias').show();
    } else {
        console.log('Fallo al intentar enviar datos a recipientes de e-mail (Código '+ status +')');
        console.log(msg);
    }
};

function handleResponseBI(status, msg) {
    if (status === 200) {
        console.log('Datos enviados a PowerBI exitosamente (Código 200)');
    } else {
        console.log('Fallo al enviar los datos a PowerBI (Código '+ status +')');
        console.log(msg);
    }
};