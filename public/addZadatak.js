var errors = document.createElement("div");
errors.style.border = "1px solid black";
errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementsByTagName("form")[0].appendChild(errors);
var validacija = new Validacija(errors);

var inputNaziv = document.getElementsByName("naziv")[0];
var button = document.getElementsByName("Dodaj")[0];

button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	validacija.naziv(inputNaziv);
}