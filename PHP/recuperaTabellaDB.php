<?php
    $filtro = "";

    if(isset($_GET['livelloDiff']))
        $filtro = $_GET['livelloDiff'];

    $query = "SELECT * FROM esercizi";
    if($filtro != "" && $filtro != "tutti"){
        $query .= " WHERE livello = '$filtro'";
    }
    if(isset($_GET['sort']))
        $query .= " ORDER BY indice ASC";

    $dbName = "../DB/programmaTrainer.sqlite3";

    $db;
    try {
        $db = new PDO("sqlite:$dbName");
    } catch (PDOException $e) {
        echo "[Errore] Connessione al DB fallita";
    }finally{
        $db->exec('BEGIN');

        $result = $db->query($query);

        $rows = array();
        foreach($result as $row) {
            $rows[] = $row;
        }
        echo json_encode($rows);

        /*foreach($result as $row) {
            echo "<div class=\"exerciseCard\" exerciseId=\"" . $row['id'] . "\">";
            echo "<div class=\"img\"></div>";
            echo "<p><span class=\"keyName\">Attivit&aacute;</span><span class=\"value\">" . $row['id'] . "</span></p>";
            echo "<p><span class=\"keyName\">Livello</span><span class=\"value\">" . $row['livello'] . "</span></p>";
            echo "<p><span class=\"keyName\">Indice</span><span class=\"value\">" . $row['indice'] . "</span></p>";
            echo "<p><span class=\"keyName\">Ripetizioni</span><span class=\"value\">" . $row['ripetizioni'] . "</span></p>";
            echo "<p><span class=\"keyName\">Durata</span><span class=\"value\">" . $row['durata'] . "</span></p>";
            echo "<p><span class=\"keyName\">Riposo</span><span class=\"value\">" . $row['riposo'] . "</span></p>";
            echo "<p><span class=\"keyName\">Descrizione</span><span class=\"value\">" . $row['descrizione'] . "</span></p>";
            echo "</div>";
        }*/

        $db->exec('COMMIT');

        $db = null;
    }

?>
