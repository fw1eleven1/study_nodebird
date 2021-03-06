import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

function FollowButton({ post }) {
	const dispatch = useDispatch();
	const { me, followLoading, unfollowLoading } = useSelector(
		state => state.user,
	);

	const isFollowing = me?.Followings.find(v => v.id === post.User.id);
	const onClickButton = useCallback(() => {
		if (isFollowing) {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: post.User.id,
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: post.User.id,
			});
		}
	}, [isFollowing]);
	return (
		<Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
}

export default FollowButton;
