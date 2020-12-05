import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '@/Models/user';

export interface IAddress extends Document {
	street: string;
	number: number;
	city: string;
	state: string;
	zip: number;
	user: IUser;
}

const AddressSchema: Schema = new Schema(
	{
		street: { type: String, required: true },
		number: { type: Number, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zip: { type: Number, required: true, min: 8 },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);

export default (mongoose.models.Address as mongoose.Model<IAddress>) ||
	mongoose.model<IAddress>('Address', AddressSchema);
