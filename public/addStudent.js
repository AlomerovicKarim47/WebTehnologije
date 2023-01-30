/*var errors = document.createElement("div");
errors.style.border = "1px solid black";
errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementsByName("fPojedinacni")[0].appendChild(errors);
//document.getElementsByName("fMasovni")[0].appendChild(errors);
var validacija = new Validacija(errors);

var godinaInput = document.getElementsByName("godina")[0];
var iipInput = document.getElementsByName("ime")[0];

var indexInput = document.getElementsByName("index")[0];
var emailInput = document.getElementsByName("email")[0];
var button = document.getElementsByName("submit")[0];



button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	
	validacija.ime(iipInput);
	validacija.index(indexInput);
}

*/

document.getElementsByTagName("body")[0].onload = function()
{
	//LOAD GODINE
	var list = document.getElementsByName("sGodina")[0];
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'http://localhost:8080/godine', true);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200)
		{
			var odgovor = JSON.parse(ajax.responseText);			
			
			for(var i = 0; i < odgovor.length; i++)
			{
				var option = document.createElement("option");
				
				option.text = odgovor[i].nazivGod;
				option.value = odgovor[i].id;
				
				list.add(option);
				
			}
		}		
	}
}

var listaStud = [];
document.getElementsByTagName("button")[0].onclick = function(){
	var key = document.getElementsByName("key")[0].value;
	var secret = document.getElementsByName("secret")[0].value;
	var bbucket = new BitBucket(key, secret);

	var ajax = new XMLHttpRequest();
	ajax.open("GET", "http://localhost:8080/godine", true);
	ajax.send();
	var nazivRepVje;
	var nazivRepSpi;
	var sGodina = document.getElementsByName("sGodina")[0];
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200)
		{
			var niz = JSON.parse(ajax.responseText);
			for(var i = 0; i < niz.length; i++)
			{
				if (niz[i].id == sGodina.options[sGodina.selectedIndex].value)
				{
					nazivRepSpi = niz[i].nazivRepSpi;
					nazivRepVje = niz[i].nazivRepVje;
					break;
				}
			}
		}
	}

	bbucket.ucitaj(nazivRepSpi,nazivRepVje, function(err, content){ 
		if (err)
		{
			alert("GRESKA: " + err.toString());
		}
		else
		{
		listaStud = content;
		document.getElementsByTagName("input")[2].disabled = false;
		}
		
	});
}

document.getElementsByTagName("input")[2].onclick = function(){
	var sGodina = document.getElementsByName("sGodina")[0];
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://localhost:8080/student", true);
	var data = {godina: sGodina.options[sGodina.selectedIndex].value, studenti: listaStud};
	//console.log(JSON.stringify(data));
	ajax.setRequestHeader("Content-Type", "application/json");
	ajax.send(JSON.stringify(data));

	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200)
		{
			var odg = JSON.parse(ajax.responseText);
			alert(odg.message);
		}
	}
}