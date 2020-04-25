var addRecordTr;
var lastId;

$(document).ready(function(){
    addRecordTr = $(".listContainer table tr").last();
    lastId = $("tr").length-2;

    $("#addRecordBtn").click(function(){
        if(!this.disabled){
            if(addRecordTr[0].offsetHeight == 0){
                $(this).addClass("cross");
                //addRecordTr.find("td").css("display","table-cell");
                addRecordTr.find("td").each(function(){
                    $(this).css("height","28px");
                    $(this).find("input").val("");
                });
                $("#inputId").val((lastId+1).toString());
            }else{
                $(this).removeClass("cross");
                $(this).removeClass("check");

                addRecordTr.find("td").each(function(){
                    $(this).css("height","0px");
                });
                /*setTimeout(function(){
                    //addRecordTr.css("display","none")
                    addRecordTr.find("td").css("display","none")
                },150)*/

                canSend = true;
                $(addRecordTr).find("input").each(function(){
                    if($(this).val()=="")
                    canSend = false;
                })
                if(canSend){
                    console.log("sending data")
                    lastId++;
                    var xhttp = new XMLHttpRequest();
                    var dati =  "?livello='"+document.getElementById("inputLivello").value
                    +"'&indice='"+document.getElementById("inputId").value
                    +"'&attivita='"+document.getElementById("inputAttivita").value
                    +"'&ripetizioni='"+document.getElementById("inputRipetiz").value
                    +"'&durata='"+document.getElementById("inputDurata").value
                    +"'&riposo='"+document.getElementById("inputRiposo").value
                    +"'&descrizione='"+document.getElementById("inputDesc").value
                    +"'&path='"+document.getElementById("inputFile").value+"'";
                    xhttp.open("GET", "PHP/aggiungiRecordDB.php"+dati, true);
                    xhttp.send();

                    location.reload();
                }
            }
        }
    });

    $(addRecordTr).find("input").change(function(){
        canSend = true;
        $(addRecordTr).find("input").each(function(){
            if($(this).val()=="")
            canSend = false;
        })
        if(canSend){
            $("#addRecordBtn").addClass("check");
        }else{
            $("#addRecordBtn").removeClass("check");
        }
    })

    $("#livello").change(function(){
        $.ajax({
            url: 'PHP/recuperaTabellaDB.php',
            type: 'get',
            data: {
                livelloDiff: this.value.toLowerCase(),
                sort: true
            },
            dataType: 'JSON',
            success: function (data) {
                $(".exerciseCard").remove();

                jsonResp = data;
                for(var ex of jsonResp){
                    var exerciseCard = document.createElement("div");
                    var buttonLeft = document.createElement("button");
                    var buttonRight = document.createElement("button");

                    exerciseCard.setAttribute("exerciseId",ex.id);
                    exerciseCard.classList.add("exerciseCard");
                    exerciseCard.innerHTML += "<div class=\"img\"></div>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Attivit&aacute;</span><span class=\"value\">" + toUpperFirstChar(ex.attivita) + "</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Livello</span><span class=\"value\">" + toUpperFirstChar(ex.livello) + "</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Indice</span><span class=\"value\">" + ex.indice + "</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Ripetizioni</span><span class=\"value\">" + ex.ripetizioni + "</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Durata</span><span class=\"value\">" + ex.durata + " s</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Riposo</span><span class=\"value\">" + ex.riposo + " s</span></p>";
                    exerciseCard.innerHTML += "<p><span class=\"keyName\">Descrizione</span><span class=\"value\">" + toUpperFirstChar(ex.descrizione) + "</span></p>";

                    buttonLeft.value = -1;
                    buttonRight.value = 1;
                    buttonLeft.classList.add("btnIndice");
                    buttonLeft.classList.add("left");
                    buttonRight.classList.add("btnIndice");
                    buttonRight.classList.add("right");

                    exerciseCard.appendChild(buttonLeft);
                    exerciseCard.appendChild(buttonRight);
                    $("#flexContainer")[0].appendChild(exerciseCard);
                }

                $(".btnIndice").click(function(){
                    btnIndiceClick(this);
                })
            }
        });
    })

    $(".btnIndice").click(function(){
        btnIndiceClick(this);
    })

    /*$("#modificaDati").click(function(){

      var form1 = document.createElement("form");
      var attivita = document.createElement("textbox");
      var livello = document.createElement("textbox");
      var ripetizioni = document.createElement("textbox");
      var durata = document.createElement("textbox");
      var riposo = document.createElement("textbox");
      var descrizione = document.createElement("textbox");

      var salvaDati = document.createElement("button");
      salvaDati.setAttribute("id","salvaDati");

    });*/

    /*$("#salvaDati").click(function(){
        var elenco;
        $.ajax({
            url: 'PHP/modificaDati.php',
            type: 'POST',
            data: {
                livelloDiff: $("#livelloAllenamento").val().toLowerCase(),


            },
            dataType: 'JSON',
            success: function (data) {
                elenco = data;

                var esIndice = 0;

                //esercizio(elenco, esIndice);

            }
        });
    })*/

    $("#livelloAllenamento").change(function(){
        $.ajax({
            url: 'PHP/recuperaTabellaDB.php',
            type: 'get',
            data: {
                livelloDiff: this.value.toLowerCase(),
                sort: true
            },
            dataType: 'JSON',
            success: function (data) {

            }
        });
    })

    $("#btnInizia").click(function(){
        var elenco;
        $.ajax({
            url: 'PHP/recuperaTabellaDB.php',
            type: 'get',
            data: {
                livelloDiff: $("#livelloAllenamento").val().toLowerCase(),
                sort: true
            },
            dataType: 'JSON',
            success: function (data) {
                elenco = data;

                var esIndice = 0;

                esercizio(elenco, esIndice);

            }
        });
    })

})

