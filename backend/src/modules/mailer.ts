import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const { 
  MAIL_HOST: host,
  MAIL_PORT: port,
  MAIL_USER: user,
  MAIL_PASS: pass
} = process.env;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
} as SMTPTransport.Options);

export default transport;