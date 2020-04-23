<!DOCTYPE html>
<html lang="it" dir="ltr">
    <head>
        <?php @require "HTML_Components/head.html"; ?>
        <title>Programma Personal Trainer</title>
        <script type="text/javascript">
            var jsonResp;
            $.ajax({
                url: 'PHP/recuperaTabellaDB.php',
                type: 'post',
                success: function (data) {
                    jsonResp = JSON.parse(data);
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
                }
            });
        </script>
    </head>
    <body>
        <?php @require "HTML_Components/header.html"; ?>

        <div id="flexContainer">
            <div id="sceltaLivello">
                <label for="sceltalivello">Seleziona livello: </label>
                <select id="livello" name="livelloDiff">
                    <option value="Tutti" selected>Tutti</option>
                    <option value="Principiante" name="Principiante">Principiante</option>
                    <option value="Intermedio" name="Intermedio">Intermedio</option>
                    <option value="Avanzato" name="Avanzato">Avanzato</option>
                </select>
            </div>
            <!--<div class="exerciseCard" execiseId="0">
                <div class="img"></div>
                <p><span class="keyName">Livello</span><span class="value">Principiante</span></p>
                <p><span class="keyName">Indice</span><span class="value">0</span></p>
                <p><span class="keyName">Attivit&aacute;</span><span class="value">Flessioni</span></p>
                <p><span class="keyName">Ripetizioni</span><span class="value">10</span></p>
                <p><span class="keyName">Durata</span><span class="value">60s</span></p>
                <p><span class="keyName">Riposo</span><span class="value">30s</span></p>
                <p><span class="keyName">Descrizione</span><span class="value">Niente di chè, solo molto semplici flessioni</span></p>
            </div>-->
        </div>


    <?php @require "HTML_Components/footer.html"; ?>
    </body>
</html>
