var URLArray = [];
var contactArray = [];
var loadingContact = 0;
currentContactIndex = 0;

function viewCurrentContact(){
    currentContact = contactArray[currentContactIndex];
    document.getElementById("nameID").value = currentContact.preferredName;
    document.getElementById("lastNameID").value = currentContact.lastName;
    document.getElementById("cityID").value = currentContact.city;
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;
    document.getElementById("emailID").value = currentContact.email;

    
    document.getElementById("statusID").innerHTML = "Viewing Contact " + (currentContactIndex+1) + " of " + contactArray.length;

}

function previous(){

    if (currentContactIndex > 0){
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

}

function next(){

    if (currentContactIndex < (contactArray.length-1)){
        currentContactIndex++;
    }

    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();


}

function add(){
    console.log('add()');
    contactArray.push();
}

function remove(){
    console.log('remove()');
    contactArray.pop();
}

function getPlace(){
    var zip = document.getElementById("zipID").value
    console.log("zip:"+zip);

    console.log("function getPlace(zip) {...}");
    var swb = new XMLHttpRequest();


    krd.onreadystatechange = function () {
        if (swb.readyState == 4 && krd.status == 200){
            var result = swb.responseText;
            console.log("result:" + result)
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value == place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value == place[1];
        
    }

}
            swb.open("GET", "getCityState.php?zip=" + zip);
            swb.send(null);

}

function initApplication(){
    alert("Mustang v2 starting")
    console.log('Mustang v2 starting')
    loadIndex();
    loadContacts();
    


}

function loadIndex(){
    var indexSummon = new XMLHttpRequest();
    indexSummon.open('GET','https://mustang-index.azurewebsites.net/index.json');
    indexSummon.onload = function() {
        console.log("Index JSON: " + indexSummon.responseText);
        document.getElementById("indexID").innerHTML = indexSummon.responseText;
        contactIndex = JSON.parse(indexSummon.responseText);
        URLArray.length = 0;
        for (i=0; i < contactIndex.length; i++){
            URLArray.push(contactIndex[i].ContactURL);
        }
        console.log("Contact URL: "+ JSON.stringify(URLArray))
    }

indexSummon.send();
}

function loadContacts(){
    contactArray.length = 0;
    loadingContact = 0;


if (URLArray.length >= loadingContact){
    loadNextContact(URLArray[loadingContact]);
}

    
}

function loadNextContact(URL){
    console.log("URL: " + URL);
    contactSummon = new XMLHttpRequest();
    contactSummon.open('GET', URL);
    contactSummon.onload = function(){
        console.log(contactSummon.responseText);
        var contact;
        contact = JSON.parse(contactSummon.responseText);
        console.log("Contact: "+ contact.firstName);
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        loadingContact++;
        if (URLArray.length> loadingContact){
            loadNextContact(URLArray[loadingContact]);
        }
    }
    
contactSummon.send();
    
}

function logContacts(){
    console.log(contactArray);
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
     
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
   
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  
  var cities = ["Addison, IL", "Algonquin, IL", "Bartlett, IL","Bellwood, IL","Bensenville, IL", "Ericville, IL", "Streamwood, IL","Bloomingdale, IL","Burlington, IL","Carpentersville, IL","Clare, IL","Cortland, IL","Creston, IL","Dekalb, IL","Bloomingdale, IL","Dundee, IL","Elburn, IL","Elgin, IL","Elmhurst, IL","Esmond, IL","Forest Park, IL","Franklin Park, IL","Hanover Park, IL","Geneva, IL","Genoa, IL","Gilberts, IL","Glen Ellyn, IL","Glendale Heights, IL","Hampshire, IL","Hines, IL","Huntley, IL","Itasca, IL","Kaneville, IL","Kingston, IL","Kirkland, IL","Lafox, IL","Lombard, IL","Malta, IL","Maple Park, IL","Marengo, IL","Maywood, IL","Westchester, IL","Broadview, IL","Lake In The Hills, IL","Medinah, IL","Schaumburg, IL","Melrose Park, IL", "Hillside, IL","Berkeley, IL","Stone Park, IL","Plato Center, IL","River Grove, IL","Roselle, IL","Schiller Park, IL","Saint Charles, IL","South Elgin, IL","Sycamore, IL","Hoffman Estates, IL", "Union, IL","Villa Park, IL","Virgil, IL","Wasco, IL","Wayne, IL","West Chicago, IL","Wheaton, IL","Carol Stream, IL","Winfield, IL","Wood Dale, IL",]
  var zip = ["60101","60102","60103","60104","60105","60106","60107","60108","60109","60110","60111","60112","60113","60114","60115","60116","60117","60118","60119","60120","60121","60122","60123","60124","60125","60126","60127","60128","60129","60130","60131","60132","60133","60134","60135","60136","60137","60138","60139","60140","60141","60142","60143","60144","60145","60146","60147","60148","60149","60150","60151","60152","60153","60154","60155","60156","60157","60158","60159","60160","60161","60162","60163","60164","60165","60166","60167","60168","60169","60170","60171","60172","60173","60174","60175","60176","60177","60178","60179","60180","60181","60182","60183","60184","60185","60186","60187","60188","60189","60190","60191","60192","60193","60194","60195","60196","60197","60198","60199"]
  autocomplete(document.getElementById("myInput"), cities);
  autocomplete(document.getElementById("myZip"), zip);