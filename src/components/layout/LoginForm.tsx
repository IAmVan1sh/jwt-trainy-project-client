import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const {store} = useContext(Context);

	return (
		<div>
			<section style={{display: 'flex', flexDirection: 'column', maxWidth: '200px', marginTop: '10px'}}>
				<input
					type="text"
					placeholder="Enter your email"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<input
					type="text"
					placeholder="Enter your password"
					value={password}
					onChange={event => setPassword(event.target.value)}
					style={{marginTop: '10px'}}
				/>
			</section>
			<section style={{display: 'flex', justifyContent: 'end',maxWidth: '200px', marginTop: '10px'}}>
				<button onClick={() => store.registration(email, password)}>Registration</button>
				<button style={{marginLeft: '10px'}} onClick={() => store.login(email, password)}>Login</button>
			</section>
		</div>
	);
};

export default LoginForm;