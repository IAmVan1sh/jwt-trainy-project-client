import {IUser} from "../types/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/auth.service";
import axios from "axios";
import {AuthResponse} from "../types/AuthResponse";
import {API_URL} from "../http";

export default class Store {
	user = {} as IUser;
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	setLoading(bool: boolean) {
		this.isLoading = bool;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch(error: ReturnType<Error>) {
			console.log(error.response?.data?.message);
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch(error: ReturnType<Error>) {
			console.log(error.response?.data?.message);
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout();
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch(error: ReturnType<Error>) {
			console.log(error.response?.data?.message);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
				withCredentials: true
			})
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch(error: ReturnType<Error>) {
			console.log(error.response?.data?.message);
		} finally {
			this.setLoading(false);
		}
	}

}