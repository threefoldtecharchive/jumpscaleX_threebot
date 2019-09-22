from Jumpscale import j
import smtpd
from .gsmtpd import SMTPServer
from .handleMail import parse_email_body


class MailServer(SMTPServer):
    # Do something with the gathered message
    def process_message(self, peer, mailfrom, rcpttos, data):
        self.store_mail(data)
        print("------------ Data saved In bcdb ------------")

    def store_mail(self, data):
        result = parse_email_body(data)
        print("data")
        print(data)

        print("..................................")
        print("The result")
        print(result)
        print("..................................")
        smtpInstance = j.data.bcdb.get("mails")
        mail_model = smtpInstance.model_get(url="jumpscale.email.message")
        mail = mail_model.new()
        mail.name = result["name"]
        mail.from_email = result["from"]
        mail.to_email = result["to"]
        mail.subject = result["subject"]
        mail.body = result["body"]
        mail.htmlbody = result["htmlbody"]
        mail.headers = result["headers"]
        mail.attachments = result["attachments"]
        mail.save()

