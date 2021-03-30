import { createContext } from 'react';
import { IUser } from '@/models/user';

const userDefaultValue: IUser = {
	_id: '',
	name: '',
	email: '',
	adresses: [],
};

export const UserContext = createContext<IUser | undefined>(userDefaultValue);
