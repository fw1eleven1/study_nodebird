import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 10px;
`;

function LoginForm() {
	const { logInLoading } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');

	// const [id, setId] = useState('');
	// const [password, setPassword] = useState('');

	// const onChangeId = useCallback(e => {
	// 	setId(e.target.value);
	// }, []);
	// const onChangePassword = useCallback(e => {
	// 	setPassword(e.target.value);
	// }, []);

	const onSubmitForm = useCallback(() => {
		console.log(email, password);
		dispatch(loginRequestAction({ email, password }));
		// setIsLoggedIn(true);
	}, [email, password]);

	return (
		<div>
			<FormWrapper onFinish={onSubmitForm}>
				<div>
					<label htmlFor="user-email">E-Mail</label>
					<br />
					<Input
						name="user-email"
						type="email"
						value={email}
						onChange={onChangeEmail}
						required
					/>
				</div>
				<div>
					<label htmlFor="user-password">Password</label>
					<br />
					<Input.Password
						name="user-password"
						value={password}
						onChange={onChangePassword}
						visibilityToggle={false}
						required
					/>
				</div>
				<ButtonWrapper>
					<Button type="primary" htmlType="submit" loading={logInLoading}>
						Login
					</Button>
					<Link href="/signup">
						<a>
							<Button>Sign-up</Button>
						</a>
					</Link>
				</ButtonWrapper>
			</FormWrapper>
		</div>
	);
}

export default LoginForm;
