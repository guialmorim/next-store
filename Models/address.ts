import mongoose, { Schema, Document } from 'mongoose';
import { IUserMongooseModel, IUser } from '@/Models/user';

export interface IAddress {
	street: string;
	number: number;
	city: string;
	state: string;
	zip: number;
	user: IUser;
}

export interface IAddressMongooseModel extends Document {
	street: string;
	number: number;
	city: string;
	state: string;
	zip: number;
	user: IUserMongooseModel;
}

export const AddressSchema: Schema<IAddressMongooseModel> = new Schema(
	{
		street: { type: String, required: true },
		number: { type: Number, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zip: { type: Number, required: true, min: 8 },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default AddressSchema;
