const { MongoClient } = require('mongodb');

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

module.exports = database;