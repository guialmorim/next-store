import React from 'react';
import { NextPage } from 'next';
import AddressForm from '@/components/AddressForm';
import AddressFormLayout from '@/components/AddressFormLayout';

const Profile: NextPage = () => (
	<AddressFormLayout>
		<AddressForm />
	</AddressFormLayout>
);

export default Profile;
