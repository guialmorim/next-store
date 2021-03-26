import React, { useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import AddressForm from '@/components/AddressForm';
import AddressFormLayout from '@/components/AddressFormLayout';
import { GET_ADRESS, GET_USER } from '@/config/api/endpoints';
import { TAddress } from '@/components/Address';
import { getSession, useSession } from 'next-auth/client';
import { fetchGetJSON } from '@/utils/api-helpers';
import { IUser } from '@/models/user';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	const id = ctx.params?.id;

	let endpoint = `${process.env.BASE_URL}${GET_USER}/${session?.user.email}`;
	let response = await fetch(endpoint);
	const user = await response.json();

	if (id !== 'new') {
		endpoint = `${process.env.BASE_URL}${GET_ADRESS}${id}`;
		response = await fetch(endpoint);
		const json = await response.json();

		if (!json) {
			return {
				notFound: true,
			};
		}

		let address = json.addresses;
		address.user = user._id;

		return {
			props: {
				address: address,
			},
		};
	} else {
		return {
			props: {
				address: {
					street: '',
					number: null,
					city: '',
					state: '',
					zip: null,
					user: user._id,
				},
			},
		};
	}
};

interface IProps {
	address: TAddress;
}

const Profile: NextPage<IProps> = ({ address }) => {
	return (
		<AddressFormLayout>
			<AddressForm address={address} />
		</AddressFormLayout>
	);
};

export default Profile;
