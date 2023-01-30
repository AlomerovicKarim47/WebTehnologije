var errors = document.createElement("div");
errors.style.border = "1px solid black";
errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementsByClassName("cetvrtina")[1].appendChild(errors);
var validacija = new Validacija(errors);

var imeInput = document.getElementsByName("query")[0];

var button = document.getElementsByName("search")[0];

button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	validacija.ime(imeInput);
}