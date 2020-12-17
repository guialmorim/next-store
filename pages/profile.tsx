import React from 'react';
import { NextPage } from 'next';
import ProfileLayout from '@/components/ProfileLayout';
import AddressesLayout from '@/components/AddressesLayout';
import Address, { TAddress } from '@/components/Address';
import ProfileInfo from '@/components/ProfileInfo';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_ADRESSES } from '@/config/api/endpoints';

type TProps = {
	adresses: Array<TAddress>;
};

export async function getServerSideProps() {
	const addresses = await fetchGetJSON(GET_ADRESSES);
	return {
		props: {
			adresses: addresses,
		},
	};
}

const Profile: NextPage<TProps> = ({ adresses }) => (
	<ProfileLayout>
		<AddressesLayout>
			<Address adresses={adresses} />
		</AddressesLayout>
		<ProfileInfo />
	</ProfileLayout>
);

export default Profile;
