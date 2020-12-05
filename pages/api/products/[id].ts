import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Product, { IProduct } from '@/Models/product';

interface ResponseType {
	message: string;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	const {
		method,
		body,
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const product = await Product.findById(id);
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
				const product = await Product.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true,
				});

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
				const product = await Product.deleteOne({ _id: id });

				if (product) {
					response.status(200).json({ message: 'Produto apagado' });
				} else {
					response.status(400).json({ message: 'falha ao apagar produto' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
	}
};
