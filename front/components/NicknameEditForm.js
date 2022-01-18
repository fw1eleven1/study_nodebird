import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

function NicknameEditForm() {
	const FormWrapper = styled(Form)`
		margin-bottom: 20px;
		border: 1px solid #d9d9d9;
		padding: 20px;
	`;

	return (
		<FormWrapper>
			<Input.Search addonBefore="Nickname" enterButton="Modify" />
		</FormWrapper>
	);
}

export default NicknameEditForm;
