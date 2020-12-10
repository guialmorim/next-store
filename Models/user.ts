import mongoose, { Schema, Document } from 'mongoose';
import { IAddress } from '@/models/address';

export interface IUser extends Document {
	name: String;
	email: String;
	age: Number;
	adresses: IAddress[];
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

export default (mongoose.models.User as mongoose.Model<IUser>) ||
	mongoose.model<IUser>('User', UserSchema);
