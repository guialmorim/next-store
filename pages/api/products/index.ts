import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Product from '@/Models/product';

interface ResponseType {
	message: string;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	const { method, body } = request;

	switch (method) {
		case 'GET':
			try {
				const products = await Product.find();
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
				const product = await Product.create(body);
				if (product) {
					response.status(200).json({ message: 'Produto criado' });
				} else {
					response.status(400).json({ message: 'algo deu errado' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
	}
};
