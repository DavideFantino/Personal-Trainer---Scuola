<!DOCTYPE html>
<html lang="it" dir="ltr">
    <head>
        <?php
            @require "HTML_Components/head.php";
            //apc_cache_clear('user');
        ?>
        <title>Programma Personal Trainer</title>
    </head>
    <body>
        <?php @require "HTML_Components/header.html"; ?>

        <div id="flexContainer" class="center">
            <div id="sceltaLivello">
                <label for="sceltalivello">Seleziona livello: </label>
                <select id="livelloAllenamento" name="livelloDiff">
                    <option value="Tutti" selected>Tutti</option>
                    <option value="Principiante" name="Principiante">Principiante</option>
                    <option value="Intermedio" name="Intermedio">Intermedio</option>
                    <option value="Avanzato" name="Avanzato">Avanzato</option>
                </select>
              </div>
            <input type="button" id="btnInizia" value="INIZIA">


              <div id="clock" hidden>
                  <div class="analog">
                      <div id="lancetta"></div>
                  </div>
                  <div class="digital">
                      <div id="remSecs">3</div>
                  </div>
              </div>
        </div>


        <?php @require "HTML_Components/footer.html"; ?>
    </body>
</html>
