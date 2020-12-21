import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	price: number;
	qtd: number;
}

const ProductSchema: Schema = new Schema(
	{
		sku: {
			type: String,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: [40, 'Nome não pode ter mais do que 40 carateres'],
		},
		description: {
			type: String,
			required: true,
		},
		price: { type: Number, required: true },
		image: {
			type: String,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default (mongoose.models.Product as mongoose.Model<IProduct>) ||
	mongoose.model<IProduct>('Product', ProductSchema);
