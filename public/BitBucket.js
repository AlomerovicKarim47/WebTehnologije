var BitBucket = (function(){
         
    var token;        

    function getAccessToken(key, secret, proslijedi){
        var ajax = new XMLHttpRequest();
        
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                proslijedi(null,JSON.parse(ajax.responseText).access_token);
            else if (ajax.readyState == 4)
                proslijedi(ajax.responseText,null);
        }
        ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ':' + secret));
        ajax.send("grant_type="+encodeURIComponent("client_credentials"));
    }

    function sadrziLi(niz, stuednt)
    {
        for (var i = 0; i < niz.length; i++)
            if (niz[i].index == stuednt.index)
                return true;
        return false;
    }

    function izdvojiStudente(odgovor){
        var niz = [];
        for (var i = 0; i < odgovor.length; i++)
        {
            var indeks = odgovor[i].name.substring(odgovor[i].name.length - 5, odgovor[i].name.length);
            var stud = {imePrezime: odgovor[i].owner.username, index: indeks};
            if (!sadrziLi(niz, stud))
                niz.push(stud);
        }
        return niz;
    }
        
    var konstruktor = function(key, secret){
        token = new Promise(function(resolve, reject){
            getAccessToken(key, secret, function(err, content){
                if (err)
                    reject(err);
                resolve(content);
            });
        });
        
        return {
            ucitaj:function(nazivRepSpi,nazivRepVje, callback){
                
                token.then(function(rezultat){
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange = function(){
                        if (ajax.readyState == 4 && ajax.status == 200)
                        {
                            var odg = JSON.parse(ajax.responseText);
                            for(var i = 0; i < odg.values.length; i++)
                            {
                                if((odg.values[i].name).indexOf(nazivRepSpi) != 0 && (odg.values[i].name).indexOf(nazivRepVje) != 0); 
                                {   
                                    console.log(odg.values[i].name);
                                    odg.values.splice(i, 1);
                                }
                            }
                            var niz = izdvojiStudente(JSON.parse(ajax.responseText).values);
                            console.log(niz);
                            callback(null, niz);
                            
                        }
                        else if (ajax.readyState == 4)
                            console.log(ajax.status);
                    }
                    var filter = '&q=name~"'+ nazivRepSpi +'"OR name~"' + nazivRepVje +'"';
                    if (nazivRepSpi == "" || nazivRepVje == "")
                    { 
                        filter = "";
                        callback("Naziv repozitorija i vjezbe ne moze biti prazan!", null);
                        
                    }
                    ajax.open("GET",'https://api.bitbucket.org/2.0/repositories?role=member' + filter); 
                    ajax.setRequestHeader("Authorization", 'Bearer ' + rezultat);
                    
                    ajax.send();
                }).catch(function(err){
                    callback(err.toString(), null);
                });
            }
        }
    }
    return konstruktor;
}());
/*var bb = new BitBucket("vNU6TrZBsPdUeTjBcA", "47GdGzkA7Gk8V3UcHy8Gw57xpQVfK4nK");
bb.ucitaj("RAprojekat","",function(content){
    console.log(content);
});*/