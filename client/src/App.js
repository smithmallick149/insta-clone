import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// component screens
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'USER', payload: user });
			// history.push('/');
		} else {
			history.push('/signin');
		}
	}, []);
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/signin" exact component={Signin} />
			<Route path="/signup" exact component={Signup} />
			<Route path="/profile" exact component={Profile} />
			<Route path="/create" exact component={CreatePost} />
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Navbar />
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
