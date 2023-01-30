var Validacija=(function(){
//lokalne variable idu ovdje

var konstruktor=function(divElementPoruke){

var obavijesti = function(inputElement, validno, naziv){
	if (!validno)
	{
		inputElement.style.backgroundColor = "orangered";
		divElementPoruke.innerHTML += " " + naziv + ",";
		divElementPoruke.style.visibility = "visible";
	}
	else if (validno)
	{
		inputElement.style.backgroundColor = "white";
	}
}

return{
ime:function(inputElement){
	var regex = /^(\'{0,1}[A-Z]{1}(\'{0,1}[a-z])+\'{0,1}[ ,-]){0,3}(\'{0,1}[A-Z]{1}(\'{0,1}[a-z])+\'{0,1}){1}$/; 
	var unos = inputElement.value;
	var validno = regex.test(unos);
	obavijesti(inputElement, validno, "ime");
},

godina:function(inputElement){
	var regex = /^20[0-9]{2}\/20[0-9]{2}$/;
	var unos = inputElement.value;
	var validno = regex.test(unos);
	if (validno)
	{
		var AB = parseInt(unos.substring(2,4));
		var CD = parseInt(unos.substring(7,9));
		
		if (CD - AB != 1)
			validno = false;
	}
	obavijesti(inputElement, validno, "godina");

},
repozitorij:function(inputElement,regex){
	var unos = inputElement.value;
	var validno = regex.test(unos);
	obavijesti(inputElement, validno, "repozitorij");
},
index:function(inputElement){
	var regex = /^((1[4-9])|(20))[0-9]{3}$/;
	var unos = inputElement.value;
	var validno = regex.test(unos);
	obavijesti(inputElement, validno, "index");
},
naziv:function(inputElement){
	var regex = /^([A-Z]|[a-z])([A-Z]|[a-z]|[0-9]|[\\,\/,\-,\",\',\!,\?,\:,\;,\,])+([a-z]|[0-9])$/;
	var unos = inputElement.value;
	var validno = regex.test(unos);
	obavijesti(inputElement, validno, "naziv");
},
password:function(inputElement){
	var regex = /^([0-9]|[A-Z]|[a-z]){8}$/;
	var unos = inputElement.value;
	var validno = regex.test(unos);
	if (validno)
	{
		var velikih = unos.match(/[A-Z]/g).length;
		var malih = unos.match(/[a-z]/g).length;
		var brojeva = unos.match(/[0-9]/g).length;

		if (velikih < 2 || malih < 2 || brojeva < 2)
			validno = false;
	}
	obavijesti(inputElement, validno, "password");
},
url:function(inputElement){
	var regex = /^((http)|(https)|(ftp)|(ssh))\:\/\/(([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)(\.([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)*(\/([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)*((\?(([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)\=(([a-z]|[0-9])+(\-([a-z]|[0-9])+)*))(\&((([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)\=(([a-z]|[0-9])+(\-([a-z]|[0-9])+)*)))*){0,1}$/;
	var unos = inputElement.value;
	var validno = regex.test(unos);
	obavijesti(inputElement, validno, "url");
}
}
}
return konstruktor;
}());
//Primjer koristenja:
/*var mojDiv=document.getElementById("glavniSadrzaj");
var inputIme=document.getElementById("inputIme");
var validacija = new Validacija("mojDiv");
validacija.ime("inputIme");
//U zadatku ne smijete koristiti nikakve hardkodirane vanjske
//elemente, niti bilo kakvu vanjsku variablu koju niste dobili kroz
//parametre konstruktora ili kroz parametre metoda*/