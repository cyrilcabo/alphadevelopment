
//Allow .env variables
require('dotenv').config();

//Utils
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

//Cookies
const { setCookie } = require('./cookies/setcookie');

const { GraphQLServer} = require('graphql-yoga');

//Nodemailer
const nodemailer = require('nodemailer');
//HTML content
const htmlEmail = require('./utils/mail_html.js');
//Text content
const textEmail = require('./utils/mail_text.js');

//Import resolvers
const { Query } = require('./Graphql/Resolvers/Query/index');
const { Mutation } = require('./Graphql/Resolvers/Mutation/index');

//GraphQL schema
const typeDefs = require('./Graphql/Schema/index');

//Configure database
const database = require('./database/index');

//Custom endpoints
const admin = require('./rest/admin');

//Define resolvers
const resolvers = {
	Query,
	Mutation
}

//Nodemailer configuration
const sendmail = async (contact, type, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: [contact, process.env.GMAIL_USER],
    subject: type===1 ?"AlphaDevelopment Services" :`AlphaDevelopment Contact: ${subject}`,
    text: type===1 ?textEmail :message,
  	html: type===1 ?htmlEmail :"",
  });

  return info;
}

//Initialize server
const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: request => ({
		...request,
		db: database(),
		send: sendmail,
	})
});

server.express.use(cookieParser(process.env.COOKIE_SECRET));
server.express.use((req, res, next) => setCookie(req, res, next));
server.express.use(express.static(path.join(__dirname, "build"), {maxAge: '7d'}));

server.express.use('/admin', admin);

server.express.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.start({
	endpoint: '/graphql',
}, () => console.log('Server running...'));
