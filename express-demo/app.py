import webbrowser
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

message = MIMEMultipart()
message['from'] = "Travis Friday"
message["to"] = "travisgifriday@gmail.com"
message["subject"] = "This is a test"
message.attach(MIMEText("Body"))

with smtplib.SMTP(host="smtp.gmail.com", port=5897) as smpt:
    smpt.ehlo()
    smpt.starttls()
    smpt.login("tftest1234@gmail.com", "1234")
    smpt.send_message(message)
    print("Sent....")


print("Deployment Completed")
webbrowser.open("http://www.tfportfolio.com")
