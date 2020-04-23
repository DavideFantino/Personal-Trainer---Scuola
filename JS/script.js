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
                livelloDiff: this.value.toLowerCase()
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


})

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
