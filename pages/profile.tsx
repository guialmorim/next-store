import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import ProfileLayout from '@/components/ProfileLayout';
import ProfileInfoLayout from '@/components/ProfileInfoLayout';
import AddressesLayout from '@/components/AddressesLayout';
import Address, { TAddress } from '@/components/Address';
import ProfileInfo from '@/components/ProfileInfo';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_ADRESSES } from '@/config/api/endpoints';
import { Center, Divider } from '@chakra-ui/react';

type TProps = {
	adresses: Array<TAddress>;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const addresses = await fetchGetJSON(process.env.BASE_URL + GET_ADRESSES);
	return {
		props: {
			adresses: addresses,
		},
	};
};

const Profile: NextPage<TProps> = ({ adresses }) => (
	<ProfileLayout>
		<ProfileInfoLayout>
			<ProfileInfo />
		</ProfileInfoLayout>
		<AddressesLayout>
			<Address adresses={adresses} />
		</AddressesLayout>
	</ProfileLayout>
);

export default Profile;
