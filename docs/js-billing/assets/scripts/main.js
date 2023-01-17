
/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
function Unidades(num) {

    switch (num) {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num) {

    decena = Math.floor(num / 10);
    unidad = num - (decena * 10);

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + " Y " + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch (centenas) {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "MIL", "MIL");
    strCentenas = Centenas(resto);

    if (strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    if (resto > 0) {
        strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    } else {
        strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");

    }
    strMiles = Miles(resto);

    if (strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'PESOS', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function () {
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
        })();
    };

    if (data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()

$(document).ready(() => {
    numero = NumeroALetras(document.getElementById("price").value);
    document.getElementById("priceL").value = numero;
    $("#price").change(() => {
        numero = NumeroALetras(document.getElementById("price").value);
        document.getElementById("priceL").value = numero;
    })
    const fechaActual = new Date();
    // const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    fecha = fechaActual.getFullYear() + "-" + meses[fechaActual.getMonth()] + "-" + fechaActual.getDate();
    document.getElementById("date").value = fecha;
    previewHTMLFile();
    $("#bottomB").change('#previewHtml', function () {
        previewHTMLFile();
    });

    // $("#previewHtmlContent").load('/print.html')
    function previewHTMLFile() {
        $('#previewHtmlContent').load('./print_copy.html');
        date = document.getElementById("date").value;
        brand = document.getElementById("brand").value;
        number = document.getElementById("number").value;
        client = document.getElementById("client").value;
        clientID = document.getElementById("clientID").value;
        clientNUM = document.getElementById("clientNUM").value;
        concept = document.getElementById("concept").value;
        price = Number(document.getElementById("price").value);
        priceL = document.getElementById("priceL").value;
        autosave = document.getElementById("autosave").value;
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

        var emp = new empresa("Muñoz & Ruiz Abogados", "+576043379401", 573508809878, "ruizmunoz1003@gmail.com", "mra");
        empresas.push(emp);
        var emp = new empresa("Comercializadora MR", "+576043379401", 573008212386, "ruizmunoz1003@gmail.com", "cmr");
        empresas.push(emp);
        var emp = new empresa("Alejandra Muñoz Marín", "+576043379401", 573508809878, "alejandramunozabg@outlook.com", "am");
        empresas.push(emp);

        setTimeout(() => {
            $("title").text("Comprobante de pago #00" + number);
            $("#brandT").text(empresas[Number(brand)].name.toUpperCase());
            $("#brandN").text(empresas[Number(brand)].number);
            $("#brandNA").attr("href", "tel:" + empresas[Number(brand)].number);
            $("#brandW").text(empresas[Number(brand)].whatsapp);
            $("#brandWA").attr("href", "https://api.whatsapp.com/send?phone=" + empresas[Number(brand)].whatsapp);
            $("#brandM").text(empresas[Number(brand)].mail.toLowerCase());
            $("#brandMA").attr("href", "mailto:" + empresas[Number(brand)].mail);
            $("#logo").attr("src", "./assets/img/" + empresas[Number(brand)].img + ".png");
            $("#logo").attr("alt", "Logo - " + empresas[Number(brand)].name + " - (" + empresas[Number(brand)].img + ".png)");
    
            $(".date").text(dateL.toUpperCase());
            $(".number").text(number);
            $(".client").text(client.toUpperCase());
            $(".clientID").text(clientID);
            $(".clientNUM").text(clientNUM);
            $(".concept").text(concept.toUpperCase());
            $(".price").text(price.toLocaleString('es-CO'));
            $(".priceL").text(priceL.toUpperCase());
        }, 100);
    }
    $(document).on('click', '#convertHtmlToPDF', function () {
        converHTMLToPDF();
    });
    function converHTMLToPDF() {
        const { jsPDF } = window.jspdf;
        var pdf = new jsPDF('p', 'mm', [220, 280]);
        var pdfjs = document.querySelector('#previewHtmlContent');
        pdf.html(pdfjs, {
            callback: function (pdf) {
                pdf.save("Comprobante de pago #00" + number + ".pdf");
            },
            x: 5,
            y: 5
        });
    }
})

function generar() {
    date = document.getElementById("date").value;
    brand = document.getElementById("brand").value;
    number = document.getElementById("number").value;
    client = document.getElementById("client").value;
    clientID = document.getElementById("clientID").value;
    clientNUM = document.getElementById("clientNUM").value;
    concept = document.getElementById("concept").value;
    price = document.getElementById("price").value;
    priceL = document.getElementById("priceL").value;
    autosave = document.getElementById("autosave").value;

    openedWindow = window.open("print.html?date=" + date + "&brand=" + brand + "&number=" + number + "&client=" + client + "&clientID=" + clientID + "&clientNUM=" + clientNUM + "&concept=" + concept + "&price=" + price + "&priceL=" + priceL + "&autosave=" + autosave);
    openedWindow.addEventListener('afterprint', (event) => {
        openedWindow.close();
    })
    return false;
}
