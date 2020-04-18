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
})

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
