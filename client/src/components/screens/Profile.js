import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		fetch('/mypost', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setPics(result.mypost);
			});
	}, []);
	return (
		<div style={{ maxWidth: '550px', margin: '0px auto' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					margin: '18px 0px',
					borderBottom: '1px solid grey',
				}}>
				<div>
					<img
						style={{ width: '160px', height: '160px', borderRadius: '80px' }}
						src="https://images.unsplash.com/photo-1587614227447-2697e25730a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
					/>
				</div>
				<div>
					<h4>{state && state.name}</h4>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '108%',
						}}>
						<h6>40 Posts</h6>
						<h6>40 Followers</h6>
						<h6>40 Following</h6>
					</div>
				</div>
			</div>
			<div className="gallery">
				{mypics.map((item) => {
					return (
						<img
							key={item._id}
							className="item"
							src={item.photo}
							alt={item.title}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Profile;
