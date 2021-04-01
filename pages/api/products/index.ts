import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/utils/database';
import mongoose from 'mongoose';
import { registerModels } from '@/utils/database';

registerModels();

export default async (
	request: NextApiRequest,
	response: NextApiResponse
): Promise<void> => {
	await connect();
	const { method, body } = request;

	switch (method) {
		case 'GET':
			try {
				const products = await mongoose.models.Product.find();
				if (products.length > 0) {
					response.status(200).json(products);
				} else {
					response.status(404).json({ message: 'nenhum produto encontrado.' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'POST':
			try {
				const product = await mongoose.models.Product.create(body);
				if (product) {
					response.status(201).json({ message: 'Produto criado' });
				} else {
					response.status(400).json({ message: 'algo deu errado' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
