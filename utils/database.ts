import mongoose from 'mongoose';
import AddressSchema, { IAddressMongooseModel } from '@/Models/address';
import OrderSchema, { IOrderMongooseModel } from '@/Models/order';
import ProductSchema, { IProduct } from '@/Models/product';
import UserSchema, { IUserMongooseModel } from '@/Models/user';

type DbConnection = {
	isConnected: boolean;
};

const connection: DbConnection = {
	isConnected: false,
};

let uri = process.env.MONGODB_URI || '';
let dbName = process.env.MONGODB_DBNAME || '';

console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
console.log('process.env.MONGODB_DBNAME', process.env.MONGODB_DBNAME);

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

export async function connect() {
	console.log('uri recebida', uri);
	console.log('connection.isConnected ?', connection.isConnected);
	if (!connection.isConnected) {
		const db = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('executou função de acesso ao banco', uri);
		console.log('db.connections[0].readyState', db.connections[0].readyState);
		connection.isConnected = db.connections[0].readyState === 1;
	}
	console.log('FINALIZADA função de acesso ao banco');
}

export function registerModels() {
	if (!mongoose.models.Product) {
		mongoose.model<IProduct>('Product', ProductSchema);
	}

	if (!mongoose.models.Address) {
		mongoose.model<IAddressMongooseModel>('Address', AddressSchema);
	}

	if (!mongoose.models.Order) {
		mongoose.model<IOrderMongooseModel>('Order', OrderSchema);
	}

	if (!mongoose.models.User) {
		mongoose.model<IUserMongooseModel>('User', UserSchema);
	}
}
