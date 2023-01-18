const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var date = urlParams.get('date');
var brand = urlParams.get('brand');
var number = urlParams.get('number');
var client = urlParams.get('client');
var clientID = urlParams.get('clientID');
var clientNUM = urlParams.get('clientNUM');
var concept = urlParams.get('concept');
var price = Number(urlParams.get('price'));
var priceL = urlParams.get('priceL');
var autosave = urlParams.get('autosave');
var version = urlParams.get('version');

const fechaActual = new Date(date + ":");
const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateL = fechaActual.toLocaleDateString('es-CO', opciones);

function empresa(name, number, whatsapp, mail, img) {
    this.name = name;
    this.number = number;
    this.whatsapp = whatsapp;
    this.mail = mail;
    this.img = img;
}

var empresas = [];
var idtype = [NaN, "NIT", "C.C."];

var emp = new empresa("Muñoz & Ruiz Abogados", 0, NaN, "6043379401", 3508809878, "ruizmunoz1003@gmail.com", "mra");
empresas.push(emp);
var emp = new empresa("Comercializadora MR", 0, NaN, "6043379401", 3008212386, "ruizmunoz1003@gmail.com", "cmr");
empresas.push(emp);
var emp = new empresa("Alejandra Muñoz Marín", 2, 40328563, "6043379401", 3508809878, "alejandramunozabg@outlook.com", "am");
empresas.push(emp);

$(document).ready(() => {
    $('body').css('transform', 'scale(1)')
    $("title").text("Comprobante de pago #00" + number);
    $("#brandT").text(empresas[Number(brand)].name.toUpperCase());
    if (empresas[Number(brand)].idtype == 0) {
        $('.idb').remove();
    } else {
        $("#brandIDT").text(idtype[empresas[Number(brand)].idtype].toUpperCase());
        $("#brandID").text(empresas[Number(brand)].id);
    }
    $("#brandN").text(empresas[Number(brand)].number);
    $("#brandNA").attr("href", "tel:" + empresas[Number(brand)].number);
    $("#brandW").text(empresas[Number(brand)].whatsapp);
    $("#brandWA").attr("href", "https://api.whatsapp.com/send?phone=" + empresas[Number(brand)].whatsapp);
    $("#brandM").text(empresas[Number(brand)].mail.toLowerCase());
    $("#brandMA").attr("href", "mailto:" + empresas[Number(brand)].mail);
    $("#logo").attr("src", "./assets/img/" + empresas[Number(brand)].img + ".png");
    $("#logo").attr("alt", "Logo - " + empresas[Number(brand)].name + " - (" + empresas[Number(brand)].img + ".png)");

    $("#date").text(dateL.toUpperCase());
    $("#number").text(number);
    $("#client").text(client.toUpperCase());
    $("#clientID").text(clientID);
    $("#clientNUM").text(clientNUM);
    $("#concept").text(concept.toUpperCase());
    $("#price").text(price.toLocaleString('es-CO'));
    $("#priceL").text(priceL.toUpperCase());
    $("#version").text(version);
    const { jsPDF } = window.jspdf;
    var pdf = new jsPDF('l', 'mm', [220, 140]);
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    var pdfjs = document.querySelector('#content');
    pdf.html(pdfjs, {
        'width': 220,
        'elementHandlers': specialElementHandlers,
        callback: function (pdf) {
            pdf.autoPrint({ variant: 'javascript' });
            if (autosave == 'true') {
                pdf.save("Comproba nte de pago #00" + number + ".pdf");
                $('body').css('transform', 'scale(2)')
            } else {
                $('body').css('transform', 'scale(2)')
            }
        },
        x: 5,
        y: 5
    });
})

function printDoc() {
    $('body').css('transform', 'scale(1)')
    const { jsPDF } = window.jspdf;
    var pdf = new jsPDF('l', 'mm', [220, 140]);
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    var pdfjs = document.querySelector('#content');
    pdf.html(pdfjs, {
        'width': 220,
        'elementHandlers': specialElementHandlers,
        callback: function (pdf) {
            // pdf.output('dataurlnewwindow');
            pdf.autoPrint({ variant: 'javascript' });
            pdf.save("Comproba nte de pago #00" + number + ".pdf");
            $('body').css('transform', 'scale(2)')
        },
        x: 5,
        y: 5

    });
}