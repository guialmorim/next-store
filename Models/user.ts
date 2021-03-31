import mongoose, { Schema, Document } from 'mongoose';
import {
	IAddress,
	IAddressMongooseModel,
	AddressSchema,
} from '@/Models/address';
import { OrderSchema } from '@/Models/order';

export interface IUser {
	_id: string;
	name: String;
	email: String;
	addresses: IAddress[];
}

export interface IUserMongooseModel extends Document {
	name: String;
	email: String;
	age: Number;
	addresses: IAddressMongooseModel[];
}

export const UserSchema: Schema<IUserMongooseModel> = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		age: {
			type: Number,
			required: true,
			min: 18,
		},
		addresses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'addresses',
			},
		],
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default (mongoose.models.User as mongoose.Model<IUserMongooseModel>) ||
	mongoose.model<IUserMongooseModel>('User', UserSchema);
