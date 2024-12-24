<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['mobile']; // Changed to 'mobile' as per HTML input name
    $package = $_POST['package'];  // Added category
    $message = $_POST['message'];

    $to = "contact@tripchoicetravels.in ,takeofftraveldesigner@gmail.com";
    $subject = "New Enquiry for  $package package"; // Added category to subject
    $headers = "From: $email";

    $email_body = "You have received a new message from:\n\n" .
        "Full Name: $name\n" .
        "Email address: $email\n" .
        "Mobile Number: $phone\n" .
        "Package: $package\n" .  // Added category
        "Message:\n$message";

    // mail() function to send the email
    if (mail($to, $subject, $email_body, $headers)) {
        // Send thank-you email to the responder
        $responder_subject = "Thank you for contacting us!";
        $responder_message = "Dear $name,\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nTeam Takeoff Travels";

        $responder_headers = "From: contact@tripchoicetravels.in   "; // Change this to your sender email

        mail($email, $responder_subject, $responder_message, $responder_headers);

        // Display success popup using JavaScript
        echo '<script>alert("Thank you for your message. We will get back to you shortly."); window.location.href = "https://tripchoicetravels.in/contact";</script>';

    } else {
        // Redirect to index page and display error alert
        echo '<script>alert("Oops! Something went wrong. Please try again later."); window.location.href = "https://tripchoicetravels.in/contact";</script>';
    }
}
?>
