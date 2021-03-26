import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import ProfileLayout from '@/components/ProfileLayout';
import ProfileInfoLayout from '@/components/ProfileInfoLayout';
import AddressesLayout from '@/components/AddressesLayout';
import Address, { TAddress } from '@/components/Address';
import ProfileInfo from '@/components/ProfileInfo';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_USER } from '@/config/api/endpoints';
import { getSession } from 'next-auth/client';

interface IUser {
	user: {
		adresses: Array<TAddress>;
		_id: string;
		name: string;
		email: string;
		image: string;
		createdAt: string;
		updatedAt: string;
	};
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const { data } = await fetchGetJSON(
		`${process.env.BASE_URL}${GET_USER}/${session?.user?.email}`
	);

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			user: data,
		},
	};
};

const Profile: NextPage<IUser> = ({ user }) => (
	<ProfileLayout>
		<ProfileInfoLayout>
			<ProfileInfo />
		</ProfileInfoLayout>
		<AddressesLayout>
			<Address adresses={user.adresses} />
		</AddressesLayout>
	</ProfileLayout>
);

export default Profile;
