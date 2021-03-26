import mongoose, { Schema, Document } from 'mongoose';
import { IAddress, IAddressMongooseModel } from '@/models/address';

export interface IUser {
	_id: string;
	name: String;
	email: String;
	adresses: IAddress[];
}

export interface IUserMongooseModel extends Document {
	name: String;
	email: String;
	age: Number;
	adresses: IAddressMongooseModel[];
}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		age: {
			type: Number,
			required: true,
			min: 18,
		},
		adresses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Address',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default (mongoose.models.User as mongoose.Model<IUserMongooseModel>) ||
	mongoose.model<IUserMongooseModel>('User', UserSchema);
