import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/utils/database';
import mongoose from 'mongoose';
import { registerModels } from '@/utils/database';

registerModels();

interface ResponseType {
	message: string;
}

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	await connect();
	const {
		method,
		body,
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const product = await mongoose.models.Product.findById(id);
				if (product) {
					response.status(200).json(product);
				} else {
					response.status(404).json({ message: 'produto não encontrado.' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'PUT':
			try {
				const product = await mongoose.models.Product.findByIdAndUpdate(
					id,
					body,
					{
						new: true,
						runValidators: true,
					}
				);

				if (product) {
					response
						.status(200)
						.json({ message: `Produto ${product.name} atualizado` });
				} else {
					response.status(400).json({ message: 'falha ao atualizar produto' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'DELETE':
			try {
				const product = await mongoose.models.Product.deleteOne({ _id: id });

				if (product) {
					response.status(200).json({ message: 'Produto apagado' });
				} else {
					response.status(400).json({ message: 'falha ao apagar produto' });
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
