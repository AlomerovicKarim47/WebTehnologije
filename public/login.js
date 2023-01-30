var errors = document.createElement("div");
errors.style.border = "1px solid black";
errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementById("login").appendChild(errors);
var validacija = new Validacija(errors);

var passInput = document.getElementsByName("password")[0];
var button = document.getElementsByName("login")[0];

button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	validacija.password(passInput);
}