import LoginForm from "./components/layout/LoginForm";
import axios from "axios";
import {Fragment, useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./types/IUser";
import UserService from "./services/user.service";

const App = () => {
	const {store} = useContext(Context);
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers();
			setUsers(response.data);
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
			{store.isLoading ?
				<h1>Loading...</h1>
				:
				store.isAuth ?
					<Fragment>
						<h1>User logged in (
							<span style={store.user.isActivated ? {color: 'green'} : {color: "red"}}>
							{store.user.email}
							</span>
						)</h1>
						<button onClick={() => store.logout()}>Log out</button>
						<button style={{marginTop: '10px'}} onClick={getUsers}>Get users list</button>
						{!store.user.isActivated && <h3>Activate your account to get access to other people</h3>}
						{store.user.isActivated ?
							users.map(user =>
								<p style={{marginBottom: 0}} key={user.id}>{user.email} ({user.isActivated ?
									<span style={{color: 'green'}}>activated</span>
									:
									<span style={{color: 'red'}}>unactivated</span>})
								</p>
							)
							:
							users.map(user =>
								<p style={{marginBottom: 0}} key={user.id}>****</p>
							)
						}
					</Fragment>
					:
					<Fragment>
						<h1>LOG IN or SIGN UP</h1>
						<LoginForm/>
					</Fragment>
			}
		</div>
	);
};

export default observer(App);