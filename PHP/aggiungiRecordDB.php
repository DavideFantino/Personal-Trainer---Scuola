<?php
$dbName = "../programmaTrainer.sqlite3";

try {
    $db = new PDO("sqlite:$dbName");
} catch (PDOException $e) {
    echo $e->getMessage();
} finally {
    $livello = $_GET['livello'];
    $indice =  $_GET['indice'];
    $attivita = $_GET['attivita'];
    $descrizione = $_GET['descrizione'];
    $ripetizioni = $_GET['ripetizioni'];
    $durata =  $_GET['durata'] ;
    $riposo = $_GET['riposo'];
    $path = $_GET['path'];
    //$tipoMedia = filetype($path);
    $tipoMedia = "'ditoInCulo'";

    $QueryTmp = "INSERT INTO esercizi ('livello','indice','attivita','descrizione','ripetizioni','durata','riposo','tipoMedia','path')";
    $QueryTmp = $QueryTmp  .  " VALUES (" .  $livello . " , " .  $indice . "  , " . $attivita . " , " . $descrizione . " ,
    " .  $ripetizioni . " , " .  $durata . "  , " . $riposo . " , " . $tipoMedia . ' , ' . $path . ")";
    echo $QueryTmp."<br>";
    $db->exec('BEGIN');
    $db->exec($QueryTmp);
    $db->exec('COMMIT');
}

?>