function esercizio(elenco, indice){
    var attesa = 0;
    var durataEs = parseInt(elenco[indice].durata);
    var riposoEs = parseInt(elenco[indice].riposo);

    console.log("Id: " + elenco[indice].id + "\nIndice: " + elenco[indice].indice + "\nAttività: " + elenco[indice].attivita);

    setTimeout(function(){
        attesa = durataEs;
        $("#remSecs").html(durataEs);

        var exit = false;
        var intervalTime = 0;
        var int = setInterval(function(){
            intervalTime += 10;

            if(!exit){
                $("#clock .analog #lancetta").css("transform","rotate(" + ((intervalTime*180)/(attesa*1000)) + "deg)");
            }else {
                $("#clock .analog #lancetta").css("transform","rotate(" + (180-((intervalTime*180)/(attesa*1000))) + "deg)");
            }

            if(intervalTime%1000 == 0){
                var sec = parseInt($("#remSecs").html()) - 1;
                $("#remSecs").html(sec);
                if(sec == 0){
                    if(exit){
                        if(indice < elenco.length-1){
                            esercizio(elenco, ++indice);
                        }
                        clearInterval(int);
                    }else{
                        attesa = riposoEs;
                        intervalTime = 0;
                        //$("#clock .analog #lancetta").css("animation","clockAnim " + riposoEs + "s reverse infinite linear");
                        $("#remSecs").html(riposoEs);
                        exit = true;
                    }
                }
            }
        },10);
    },attesa)
}

function btnIndiceClick(sender){
    $.ajax({
        url: 'PHP/cambiaIndice.php',
        type: 'post',
        data: {
            id: sender.parentNode.getAttribute("exerciseId"),
            value: sender.value
        },
        dataType: 'JSON',
        success: function (data) {
            //console.log(data);
            $("#livello").trigger("change");
        }
    });
}

function loadTable(jsonResp){
    for(var ex of jsonResp){
        var tr = document.createElement("tr");
        tr.innerHTML += "<td>" + ex.id + "</td>";
        tr.innerHTML += "<td>" + toUpperFirstChar(ex.attivita) + "</td>";
        tr.innerHTML += "<td>" + toUpperFirstChar(ex.livello) + "</td>";
        tr.innerHTML += "<td>" + ex.ripetizioni + "</td>";
        //tr.innerHTML += "<td>" + ex.indice + "</td>";
        tr.innerHTML += "<td>" + ex.durata + " s</td>";
        tr.innerHTML += "<td>" + ex.riposo + " s</td>";
        tr.innerHTML += "<td>" + toUpperFirstChar(ex.descrizione) + "</td>";
        tr.innerHTML += "<td>" + ex.path + "</td>";
        $("tbody")[0].insertBefore(tr,$("tr").last()[0]);
    }
}
function toUpperFirstChar(string) {
    var x = string.charAt(0).toUpperCase() + string.slice(1);
    return x;
}
function getTableJSON(autoLoad = true){
    var jsonResp;
    $.ajax({
        url: 'PHP/recuperaTabellaDB.php',
        type: 'post',
        async: autoLoad,
        success: function (data) {
            jsonResp = JSON.parse(data);
            if(autoLoad){
                loadTable(jsonResp);
            }
        }
    });
    return jsonResp;
};
