import mongoose from 'mongoose';

type DbConnection = {
	isConnected: boolean;
};

const connection: DbConnection = {
	isConnected: false,
};

let uri = process.env.MONGODB_URI || '';
let dbName = process.env.MONGODB_DB;

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

export default async function connect(): Promise<void> {
	if (!connection.isConnected) {
		const db = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		connection.isConnected = db.connections[0].readyState === 1;
	}
}
