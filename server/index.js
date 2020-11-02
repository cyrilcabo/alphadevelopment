
//Allow .env variables
require('dotenv').config();

//Utils
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

//Cookies
const { setCookie } = require('./cookies/setcookie');

const { GraphQLServer} = require('graphql-yoga');
const { MongoClient} = require('mongodb');

//Nodemailer
const nodemailer = require('nodemailer');
//HTML content
const htmlEmail = require('./utils/mail_html.js');

//Import resolvers
const { Query } = require('./Graphql/Resolvers/query');
const { Mutation } = require('./Graphql/Resolvers/mutation');

//GraphQL schema
const typeDefs = require('./Graphql/Schema/index');

//Configure database
const client = new MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const database = () => {
	return new Promise(async (resolve) => {
		if (!client.isConnected()) await client.connect();
		const db = client.db('alphadevelopment');
		resolve(db)
	});
}

//Define resolvers
const resolvers = {
	Query,
	Mutation
}

//Nodemailer configuration
const sendmail = async (contact) => {
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
    to: contact,
    subject: "AlphaDevelopment Services",
    text: `Thank you for choosing Alpha Development! 

    	Let us further discuss your inquiries, by replying to this email. Currently, Alpha Development provides the following web development services: 
    		* designing your web pages 
    		* converting PSD Designs to HTML 
    		* developing your frontend application 
    		* designing your backend logic
    		* connecting your application to a database
    		* setting up your application on a server
    		* building a fullstack application without you having to worry about anything else!

    	We are looking forward to working with you! Cheers.


    	What is Alpha Development?
    	Alpha Development is a Tacloban-based web development company, and has started its journey since May 2020. Currently, it is a one-man company, but it has its eyes set on being the first established web development company in the region. Alpha Development's promise to its clients is to provide quality yet pocket-friendly products. Alpha Development products are fueled by customer's creative powers, as whatever you can imagine, Alpha Development will provide.
	`,
	html: htmlEmail,
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
server.express.use(express.static(path.join(__dirname, "build")));

server.express.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.start({
	endpoint: '/graphql',
}, () => console.log('Server running...'));
