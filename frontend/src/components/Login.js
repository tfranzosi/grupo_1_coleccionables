import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
const crypto = require("crypto-js");
const BACKEND_ADDRESS = 'http://localhost:3001';

function Login(){
	const privateSeed = 'DigitalHouse';

	const username = useRef();
	const password = useRef();
	const [loginError, setLoginError] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const loginFetch = (e) => {
		e.preventDefault();
		setLoginError(false);

		const cryptedPassword = crypto.AES.encrypt(password.current.value, privateSeed).toString();

/* 		const hashPassword = crypto.AES.decrypt(cryptedPassword, privateSeed);
		const decryptedPassword = hashPassword.toString(crypto.enc.Utf8); */

		const data = {
			username: username.current.value,
			password: cryptedPassword
		}

		const registerLogin = data => {
			if (data.access === 'Granted') {
				sessionStorage.setItem('usuario', JSON.stringify(data.user));
				setRedirect(true);

			} else {
				setLoginError(true);
				sessionStorage.removeItem('usuario');
				
			}
		}

		fetch(`${BACKEND_ADDRESS}/api/users/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => registerLogin(data));

	}

	return(
		<div className="container-fluid">
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Login Form */}
							{/* <form method="POST" onSubmit={loginFetch}> */}
								<div className="form-group">
									<label htmlFor="">Nombre de usuario o email:</label>
									<input type="text" ref={username} className="form-control" />
									<label htmlFor="">Contraseña:</label>
									<input type="password" ref={password} className="form-control" />
								</div>
									<button className="btn btn-info" onClick={loginFetch}>Login</button>
									{redirect ? <Redirect to="/"/> : ''}
							{/* </form> */}
						</div>
					</div>
				</>
			{loginError ? <div className="alert alert-danger text-center my-4 fs-2">Usuario o contraseña incorrecta</div> : <></>}
			
		</div>
	)
}

export default Login;
