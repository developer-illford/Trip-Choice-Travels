<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['mobile'];
    $whatsapp = $_POST['whatsapp'];
    $numMembers = $_POST['numMembers'];
    $travelDate = $_POST['travelDate'];
    $numDays = $_POST['numDays'];
    $destination = $_POST['destination'];
    $departureAirport = $_POST['departureAirport'];
    $message = $_POST['message'];

    $to = "takeofftraveldesigner@gmail.com, contact@tripchoicetravels.in "; // Change this to your email
    $subject = "New Custom Package Enquiry";
    $headers = "From: $email";

    $email_body = "You have received a new custom package enquiry:\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Mobile: $phone\n" .
        "WhatsApp: $whatsapp\n" .
        "Number of Members: $numMembers\n" .
        "Travel Date: $travelDate\n" .
        "Number of Days: $numDays\n" .
        "Destination: $destination\n" .
        "Departure Airport: $departureAirport\n" .
        "Message:\n$message";

    // mail() function to send the email to recipient
    if (mail($to, $subject, $email_body, $headers)) {
        // Send thank-you email to the responder
        $responder_subject = "Thank you for your Custom Package Enquiry!";
        $responder_message = "Dear $name,\n\nThank you for your $destination package enquiry. We have received your message and will get back to you shortly.\n\nBest regards,\nTeam Takeoff Travels";

        $responder_headers = "From: contact@tripchoicetravels.in"; // Change this to your sender email

        mail($email, $responder_subject, $responder_message, $responder_headers);

        // Display success message
        echo '<script>alert("Thank you for your custom package enquiry. We will get back to you shortly."); window.location.href = "https://tripchoicetravels.in/packages";</script>';
    } else {
        // Display error message
        echo '<script>alert("Oops! Something went wrong. Please try again later."); window.location.href = "https://tripchoicetravels.in/packages";</script>';
    }
}
?>
