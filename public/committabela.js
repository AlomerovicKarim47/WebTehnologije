var CommitTabela=(function(){
	//lokalne variable idu ovdje	

	var konstruktor=function(divElement,brojZadataka){
		
		var staraTabela = document.getElementById("committabela");
		if (staraTabela != null)
			staraTabela.remove();

		var tabela = document.createElement('table');
		tabela.id = "committabela";
		var header = tabela.insertRow(0);
		header.insertCell(0).innerHTML = "Naziv zadatka";
		header.insertCell(1).innerHTML = "Commiti";

		var maxLength = 2;

		for(var i = 0; i < brojZadataka; i++)
		{
			tabela.insertRow(i + 1).insertCell(0).innerHTML = "Zadatak " + (i + 1);
		}
		
		divElement.appendChild(tabela);

		return{
			dodajCommit:function(rbZadatka,url){

				rbZadatka++;
				if (rbZadatka < 1 || rbZadatka >= tabela.rows.length)
					return -1;
				var red = tabela.rows[rbZadatka];
				var duzina = red.cells.length;

				if (red.cells[duzina - 1].innerHTML != " ")
					red.insertCell(-1).innerHTML = "<a href = '" + url + "'>" + (duzina) + "</a>";
				else
				{
					red.cells[duzina - 1].innerHTML = "<a href = '" + url + "'>" + (duzina - 1) + "</a>";
					red.cells[duzina - 1].colSpan = "1";
				}

				if (red.cells.length > maxLength)
					maxLength = red.cells.length;

				header.cells[1].colSpan = "" + maxLength - header.cells.length + 1; 

				for (var i = 1; i < tabela.rows.length; i++)
				{
					if (tabela.rows[i].cells[tabela.rows[i].cells.length - 1].innerHTML != " " && tabela.rows[i].cells.length != maxLength)
					{
						tabela.rows[i].insertCell(tabela.rows[i].cells.length).innerHTML = " ";						
					}
					tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan = "" + maxLength - tabela.rows[i].cells.length + 1;
				}
						
			},


			editujCommit:function(rbZadatka,rbCommita,url){
				rbZadatka++; 
				rbCommita++;
				if (rbZadatka < 1 || rbZadatka >= tabela.rows.length || rbCommita < 1 || rbCommita >= tabela.rows[rbZadatka].cells.length  || tabela.rows[rbZadatka].cells[rbCommita].innerHTML == " ")
					return -1;
				
				tabela.rows[rbZadatka].cells[rbCommita].innerHTML = "<a href = '" + url + "' >" + rbCommita + "</a>";

			},
			
			obrisiCommit:function(rbZadatka,rbCommita){
				rbZadatka++;
				rbCommita++;
				if (rbZadatka < 1 || rbZadatka >= tabela.rows.length || rbCommita < 1 || rbCommita >= tabela.rows[rbZadatka].cells.length)
					return -1;
				
				tabela.rows[rbZadatka].deleteCell(rbCommita); 

				for (var i = 1; i < tabela.rows.length; i++)
				{
					if (tabela.rows[i].cells[tabela.rows[i].cells.length - 1].innerHTML != " " && tabela.rows[i].cells.length != maxLength)
					{
						tabela.rows[i].insertCell(tabela.rows[i].cells.length).innerHTML = " ";						
					}
					tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan = "" + maxLength - tabela.rows[i].cells.length + 1;
				}
			}								
		}
	}
	return konstruktor;
}());
/*/Primjer koristenja:
var mojDiv=document.getElementById("kontejner");
var tabela= new CommitTabela(mojDiv,4);
tabela.dodajCommit(3,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(2,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(2,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(1,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");
tabela.dodajCommit(4,"http://etf.unsa.ba/");

tabela.obrisiCommit(1,1);
tabela.obrisiCommit(1,1);
tabela.obrisiCommit(1,1);
tabela.obrisiCommit(2,1);
tabela.obrisiCommit(3,1);

tabela.editujCommit(2,2, "ASS");

var tabela2= new CommitTabela(mojDiv,10);







/*U zadatku ne smijete koristiti nikakve hardkodirane vanjske
elemente, niti bilo kakvu vanjsku variablu koju niste dobili kroz
parametre konstruktora ili kroz parametre metoda*/

