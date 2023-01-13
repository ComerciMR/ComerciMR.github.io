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

function empresa(name, number, whatsapp, mail,img) { 
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

$(document).ready(()=>{
    $("#brandT").text(empresas[Number(brand)].name.toUpperCase());
    $("#brandN").text(empresas[Number(brand)].number);
    $("#brandNA").attr("href","tel:"+empresas[Number(brand)].number);
    $("#brandW").text(empresas[Number(brand)].whatsapp);
    $("#brandWA").attr("href","https://api.whatsapp.com/send?phone="+empresas[Number(brand)].whatsapp);
    $("#brandM").text(empresas[Number(brand)].mail.toLowerCase());
    $("#brandMA").attr("href","mailto:"+empresas[Number(brand)].mail);
    $("#logo").attr("src","./assets/img/"+empresas[Number(brand)].img+".png");
    $("#logo").attr("alt","Logo - "+empresas[Number(brand)].name+" - ("+empresas[Number(brand)].img+".png)");

    $("#date").text(date.toUpperCase());
    $("#number").text(number);
    $("#client").text(client.toUpperCase());
    $("#clientID").text(clientID);
    $("#clientNUM").text(clientNUM);
    $("#concept").text(concept.toUpperCase());
    $("#price").text(price.toLocaleString('es-CO'));
    $("#priceL").text(priceL.toUpperCase());
    print();
})