import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
	const { me } = useSelector(state => state.user);

	useEffect(() => {
		if (!(me && me.id)) {
			Router.push('/');
		}
	}, [me && me.id]);
	if (!me) {
		return null;
	}

	return (
		<AppLayout>
			<NicknameEditForm />
			<FollowList header="Followings List" data={me.Followings} />
			<FollowList header="Followers List" data={me.Followers} />
		</AppLayout>
	);
};

export default Profile;
