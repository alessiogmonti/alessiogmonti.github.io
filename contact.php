<?php

if($_POST) {
    $name = "";
    $email = "";
    $services = "";
    $subject = "";
    $email_body = "<div>";

    if(isset($_POST['name'])) {
        $name = filter_var($_POST['visitor_name'], FILTER_SANITIZE_STRING);
        $email_body .= "<div>
                           <label><b>Visitor Name:</b></label>&nbsp;<span>".$name."</span>
                        </div>";
    }

    if(isset($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $email_body .= "<div>
                           <label><b>Visitor Email:</b></label>&nbsp;<span>".$email."</span>
                        </div>";
    }

    if(isset($_POST['services'])) {
        $services = filter_var($_POST['services'], FILTER_SANITIZE_STRING);
        $email_body .= "<div>
                           <label><b>Service:</b></label>&nbsp;<span>".$services."</span>
                        </div>";
    }

    if(isset($_POST['subject'])) {
        $subject = htmlspecialchars($_POST['subject']);
        $email_body .= "<div>
                           <label><b>Subject:</b></label>
                           <div>".$subject."</div>
                        </div>";
    }

    $recipient = "alessiomonti97@gmail.com";

    $email_body .= "</div>";

    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $email . "\r\n";

    if(mail($recipient, $email_body, $headers)) {
        echo "<p>Thank you for contacting us, $name. Please expect a reply at our the earliest possible convenience.</p>";
    } else {
        echo '<p>The email did not go through- please try again or reach out via instagram.</p>';
    }

} else {
    echo '<p>Something went wrong</p>';
}
?>
