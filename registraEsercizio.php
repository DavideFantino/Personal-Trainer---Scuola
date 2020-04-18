<!DOCTYPE html>
<html lang="it" dir="ltr">
    <head>
        <?php @require "HTML_Components/head.html"; ?>
        <title>Programma Personal Trainer</title>
        <script type="text/javascript">
            getTableJSON();
        </script>
    </head>
    <body>
        <?php @require "HTML_Components/header.html"; ?>

        <div id="flexContainer" class="center">
            <div class="listContainer">
                <table>
                    <tbody>
                        <tr nodelete>
                            <th>ID</th>
                            <th>Attivit&aacute;</th>
                            <th>Livello</th>
                            <th>Ripetizioni</th>
                            <th>Durata</th>
                            <th>Riposo</th>
                            <th>Descrizione</th>
                            <th>Media Path</th>
                        </tr>

                        <tr nodelete>
                            <td><input type="number" placeholder="ID" id="inputId" readonly></td>
                            <td><input type="text" placeholder="Attivit&aacute;" id="inputAttivita"></td>
                            <td>
                                <select id="inputLivello">
                                    <option value="principiante">Principiante</option>
                                    <option value="intermedio">Intermedio</option>
                                    <option value="avanzato">Avanzato</option>
                                </select>
                            </td>
                            <td><input type="number" placeholder="Ripetizioni" id="inputRipetiz" min="0"></td>
                            <td><input type="number" placeholder="Durata" id="inputDurata" min="0"></td>
                            <td><input type="number" placeholder="Riposo" id="inputRiposo" min="0"></td>
                            <td><input type="text" placeholder="Descrizione" id="inputDesc"></td>
                            <td><input type="file" placeholder="File" id="inputFile"></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" id="addRecordBtn"></button>
            </div>
        </div>

        <?php @require "HTML_Components/footer.html"; ?>
    </body>
</html>
