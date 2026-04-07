<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $pickup = $_POST['pickup'];
    $destination = $_POST['destination'];
    $package = $_POST['package'];
    $date = $_POST['date'];

    // Send email
    $to = "babanmmayasmine@gmail.com";
    $subject = "New Shipment Request from $name";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nPickup: $pickup\nDestination: $destination\nPackage: $package\nDate: $date";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you! Your shipment request has been submitted.";
    } else {
        echo "Sorry, there was an error submitting your request.";
    }
}
?>