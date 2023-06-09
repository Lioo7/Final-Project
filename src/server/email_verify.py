from email_validator import validate_email, EmailNotValidError
from email.mime.text import MIMEText
import smtplib
import os

class email_verify:
    

    def is_valid_email(email):
        try:
            v = validate_email(email)
            return v.is_valid
        except EmailNotValidError:
            return False
        

def send_verification_email(email, verification_code):
    
    sender_email = os.environ.get('email_name')  # המייל שלך
    receiver_email = email  # כתובת המייל של המשתמש
    subject = "email_verify"
    message = f'Hello \n This is your verification code:  {verification_code}'

    msg = MIMEText(message, 'plain', 'utf-8')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email
    with smtplib.SMTP('smtp.example.com', 25) as server:
        server.starttls()
        server.login(sender_email, os.environ.get('email_password')) 
        server.sendmail(sender_email, receiver_email, msg.as_string())
        print("here2")

    print("here3")
        

send_verification_email('ofirrr999@gmail.com',"12345")