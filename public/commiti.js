var kreiraj = document.getElementById("kreiraj");

kreiraj.onclick = function(){
	var brZad = document.getElementById("brzad").value;
	var mojDiv=document.getElementById("kontejner");
	
	//DODAVANJE
	if (document.getElementById("dodajRbZ") == null)
	{
		var dodajRbZ = document.createElement("input");
		dodajRbZ.type = "number";
		dodajRbZ.id = "dodajRbZ";
		var txt = document.createElement("h3");
		txt.innerHTML = "Redni broj zadatka: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(dodajRbZ);
		
	}
	if (document.getElementById("dodajUrl") == null)
	{
		var dodajUrl = document.createElement("input");
		dodajUrl.type = "text";
		dodajUrl.id = "dodajUrl";
		var txt = document.createElement("h3");
		txt.innerHTML = "Url: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(dodajUrl);
	}
	if (document.getElementById("dodajButton") == null)
	{
		var dodajButton = document.createElement("button");
		dodajButton.type = "button";
		dodajButton.innerHTML = "Dodaj commit";
		dodajButton.id = "dodajButton";
		mojDiv.appendChild(document.createElement("br"));
		mojDiv.appendChild(dodajButton);
	}

	//EDITOVANJE
	if (document.getElementById("editRbZ") == null)
	{
		var editRbZ = document.createElement("input");
		editRbZ.type = "number";
		editRbZ.id = "editRbZ";
		var txt = document.createElement("h3");
		txt.innerHTML = "Redni broj zadatka: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(editRbZ);
		
	}
	if (document.getElementById("editRbC") == null)
	{
		var editRbC = document.createElement("input");
		editRbC.type = "number";
		editRbC.id = "editRbC";
		var txt = document.createElement("h3");
		txt.innerHTML = "Redni broj commita: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(editRbC);
		
	}
	if (document.getElementById("editUrl") == null)
	{
		var editUrl = document.createElement("input");
		editUrl.type = "text";
		editUrl.id = "editUrl";
		var txt = document.createElement("h3");
		txt.innerHTML = "Url: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(editUrl);
	}
	if (document.getElementById("editButton") == null)
	{
		var editButton = document.createElement("button");
		editButton.type = "button";
		editButton.innerHTML = "Edituj commit";
		editButton.id = "editButton";
		mojDiv.appendChild(document.createElement("br"));
		mojDiv.appendChild(editButton);
	}

	//BRISANJE
	if (document.getElementById("deleteRbZ") == null)
	{
		var deleteRbZ = document.createElement("input");
		deleteRbZ.type = "number";
		deleteRbZ.id = "deleteRbZ";
		var txt = document.createElement("h3");
		txt.innerHTML = "Redni broj zadatka: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(deleteRbZ);
		
	}
	if (document.getElementById("deleteRbC") == null)
	{
		var deleteRbC = document.createElement("input");
		deleteRbC.type = "number";
		deleteRbC.id = "deleteRbC";
		var txt = document.createElement("h3");
		txt.innerHTML = "Redni broj commita: ";
		mojDiv.appendChild(txt);
		mojDiv.appendChild(deleteRbC);
		
	}
	if (document.getElementById("deleteButton") == null)
	{
		var deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.innerHTML = "Obrisi commit";
		deleteButton.id = "deleteButton";
		mojDiv.appendChild(document.createElement("br"));
		mojDiv.appendChild(deleteButton);
	}

	var tabela= new CommitTabela(mojDiv,brZad);

	if (dodajButton != null)
	dodajButton.onclick = function(){
		var rbZ = dodajRbZ.value;
		var url = dodajUrl.value;
		tabela.dodajCommit(rbZ, url);
	}
	if (editButton != null)
	editButton.onclick = function(){
		var rbZ = editRbZ.value;
		var rbC = editRbC.value;
		var url = editUrl.value;
		tabela.editujCommit(rbZ, rbC, url);
	}
	if (deleteButton != null)
	deleteButton.onclick = function(){
		var rbZ = deleteRbZ.value;
		var rbC = deleteRbC.value;
		tabela.obrisiCommit(rbZ, rbC);
	}
}