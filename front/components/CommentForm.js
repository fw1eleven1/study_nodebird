import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

function CommentForm({ post }) {
	const dispatch = useDispatch();
	const id = useSelector(state => state.user.me?.id);
	const { addCommentDone, addCommentLoading } = useSelector(
		state => state.post,
	);

	const [commentText, onChangeCommentText, setCommentText] = useInput('');

	useEffect(() => {
		if (addCommentDone) {
			setCommentText('');
		}
	}, [addCommentDone]);

	const onSubmitComment = useCallback(() => {
		console.log(post.User.id, commentText);
		dispatch({
			type: ADD_COMMENT_REQUEST,
			data: { content: commentText, postId: post.id, userId: id },
		});
	}, [commentText, id]);

	return (
		<Form onFinish={onSubmitComment}>
			<Form.Item style={{ position: 'relative', margin: 0 }}>
				<Input.TextArea
					value={commentText}
					onChange={onChangeCommentText}
					rows={4}
				/>
				<Button
					type="primary"
					htmlType="submit"
					style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
					loading={addCommentLoading}
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

CommentForm.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
};

export default CommentForm;
