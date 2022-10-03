import React from 'react';
import foto from '../assets/images/jordan-walke.png';

function TopBar(){
	const useSessionStorage = (keyName, defaultValue) => {
		const [storedValue, setStoredValue] = React.useState(() => {
		  try {
			const value = window.sessionStorage.getItem(keyName);
	  
			if (value) {
			  return JSON.parse(value);
			} else {
//			  window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
			  return defaultValue;
			}
		  } catch (err) {
			return defaultValue;
		  }
		});
	  
		const setValue = newValue => {
		  try {
			window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
		  } catch (err) {}
		  setStoredValue(newValue);
		};
	  
		return [storedValue, setValue];
	};


const [user, setUser] = useSessionStorage('usuario','');

    return(
        <React.Fragment>
				{/*<!-- Topbar -->*/}
				<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					{/*<!-- Sidebar Toggle (Topbar) -->*/}
					<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
						<i className="fa fa-bars"></i>
					</button>

					{/*<!-- Topbar Navbar -->*/}
					<ul className="navbar-nav ml-auto">

						{/*<!-- Nav Item - Alerts -->*/}
						<li className="nav-item dropdown no-arrow mx-1">
							<a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
								<i className="fas fa-bell fa-fw"></i>
								{/*<!-- Counter - Alerts -->*/}
								<span className="badge badge-danger badge-counter">3+</span>
							</a>
						</li>

						{/*<!-- Nav Item - Messages -->*/}
						<li className="nav-item dropdown no-arrow mx-1">
							<a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
								<i className="fas fa-envelope fa-fw"></i>
								{/*<!-- Counter - Messages -->*/}
								<span className="badge badge-danger badge-counter">7</span>
							</a>
						</li>

						<div className="topbar-divider d-none d-sm-block"></div>

						{/*<!-- Nav Item - User Information -->*/}
						<li className="nav-item dropdown no-arrow">
							<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
								<span className="mr-2 d-none d-lg-inline text-gray-600 small">{ user.name }</span>
								<img className="img-profile rounded-circle" src={ user ? user.image : foto } alt="Jordan Walke - Creador de React" width="60"/>
							</a>
						</li>

					</ul>

				</nav>
				{/*<!-- End of Topbar -->*/}

        </React.Fragment>
    )
}
export default TopBar;