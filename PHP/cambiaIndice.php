<?php
    $dbName = "../programmaTrainer.sqlite3";

    $id = $_POST['id'];
    $value = $_POST['value'];

    try {
        $db = new PDO("sqlite:$dbName");
    } catch (PDOException $e) {
        echo "[ERRORE] ".$e->getMessage();
    } finally {
        //$db->exec('BEGIN');

        $query = "SELECT id, indice FROM esercizi WHERE id=$id";
        $result = queryToArray($db->query($query));
        echo json_encode($result);

        $indiceAttuale = $result[0]['indice'];

        $query = "UPDATE esercizi SET indice=($indiceAttuale) WHERE indice=($indiceAttuale+$value)";
        queryToArray($db->query($query));

        $query = "UPDATE esercizi SET indice=($indiceAttuale+$value) WHERE id=$id";
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
