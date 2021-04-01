import mongoose from 'mongoose';

type DbConnection = {
	isConnected: boolean;
};

const connection: DbConnection = {
	isConnected: false,
};

let uri = process.env.MONGODB_URI || '';
let dbName = process.env.MONGODB_DBNAME;

console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
console.log('uri', uri);
console.log('process.env.MONGODB_DBNAME', process.env.MONGODB_DBNAME);
console.log('dbName', dbName);

if (!uri) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

if (!dbName) {
	throw new Error(
		'Please define the MONGODB_DB environment variable inside .env.local'
	);
}

export default async function connect() {
	console.log('uri recebida', uri);
	if (!connection.isConnected) {
		const db = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('executou função de acesso ao banco', uri);
		console.log('db.connections[0].readyState', db.connections[0].readyState);
		connection.isConnected = db.connections[0].readyState === 1;
	}
}
