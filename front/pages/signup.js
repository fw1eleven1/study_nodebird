import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMsg = styled.div`
	color: red;
`;

const Signup = () => {
	const dispatch = useDispatch();
	const { signUpLoading, signUpDone, signUpError } = useSelector(
		state => state.user,
	);

	useEffect(() => {
		if (signUpDone) {
			Router.push('/');
		}
	}, [signUpDone]);

	useEffect(() => {
		if (signUpError) {
			alert(signUpError);
		}
	}, [signUpError]);

	const [email, onChangeEmail] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const onChangePasswordCheck = useCallback(
		e => {
			setPasswordCheck(e.target.value);
			setPasswordError(e.target.value !== password);
		},
		[password],
	);

	const [term, setTerm] = useState('');
	const [termError, setTermError] = useState('');

	const onChangeTerm = useCallback(e => {
		setTerm(e.target.checked);
		setTermError(false);
	}, []);

	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log(email, nickname, password);
		dispatch({
			type: SIGN_UP_REQUEST,
			data: { email, password, nickname },
		});
	}, [password, passwordCheck, term]);

	return (
		<AppLayout>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-email">E-Mail</label>
					<br />
					<Input
						name="user-email"
						type="email"
						value={email}
						required
						onChange={onChangeEmail}
					/>
				</div>
				<div>
					<label htmlFor="user-nick">Nickname</label>
					<br />
					<Input
						name="user-nick"
						value={nickname}
						required
						onChange={onChangeNickname}
					/>
				</div>
				<div>
					<label htmlFor="user-password">Password</label>
					<br />
					<Input.Password
						name="user-password"
						value={password}
						required
						onChange={onChangePassword}
						visibilityToggle={false}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">Password</label>
					<br />
					<Input.Password
						name="user-password-check"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
						visibilityToggle={false}
					/>
					{passwordError && <ErrorMsg>Password does not match</ErrorMsg>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						Agree to the Terms
					</Checkbox>
					{termError && <ErrorMsg>Must agree to Terms</ErrorMsg>}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit" loading={signUpLoading}>
						Sign up
					</Button>
				</div>
			</Form>
		</AppLayout>
	);
};

export default Signup;
