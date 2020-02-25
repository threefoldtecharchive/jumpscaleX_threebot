import smtplib

from email import encoders
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase

from Jumpscale import j


class simplemail(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.email_model = j.threebot.packages.threefold.simplemail.bcdb.model_get(url="threefold.simplemail.email.1")

    @j.baseclasses.actor_method
    def search(
        self,
        email_from=None,
        email_to=None,
        subject=None,
        body=None,
        htmlbody=None,
        date=None,
        schema_out=None,
        user_session=None,
    ):
        """
        search with anything from mail, or to, or with part of the body of mail, or part of the date

        ```in
        email_from = ""(S)
        email_to = ""(S)
        subject = ""(S)
        body = ""(S)
        htmlbody = ""(S)
        date = (S)
        ```
        ```out
        res = (LO)!threefold.simplemail.email.1
        ```
        """
        results = []
        table = self.email_model._index_.sql_table_name

        query = f'SELECT * FROM {table} \
            WHERE (email_from LIKE "%{email_from}%") \
            AND (email_to LIKE "%{email_to}%") \
            AND (subject LIKE "%{subject}%") \
            AND (body LIKE "%{body}%") \
            AND (htmlbody LIKE "%{htmlbody}%") \
            AND (date LIKE "%{date}%")'

        query_command = self.email_model.query(query)
        query_results = query_command.fetchall()
        for item in query_results:
            item_model = self.email_model.find(id=item[0])[0]
            results.append(item_model)
        return results

    @j.baseclasses.actor_method
    def search_json(
        self,
        email_from=None,
        email_to=None,
        subject=None,
        body=None,
        htmlbody=None,
        date=None,
        schema_out=None,
        user_session=None,
    ):
        """
        search with anything from mail, or to, or with part of the body of mail, or part of the date

        ```in
        email_from = ""(S)
        email_to = ""(S)
        subject = ""(S)
        body = ""(S)
        htmlbody = ""(S)
        date = (S)
        ```
        """
        results = []
        table = self.email_model._index_.sql_table_name

        query = f'SELECT * FROM {table} \
                    WHERE (email_from LIKE "%{email_from}%") \
                    AND (email_to LIKE "%{email_to}%") \
                    AND (subject LIKE "%{subject}%") \
                    AND (body LIKE "%{body}%") \
                    AND (htmlbody LIKE "%{htmlbody}%") \
                    AND (date LIKE "%{date}%")'

        query_command = self.email_model.query(query)
        query_results = query_command.fetchall()
        for item in query_results:
            item_model = self.email_model.find(id=item[0])[0]
            results.append(item_model._ddict)
        return j.data.serializers.json.dumps(results)

    @j.baseclasses.actor_method
    def list(self, schema_out=None, user_session=None):
        """
        ```out
        res = (LO)!threefold.simplemail.email.1
        ```
        """
        all_mails = self.email_model.find()
        return all_mails

    @j.baseclasses.actor_method
    def list_json(self, schema_out=None, user_session=None):
        result = []
        all_mails = self.list()
        for item in all_mails:
            result.append(item._ddict)
        return j.data.serializers.json.dumps(result)

    @j.baseclasses.actor_method
    def save_mail(
        self,
        email_from=None,
        email_to=None,
        subject=None,
        attachments=None,
        body=None,
        htmlbody=None,
        date=None,
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        email_from = ""(S)
        email_to = ""(S)
        subject = ""(S)
        attachments = (LS)
        body = ""(S)
        htmlbody = ""(S)
        date = (S)
        ```
        """
        new_mail = self.email_model.new()
        new_mail.email_from = email_from
        new_mail.email_to = email_to
        new_mail.subject = subject
        new_mail.body = body
        new_mail.attachments = attachments
        new_mail.htmlbody = htmlbody
        new_mail.date = date
        new_mail.save()
        self._log_info("Mail saved successfully!")

    @j.baseclasses.actor_method
    def send_mail(
        self,
        server_address=None,
        server_port=25,
        email_from=None,
        email_to=None,
        subject=None,
        body=None,
        html_body=None,
        attachment_paths=None,
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        server_address="" (S)
        server_port=25 (ipport)
        email_from = "" (S)
        email_to = "" (S)
        subject = "" (S)
        body = "" (S)
        html_body = "" (S)
        attachment_paths = (LS)
        ```
        """
        if not server_address:
            raise j.exceptions.Input("Please pass the server ip / domain name to sent the mail to")

        msg = MIMEMultipart()

        msg["From"] = email_from
        msg["To"] = email_to
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))
        if html_body:
            msg.attach(MIMEText(html_body, "html"))

        # Attach files
        # open file in binary mode
        for filename in attachment_paths:
            with open(filename, "rb") as attachment:
                # Add file as application/octet-stream
                # Email client can usually download this automatically as attachment
                part = MIMEBase("application", "octet-stream")
                part.set_payload(attachment.read())

            # Encode file in ASCII characters to send by email
            encoders.encode_base64(part)

            # Add header as key/value pair to attachment part
            part.add_header("Content-Disposition", f"attachment; filename= {filename}")

            # Add attachment to message and convert message to string
            msg.attach(part)

        server = smtplib.SMTP(f"{server_address}:{server_port}")
        server.sendmail(msg["From"], msg["To"], msg.as_string())
        server.quit()
