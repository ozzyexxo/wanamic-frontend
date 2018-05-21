import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Header, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

const
	FormContainer = styled.div`
		@media (max-width: 420px) {
			width: 90%;
			height: 60%;
			margin: auto;
			padding: 25px;
		}
		border: 1px solid #808080;
		width: 300px;
		height: 400px;
		grid-row: 1 / 3;
		margin: 0px auto;
	`,

	FormHeader = styled( Header )`
		margin-bottom: 30px;
		text-align: center;
	`,

	SwapButton = styled( Button )`
		position: absolute;
		right: 10px;
		top: 10px;
	`;



class LoginForm extends Component {
	handleKeyPress = e => {
		if ( e.key === "Enter" ) {
			this.props.handleLogin();
		}
	}

	render() {
		return (
			<FormContainer id="AuthFormContainer">
				{this.props.error &&
					<Message negative>
						<Message.Header>{this.props.error.response.data}</Message.Header>
					</Message>
				}
				<SwapButton
					className="swapButton"
					secondary
					content="Sign Up"
					onClick={this.props.swapForm}
				/>

				<FormHeader className="formHeader" content="Log In" />

				<Form id="AuthForm">
					<Form.Input
						className="emailInput"
						label="Email"
						name="email"
						onChange={this.props.handleChange}
						onKeyPress={this.handleKeyPress}
						value={this.props.email}
					/>
					<Form.Input
						className="passwordInput"
						label="Password"
						type="password"
						name="password"
						onChange={this.props.handleChange}
						onKeyPress={this.handleKeyPress}
						value={this.props.password}
					/>

					<Form.Button
						type="button"
						className="loginButton"
						floated="right"
						primary
						content="Log In"
						onClick={this.props.handleLogin}
					/>

				</Form>
			</FormContainer>
		);
	}
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	swapForm: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};

export default LoginForm;
