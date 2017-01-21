var index_cookie = 0;
var nbr_cookie;
var nameCookie = 'listDiv';

function listdivtmp() {
    var myNodelist = document.getElementsByClassName('todo_txt');
    //var myNodelist = document.getElementsByTagName('p');
    var i = 0;
    for (i = 0; i < myNodelist.length; i++) {
    	console.log(i);
        myNodelist[i].style.backgroundColor = "red";
    }
}
listdivtmp();

function setCookie(cookieindex, cookiemsg, nbrdays) {
    document.cookie = nameCookie;
    var d = new Date();
    d.setTime(d.getTime() + (nbrdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieindex + "=" + cookiemsg + ";" + expires + ";path=/";
}

function readCookie(cookieindex) {
    var tag = cookieindex + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(tag.length, c.length);
        }
    }
    return "";
}

function readCookies() {
    document.cookie = nameCookie;
    var cookies = document.cookie;
        console.log(cookies);
        cookies = document.cookie.split('; ');

        //console.log(cookies);
    return cookies;
}

function isCookies() { 
    //var listDiv = 
    tabCookies = readCookies();
        console.log(tabCookies);
    if (!tabCookies) // listvide
    {
	   	var element = document.getElementById("infolist");
		element.innerHTML = "Liste vide";
        index_cookie = 1;
    } 
    else 
    {
        var listDiv = readCookies();
        //w = 1;
        //index_cookie = 0;
        //tab_cookies = new Array();
        //tab_cookies = document.cookie.split('; ');
        var nb_cookiesvalide = 0;
        for(i = 1; i < listDiv.length; i++)
        {
            index_cookie++;
            nb_cookiesvalide++;
            console.log("i="+i);
            if (tabCookies[i]) create_div(tabCookies[i].substr(tabCookies[i].indexOf("=")+1)); //create_div(tabCookies[i].substr(tabCookies[i].indexOf("="))); //console.log(create_div(tabCookies[i].substr(tabCookies[i].indexOf("="))));
        }
        if (nb_cookiesvalide == 0 )
        {//console.log(tab_cookies);}
            index_cookie = 2;
            var element = document.getElementById("infolist");
            element.innerHTML = "Liste vide";
        }
        else
        {
            var element = document.getElementById("infolist");
            element.innerHTML = nb_cookiesvalide + " Todo en cours";

        }
    }

}
//setCookie("username", username, 365);
function delCookie(id){
    var dtExpireDel = new Date();
    dtExpireDel.setTime(dtExpireDel.getTime() - 1);
    setCookie(id, '', dtExpireDel, '/');
    alert('id'+id);
    isCookies();
}

function myFunction() {
    if (confirm("Confimer la suppression!") == true)
        console.log('suppression')
    else
        console.log('annule suppression')
}

function create_div(msg){
    console.log('msg = '+msg);
    var node = document.getElementById("ft_list").firstChild;
    var myTodo = document.getElementById('ft_list');
    var new_eltDiv = document.createElement('div');
    new_eltDiv.setAttribute('id', ++index_cookie);
    var new_eltP = document.createElement('p');
    new_eltP.setAttribute('style', 'background-Color: powderblue');
    new_eltP.setAttribute('onclick', 'delCookie('+index_cookie+')');
    new_eltP.setAttribute('id', index_cookie);
    new_eltP_txt = document.createTextNode(msg);
    new_eltP.appendChild(new_eltP_txt);
    new_eltDiv.appendChild(new_eltP);
    myTodo.appendChild(new_eltDiv);
    myTodo.insertBefore(new_eltDiv, node)
}

function newdiv() {
    var saisie = document.getElementById('saisie');
    if (saisie.value == '')
    {
        var element = document.getElementById("infolist");
        element.innerHTML = "Aucun todo en cours";
    }
    else
    create_div(saisie.value);   
    setCookie(index_cookie, saisie.value, 1);
    var element = document.getElementById("infolist");
    element.innerHTML = index_cookie + " Todo en cours";
 }

