version = '6.0';
url = '';

$(document).ready(() => {
    function isMobile() {
        try{ 
            document.createEvent("TouchEvent"); 
            return true; 
        }
        catch(e){ 
            return false;
        }
    }
    $('#version').text(version);
    if (isMobile() == true) {
        $('#info').text('Toque sostenido en el comprobante para compartir la imágen generada')
        classI = 'alert-info';
    } else {
        $('#info').text('Click derecho al comprobante y copiar para compartir la imágen generada')
    }
    $('#infodiv .bi-x').click(()=>{
        $('#infodiv').toggleClass('hiddenalert');
        setTimeout(() => {
            $('#infodiv').toggleClass('dark');
        }, 450);
    })
    numero = NumeroALetras(document.getElementById("price").value);
    document.getElementById("priceL").value = numero;
    $("#price").on('input',() => {
        numero = NumeroALetras(document.getElementById("price").value);
        document.getElementById("priceL").value = numero;
    })
    const fechaActual = new Date();
    // const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    fecha = fechaActual.getFullYear() + "-" + meses[fechaActual.getMonth()] + "-" + fechaActual.getDate();
    document.getElementById("date").value = fecha;
    previewHTMLFile();
    $("#bottomB").on('input', function () {
        previewHTMLFile();
    });
    $("#bottomB").on('change', function () {
        previewHTMLFile();
    });
    $(".bi-calendar").on('click', function () {
        document.getElementById("date").value = fecha;
        previewHTMLFile();
    });
    
    // $("#previewHtmlContent").load('/print.html')
    $('#previewHtmlContent').load('./print_copy.html');
    function empresa(name, idtype, id, number, whatsapp, mail, img) {
        this.name = name;
        this.idtype = idtype;
        this.id = id;
        this.number = number;
        this.whatsapp = whatsapp;
        this.mail = mail;
        this.img = img;
    }

    var empresas = [];
    var idtype = [NaN,"NIT","C.C."];

    var emp = new empresa("Muñoz & Ruiz Abogados", 0, NaN, "6043379401", 3508809878, "ruizmunoz1003@gmail.com", "mra");
    empresas.push(emp);
    var emp = new empresa("Comercializadora MR", 0, NaN, "6043379401", 3008212386, "ruizmunoz1003@gmail.com", "cmr");
    empresas.push(emp);
    var emp = new empresa("Alejandra Muñoz Marín", 2, 40328563, "6043379401", 3508809878, "alejandramunozabg@outlook.com", "am");
    empresas.push(emp);
    function previewHTMLFile() {
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
        year = new Date().toLocaleDateString('es-CO', {year:'numeric'});
        
        setTimeout(() => {
            $("title").text("Comprobante de pago #00" + number);
            $("#brandT").text(empresas[Number(brand)].name.toUpperCase());
            if (empresas[Number(brand)].idtype == 0) {
                $('.idb').addClass('dark');
            } else {
                $('.idb').removeClass('dark');
                $("#brandIDT").text(idtype[empresas[Number(brand)].idtype].toUpperCase());
                $("#brandID").text(empresas[Number(brand)].id);
            }
            $("#brandN").text(empresas[Number(brand)].number);
            $("#brandNA").attr("href", "tel:+57" + empresas[Number(brand)].number);
            $("#brandW").text(empresas[Number(brand)].whatsapp);
            $("#brandWA").attr("href", "https://api.whatsapp.com/send?phone=57" + empresas[Number(brand)].whatsapp);
            $("#brandM").text(empresas[Number(brand)].mail.toLowerCase());
            $("#brandMA").attr("href", "mailto:" + empresas[Number(brand)].mail);
            $("#logo").attr("src", "./assets/img/" + empresas[Number(brand)].img + ".png");
            $("#logo").attr("alt", "Logo - " + empresas[Number(brand)].name + " - (" + empresas[Number(brand)].img + ".png)");
            
            $(".date").text(dateL.toUpperCase());
            if (date == '') {
                $(".date").html('_________, __ de _________ de '+year)
            }
            $(".number").text(number);
            if (number == '') {
                $(".number").html('___')
            }
            $(".client").text(client.toUpperCase());
            if (client == '') {
                $(".client").html('________________________________')
            }
            $(".clientID").text(clientID);
            if (clientID == '') {
                $(".clientID").html('____________')
            }
            $(".clientNUM").text(clientNUM);
            if (clientNUM == '') {
                $(".clientNUM").html('____________')
            }
            $(".concept").text(concept.toUpperCase());
            $(".price").text(price.toLocaleString('es-CO'));
            if (concept == '') {
                $(".price").html('____________')
            }
            $(".priceL").text(priceL.toUpperCase());
            if (concept == '') {
                $(".priceL").html('<br>')
            }
            $(".version").text(version);
            converHTMLToPNG();
        }, 100);
    }
    $("#blankformat").click(()=> {
        document.getElementById('date').value = '';
        document.getElementById('brand').value = document.getElementById('brand2').value;
        document.getElementById("number").value = '';
        document.getElementById("client").value = '';
        document.getElementById("clientID").value = '';
        document.getElementById("clientNUM").value = '';
        document.getElementById("concept").value = '';
        previewHTMLFile();
    })
    $(document).on('click', '#copypng', function () {
        copypng();
    });
    $(document).on('click', '#convertHtmlToPDF', function () {
        converHTMLToPDF();
    });
    $(document).on('click', '#convertHtmlToPNG', function () {
        dwnlPNG();
    });
    function converHTMLToPDF() {
        $('#content').css('transform', 'scale(3)')
        $('#loading').attr('class', '--active')
        html2canvas(document.querySelector("#content"),{ scale: 1.268 }).then(function(canvas){
            var img=canvas.toDataURL("image/png",1.0);
            const { jsPDF } = window.jspdf; 
            var doc = new jsPDF('l', 'mm', [220, 140],true);
            doc.addImage(img,'JPEG',5,5);
            doc.autoPrint({variant:'javascript'});
            doc.output('dataurlnewwindow',"Comprobantedepago"+number+".png")
            $('#content').css('transform', 'scale(1)')
            $('#loading').attr('class', '')
        });
    }
    function converHTMLToPNG() {
        $('#content').css('transform', 'scale(3)')
        $('#loading').attr('class', '--active')
        html2canvas(document.querySelector("#content"),{ scale: 1.268 }).then(function(canvas){
            if (classI == 'alert-danger') {
                $('#error').toggleClass('hiddenalert', true);
                setTimeout(() => {
                    $('#error').toggleClass('dark', true);
                }, 450);
            }
            canvas.toBlob((blob) => {
                if (url != '') {
                    URL.revokeObjectURL(url);
                }
                url = URL.createObjectURL(blob);
                $('#imgpreview').attr('src',url);
                $('#downloadpng').attr('href', url);
                $('#downloadpng').attr('download', "Comprobantedepago"+number);
                // window.open(url,'_blank');
            },'image/png');
            $('#content').css('transform', 'scale(1)')
            $('#loading').attr('class', '')
        }).catch(()=> {
            $('#loading').attr('class', '--active')
            $('#error').toggleClass(classI, false);
            classI = 'alert-danger';
            $('#error').toggleClass(classI, true);
            $('#error').text('Error generando comprobante. Intentando de nuevo...')
            $('#error').toggleClass('hiddenalert',false);
            $('#error').toggleClass('dark',false);
            previewHTMLFile();
        });
        
    }
    function dwnlPNG() {
        $('#downloadpng').get(0).click();
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
    autosave = document.getElementById("autosave").checked;

    openedWindow = window.open("print.html?date=" + date + "&brand=" + brand + "&number=" + number + "&client=" + client + "&clientID=" + clientID + "&clientNUM=" + clientNUM + "&concept=" + concept + "&price=" + price + "&priceL=" + priceL + "&autosave=" + autosave + "&version=" + version);
    return false;
}
