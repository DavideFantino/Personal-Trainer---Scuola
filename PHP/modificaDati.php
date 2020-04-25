<?php
    $dbName = "../DB/programmaTrainer.sqlite3";

    $id=$_POST['$id'];
    $attivita = $_POST['$attivita'];
    $livello = $_POST['$livello'];
    $ripetizioni = $_POST['$ripetizioni'];
    $durata = $_POST['$durata'];
    $riposo = $_POST['$riposo'];
    $descrizione = $_POST['$descrizione'];

    try {
        $db = new PDO("sqlite:$dbName");
    } catch (PDOException $e) {
        echo "[ERRORE] ".$e->getMessage();
    } finally {
        //$db->exec('BEGIN');

        /*$query = "SELECT id, indice FROM esercizi WHERE id=$id";
        $result = queryToArray($db->query($query));
        echo json_encode($result);

        $indiceAttuale = $result[0]['indice'];*/

        /*$query = "UPDATE esercizi SET indice=($indiceAttuale) WHERE indice=($indiceAttuale+$value)";
        queryToArray($db->query($query));*/

        $query = "UPDATE esercizi SET (attivita='$attivita',livello='$livello',ripetizioni='$ripetizioni',durata='$durata',riposo='$riposo',descrizione='$descrizione') WHERE id=$id";


        $db->query($query);

        $db->exec('COMMIT');
        //echo json_encode($_POST);
    }

    function queryToArray($arrayElms){
        $result = $arrayElms;
        $rows = array();
        foreach($result as $row) {
            $rows[] = $row;
        }
        return $rows;
    }

?>
