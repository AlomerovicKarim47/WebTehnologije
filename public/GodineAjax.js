var GodineAjax = (function(){

    var konstruktor = function(divSadrzaj){
        divSadrzaj.innerHTML = " ";
        let ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:8080/godine', true);
        ajax.send();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200)
            {
                var odgovor = JSON.parse(ajax.responseText);
                
                for (var i = 0; i < odgovor.length; i++)
                {
                    divSadrzaj.innerHTML += "<div class='godina'> Naziv godine:<br>"+ odgovor[i].nazivGod  +"<br>Naziv repozitorija vjezne: <br>"+ odgovor[i].nazivRepVje + "<br> Naziv repozitorija spirale:<br>" 
                    + odgovor[i].nazivRepSpi +"</div>";
                }
                
            }
        }

        
        return {
            osvjezi:function(){
                let ajax = new XMLHttpRequest();
                divSadrzaj.innerHTML = " "; //PITATI ZA OVO
                ajax.open('GET', 'http://localhost:8080/godine', true);
                ajax.send();

                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4 && ajax.status == 200)
                    {
                        var odgovor = JSON.parse(ajax.responseText);
                        
                        for (var i = 0; i < odgovor.length; i++)
                        {
                            divSadrzaj.innerHTML += "<div class='godina'> Naziv godine:<br>"+ odgovor[i].nazivGod  +"<br>Naziv repozitorija vjezne: <br>"+ odgovor[i].nazivRepVje + "<br> Naziv repozitorija spirale:<br>" 
                            + odgovor[i].nazivRepSpi +"</div>";
                        }
                        
                    }
                }
            }
        }
    }
    return konstruktor;
}());
//TEST
//godineajax.osvjezi();