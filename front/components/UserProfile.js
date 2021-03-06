import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
	const dispatch = useDispatch();
	const { me, logOutLoading } = useSelector(state => state.user);

	const onLogOut = useCallback(() => {
		dispatch(logoutRequestAction());
	}, []);
	return (
		<Card
			actions={[
				<div key="twit">
					twit
					<br />
					{me.Posts?.length}
				</div>,
				<div key="followings">
					Followings
					<br />
					{me.Followings.length}
				</div>,
				<div key="followers">
					Followers
					<br />
					{me.Followers.length}
				</div>,
			]}
		>
			<Card.Meta
				avatar={<Avatar>{me.nickname[0]}</Avatar>}
				title={me.nickname}
			/>
			<Button onClick={onLogOut} loading={logOutLoading}>
				Logout
			</Button>
		</Card>
	);
}

export default UserProfile;
