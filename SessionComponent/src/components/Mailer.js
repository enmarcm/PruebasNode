import nodemailer from "nodemailer";

const Hosts = {
  gmail: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  },
  outlook: {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
  },
};

class Mailer {
  constructor({ config }) {
    this.host = config.host.toLowerCase();
    this.user = config.user.toLowerCase();
    this.password = config.password;

    this.mailHost = Hosts[this.host].host;
    this.port = Hosts[this.host].port;
    this.secure = Hosts[this.host].secure;

    try {
      this.transporter = nodemailer.createTransport({
        host: this.mailHost,
        port: this.port,
        secure: this.secure,
        auth: {
          user: this.user,
          pass: this.password,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
    } catch (error) {
      console.error(error);
      this.transporter = null;
    }
  }

  sendMail = async ({ to, subject, text }) => {
    try {
      const result = await this.transporter.sendMail({
        from: this.user,
        to,
        subject,
        text,
      });

      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default Mailer;
