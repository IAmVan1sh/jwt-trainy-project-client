import {AxiosResponse} from 'axios';
import {AuthResponse} from "../types/AuthResponse";
import $api from "../http";
import {IUser} from "../types/IUser";

export default class UserService {
	static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('users');
	}
}