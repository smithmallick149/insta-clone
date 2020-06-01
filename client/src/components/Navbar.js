import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
	const history = useHistory();

	const { state, dispatch } = useContext(UserContext);
	const renderList = () => {
		if (state) {
			return [
				<li>
					<Link to="/profile">Profile</Link>
				</li>,
				<li>
					<Link to="/create">Create Post</Link>
				</li>,
				<li>
					<button
						className="btn #62828 red darken-3"
						type="submit"
						onClick={() => {
							localStorage.clear();
							dispatch({ type: 'CLEAR' });
							history.push('/signin');
						}}>
						Logout
					</button>
				</li>,
			];
		} else {
			return [
				<li>
					<Link to="/signin">Signin</Link>
				</li>,
				<li>
					<Link to="/signup">Signup</Link>
				</li>,
			];
		}
	};

	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to={state ? '/' : '/signin'} className="brand-logo left">
					Instaclone
				</Link>
				<ul id="nav-mobile" className="right">
					{renderList()}
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
