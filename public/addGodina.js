var errors = document.createElement("div");
errors.style.border = "1px solid black";

errors.style.background = "white";
errors.style.visibility = "hidden";
errors.innerHTML = "Sljedeca polja nisu validna:\n";

document.getElementById("side").appendChild(errors);
var validacija = new Validacija(errors);

var inputNaziv = document.getElementsByName("naziv")[0];
var inputRvjezbe = document.getElementsByName("rvjezbe")[0];
var inputRspiral = document.getElementsByName("rspiral")[0];
var button = document.getElementsByName("submit")[0];
var godineajax;

document.getElementsByTagName('body')[0].onload = function(){
	var div = document.getElementById('glavniSadrzaj');
	godineajax = new GodineAjax(div);
}

button.onclick = function(){
	errors.style.visibility = "hidden";
	errors.innerHTML = "Sljedeca polja nisu validna:\n";
	validacija.godina(inputNaziv);
	validacija.repozitorij(inputRvjezbe, /^[A-Z]|[a-z]$/);
	validacija.repozitorij(inputRspiral, /^[A-Z]|[a-z]$/);
}

document.getElementsByName('osvjezi')[0].onclick = function(){
	godineajax.osvjezi();
}

