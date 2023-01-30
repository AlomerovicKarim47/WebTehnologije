var ZadaciAjax = (function(){

    var posaljiZahtjev = function(tip, cb){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:8080/zadaci', true); 
        ajax.setRequestHeader('Accept', tip);
        ajax.send();
        setTimeout(function(){
            ajax.abort()
        }, 2000);
        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200)
            {
                cb(ajax.responseText);
                return ajax.responseText;
            }
        }
    }
    var poslana = false;

    var konstruktor = function(callbackFn){
        
        
        return {
            dajXML:function(){
                if (!poslana)
                {
                    poslana = true;
                    posaljiZahtjev('application/xml', function(res){
                        callbackFn(res);
                    });
                    
                    poslana = false;
                }
                else
                {
                    callbackFn({"greska":"Već ste uputili zahtjev"});
                }
                
            },
            dajCSV:function(){
                if (!poslana)
                {   
                    poslana = true;
                    posaljiZahtjev('text/csv', function(res){
                        callbackFn(res);
                    });
                    poslana = false;
                }
                else
                {
                    callbackFn({"greska":"Već ste uputili zahtjev"});
                }
            },
            dajJSON:function(){
                if (!poslana)
                {
                    poslana = true;
                    posaljiZahtjev('application/json', function(res){
                        callbackFn(res);
                    });
                    poslana = false;
                }
                else
                {
                    callbackFn({"greska":"Već ste uputili zahtjev"});
                }
            }
        }
    }
    return konstruktor;
}());



