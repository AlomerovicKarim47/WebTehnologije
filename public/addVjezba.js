var errors = document.createElement("div");
errors.style.border = "1px solid black";
errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementsByName("fNova")[0].appendChild(errors);
var validacija = new Validacija(errors);

var inputNV = document.getElementsByName("nazivVjezbe")[0];
var button = document.getElementsByName("submit")[0];

/*button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	validacija.naziv(inputNV);
}*/

//4.spirala

//Ucitaj godine, vjezbe, zadatke
document.getElementsByTagName("body")[0].onload = function()
{
	//LOAD GODINE
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'http://localhost:8080/godine', true);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200)
		{
			var odgovor = JSON.parse(ajax.responseText);
			var list = document.getElementsByName("sGodine")[0];
			var list2 = document.getElementsByName("sGodine")[1];
			
			for(var i = 0; i < odgovor.length; i++)
			{
				var option = document.createElement("option");
				var option2 = document.createElement("option");
				option.text = odgovor[i].nazivGod;
				option.value = odgovor[i].id;
				option2.text = odgovor[i].nazivGod;
				option2.value = odgovor[i].id;
				list.add(option);
				list2.add(option2);
			}
		}
		
	}
	//LOAD VJEZBE
	var ajax2 = new XMLHttpRequest();
	ajax2.open('GET', 'http://localhost:8080/vjezbe', true);
	ajax2.send();
	ajax2.onreadystatechange = function(){
		if (ajax2.readyState == 4 && ajax2.status == 200)
		{
			var odgovor2 = JSON.parse(ajax2.responseText);
		
			for (var i = 0; i < odgovor2.length; i++)
			{
				var listVje = document.getElementsByName("sVjezbe")[0];
				var listVje2 = document.getElementsByName("sVjezbe")[1];
				var option3 = document.createElement("option");
				option3.text = odgovor2[i].naziv;
				option3.value = odgovor2[i].id;
				var option4 = document.createElement("option");
				option4.text = odgovor2[i].naziv;
				option4.value = odgovor2[i].id;
				listVje.add(option3);
				listVje2.add(option4);
			}
		}
	}

	//LOAD ZADACI (PRVI PUT)
	var sVjezbe = document.getElementsByName("sVjezbe")[1];
	var id = sVjezbe.options[sVjezbe.selectedIndex].value;
	ajax3 = new XMLHttpRequest();
	ajax.open("GET", "http://localhost:8080/zadaciF?vjezba=" + id);
	ajax3.send();

	ajax3.onreadystatechange = function(){
		if (ajax3.readyState == 4 && ajax3.status == 200)
		{
			var odgovor2 = JSON.parse(ajax3.responseText);
		
			for (var i = 0; i < odgovor2.length; i++)
			{
				var sZadatak = document.getElementsByName("sZadatak")[0];
				var option3 = document.createElement("option");
				option3.text = odgovor2[i].naziv;
				option3.value = odgovor2[i].id;
				sZadatak.add(option3);
			}
		}
	}

}

//2c mijenjane liste zadataka u ovisnosti od vjezbe
var sVjezbe = document.getElementsByName("sVjezbe")[1];
var sZadatak = document.getElementsByName("sZadatak")[0];
sVjezbe.onchange = function(){
	var id = sVjezbe.options[sVjezbe.selectedIndex].value;
	ajax = new XMLHttpRequest();
	ajax.open("GET", "http://localhost:8080/zadaciF?vjezba=" + id);
	ajax.send();
	sZadatak.innerHTML = "";
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200)
		{
			var odgovor2 = JSON.parse(ajax.responseText);
			
			for (var i = 0; i < odgovor2.length; i++)
			{
				var option3 = document.createElement("option");
				option3.text = odgovor2[i].naziv;
				option3.value = odgovor2[i].id;
				sZadatak.add(option3);
			}
		}
	}
}



