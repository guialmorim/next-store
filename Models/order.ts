import mongoose, { Schema, Document } from 'mongoose';
import { IAddress, IAddressMongooseModel } from './address';
import { IProduct } from './product';
import { IUser, IUserMongooseModel } from './user';

export interface IOrder {
	_id: string;
	paid: boolean;
	user: IUser;
	address: IAddress;
	products: Array<IProduct>;
}

export interface IOrderMongooseModel extends Document {
	paid: boolean;
	user: IUserMongooseModel;
	address: IAddressMongooseModel;
	products: [IProduct];
}

export const OrderSchema: Schema<IOrderMongooseModel> = new Schema(
	{
		paid: { type: Boolean, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default (mongoose.models.Order as mongoose.Model<IOrderMongooseModel>) ||
	mongoose.model<IOrderMongooseModel>('Order', OrderSchema);
