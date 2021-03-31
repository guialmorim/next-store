import React, { ReactNode } from 'react';
import { Text, Box } from '@chakra-ui/react';
import { IOrder } from '@/Models/order';

type TProps = {
	orders: Array<IOrder>;
	children?: ReactNode;
};

const Orders: React.FC<TProps> = ({ orders }) => {
	const formatter = new Intl.NumberFormat([], {
		style: 'currency',
		currency: 'BRL',
	});
	return (
		<>
			{orders?.length > 0 ? (
				orders.map((order) => (
					<Box
						key={order._id}
						m="0 auto"
						rounded="1rem"
						shadow="2xl"
						w="20rem"
						maxW="20rem"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
					>
						<Box p="6">
							<Text
								color="gray.500"
								fontWeight="semibold"
								letterSpacing="wide"
								fontSize="xs"
							>
								ID: {order._id}
							</Text>

							<Text fontWeight="bold" fontSize="md" my="0.6rem">
								Endereço:
							</Text>
							<Text fontSize="md">
								{order.address.street} - {order.address.number}
							</Text>
							<Text fontSize="sm">
								{order.address.city} - {order.address.state}
							</Text>

							<Text fontWeight="bold" fontSize="md" my="0.6rem">
								Produtos:
							</Text>

							{order.products.map((prod) => (
								<Text fontSize="xs">
									{prod.name} - {formatter.format(prod.price)}
								</Text>
							))}
						</Box>
					</Box>
				))
			) : (
				<Box>Você não possui pedidos cadastrados</Box>
			)}
		</>
	);
};

export default Orders;
