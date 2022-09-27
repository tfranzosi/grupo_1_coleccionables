import React, { useState, useEffect, useRef } from 'react';
const crypto = require("crypto-js");

function Login(){
	const privateSeed = 'DigitalHouse';

	const username = useRef();
	const password = useRef();

	const loginFetch = (e) => {
		e.preventDefault();
		const cryptedPassword = crypto.AES.encrypt(password.current.value, privateSeed).toString();

/* 		const hashPassword = crypto.AES.decrypt(cryptedPassword, privateSeed);
		const decryptedPassword = hashPassword.toString(crypto.enc.Utf8); */

		const data = {
			username: username.current.value,
			password: cryptedPassword
		}

		fetch('http://localhost:3001/api/users/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(json => console.log(json))
	}

	return(
		<div className="container-fluid">
			{
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Login Form */}
							<form method="POST" onSubmit={loginFetch}>
								<div className="form-group">
									<label htmlFor="">Nombre de usuario o email:</label>
									<input type="text" ref={username} className="form-control" />
									<label htmlFor="">Contraseña:</label>
									<input type="password" ref={password} className="form-control" />
								</div>
								<button className="btn btn-info">Login</button>
							</form>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default Login;
