import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled, { createGlobalStyle } from 'styled-components';

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

const Global = createGlobalStyle`
	.ant-row {
		margin-right: 0 !important;
		margin-left: 0 !important;
	}
	.ant-col:first-child {
		padding-left: 0 !important;
	}
	.ant-col:last-child {
		padding-right: 0 !important;
	}
`;

const AppLayout = ({ children }) => {
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const me = useSelector(state => state.user.me);

	return (
		<div>
			<Global />
			<Menu mode="horizontal">
				<Menu.Item>
					<Link href="/">
						<a>Nodebird</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<SearchInput enterButton />
				</Menu.Item>
				{!me && (
					<Menu.Item>
						<Link href="/signup">
							<a>Sign-up</a>
						</Link>
					</Menu.Item>
				)}
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{me ? <UserProfile /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a
						href="https://youtube.com"
						target="_blank"
						rel="noreferrer noopener"
					>
						Youtube
					</a>
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
