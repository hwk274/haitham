<?php
$targetDir = "uploads/";
if(!is_dir($targetDir)){ mkdir($targetDir, 0777, true); }

if(isset($_FILES['photo'])){
    $targetFile = $targetDir . basename($_FILES['photo']['name']);
    if(move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)){
        header("Location: index.php");
        exit;
    } else {
        echo "حدث خطأ أثناء رفع الصورة.";
    }
}
?>
