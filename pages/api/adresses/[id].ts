import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address, { IAddress } from '@/models/address';
import { NativeError } from 'mongoose';

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
				const address = await Address.findById(id)
					.populate({
						path: 'user',
						select: ['name', 'email'],
					})
					.exec();

				if (address) {
					response.status(200).json(address);
				} else {
					response.status(404).json({ message: 'nenhum endereço encontrado.' });
				}
			} catch (error) {
				response.status(404).json({ message: 'endereço não encontrado' });
			}
			break;
		case 'PUT':
			try {
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
