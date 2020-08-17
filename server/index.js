
//Allow .env variables
require('dotenv').config();

//Utils
const path = require('path');
const express = require('express');

const { GraphQLServer} = require('graphql-yoga');
const { MongoClient} = require('mongodb');

//Nodemailer
const nodemailer = require('nodemailer');

//Import resolvers
const { Query } = require('./Graphql/Resolvers/query');
const { Mutation } = require('./Graphql/Resolvers/mutation');

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

    	Let us further discuss your inquiries, by replying to this email. Currently, Alpha Development provides the following web development services: designing your web pages, converting PSD Designs to HTML, developing your frontend application, designing your backend logic, connecting your application to a database, setting up your application on a server, or just simply building a fullstack application without you having to worry about anything else.

    	We are looking forward to working with you! Cheers.


    	What is Alpha Development?
    	Alpha Development is a Tacloban-based web development company, and has started its journey since May 2020. Currently, it is a one-man company, but it has its eyes set on being the first established web development company in the region. Alpha Development's promise to its clients is to provide quality yet pocket-friendly products. Alpha Development products are fueled by customer's creative powers, as whatever you can imagine, Alpha Development will provide.

	`,
	html: `
	<h2 style="font-size: 1.5rem;"> Thank you for choosing Alpha <span style="color: #00cbff;"> Development! </span> </h2>
	<p style="font-size: 1.15rem; text-align: justify;">
		Let us further discuss your inquiries, by replying to this email. Currently, Alpha Development provides the following web development services: designing your web pages, converting PSD Designs to HTML, developing your frontend application, designing your backend logic, connecting your application to a database, setting up your application on a server, or just simply building a fullstack application without you having to worry about anything else.
	</p>
	<p style="font-size: 1.15rem">
		We are looking forward to working with you! <span style="color: #FFA114;">Cheers</span>.
	</p>
	<br />
	<br />
	<hr />
	<h4 style="font-size: 1rem; text-align: center;"> What is Alpha <span style="color: #00cbff;">Development</span>? </h4>
	<p style="color: #212121; fontSize: 0.95rem; text-align: justify;">
		Alpha Development is a Tacloban-based web development company, and has started its journey since May 2020. Currently, it is a one-man company, but it has its eyes set on being the first established web development company in the region. Alpha Development's promise to its clients is to provide quality yet pocket-friendly products. Alpha Development products are fueled by customer's creative powers, as <i> whatever you can imagine, Alpha Development will provide</i>.
	</p>
	`,
  });

  return info;
}

//Initialize server
const server = new GraphQLServer({
	typeDefs: './Graphql/Schema/schema.graphql',
	resolvers,
	context: request => ({
		...request,
		db: database(),
		send: sendmail,
	})
});

server.express.use(express.static(path.join(__dirname, "build")));

server.express.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.start({
	endpoint: '/graphql',
}, () => console.log('Server running...'));
