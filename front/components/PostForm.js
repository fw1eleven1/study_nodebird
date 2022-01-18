import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

function PostForm() {
	const { imagePaths, addPostDone } = useSelector(state => state.post);
	const dispatch = useDispatch();

	const [text, onChangeText, setText] = useInput('');

	useEffect(() => {
		if (addPostDone) {
			setText('');
		}
	}, [addPostDone]);

	const imageInput = useRef();
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onSubmit = useCallback(() => {
		dispatch(addPost(text));
	}, [text]);
	return (
		<Form
			style={{ margin: '10px 0 20px' }}
			encType="multipart/form-data"
			onFinish={onSubmit}
		>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="Text your Everything's"
			/>
			<div>
				<input type="file" mutiple hidden ref={imageInput} />
				<Button onClick={onClickImageUpload}>Upload Images</Button>
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					Submit
				</Button>
			</div>
			<div>
				{imagePaths.map(v => (
					<div key={v} style={{ display: 'inline-block' }}>
						<img src={v} style={{ width: '200px' }} alt={v} />
						<div>
							<Button>Remove</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
}

export default PostForm;
