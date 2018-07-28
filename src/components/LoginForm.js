import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

const
	Wrapper = styled.div`
		display: grid;
		z-index: 2;
		height: 100%;
		width: 100%;
		grid-template-columns: 100%;
		grid-template-rows: 40% 60%;
		grid-template-areas:
			"header"
			"form";
	`,
	HeaderContainer = styled.div`
		grid-area: header;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		@media (max-width: 420px) {
			padding: 0 10px;
		}
	`,
	HeaderLogo = styled.span`
		font-size: 3rem;
		color: #fff;
	`,
	Subheader = styled.span`
		text-align: center;
		font-size: 1rem;
		margin-top: 1.7rem;
		color: #fff;
		@media (min-width: 420px) {
			font-size: 1.2rem;
		}
	`,
	FormContainer = styled.div`
		grid-area: form;
		display: flex;
		flex-direction: column;
	`,
	FormDimmer = styled.div`
		background: rgba( 0, 0, 0, 0.4 );
		padding: 1.5rem;
		border-radius: 3px;
		margin: 0 auto;
		@media (max-width: 420px) {
			background: none;
			width: 100%;
		}
	`,
	StyledForm = styled( Form )`
		width: 100%;
		@media (min-width: 420px) {
			width: 400px;
		}
	`,
	EmailInput = styled( Form.Input )`
		input {
			border-width: 0px 0px 1px 0px !important;
			border-color: #fff !important;
			border-radius: 0px !important;
			background: none !important;
			font-family: inherit !important;
			color: #fff !important;
		}
		i {
			left: -10px !important;
			color: #fff !important;
			opacity: 1 !important;
		}
		input::placeholder {
			color: #eee !important;
		}
		margin: 0 !important;
	`,
	PasswordInput = styled( Form.Input )`
		input {
			border-width: 0px 0px 1px 0px !important;
			border-color: #fff !important;
			border-radius: 0px !important;
			background: none !important;
			font-family: inherit !important;
			color: #eee !important;
		}
		i {
			left: -10px !important;
			color: #fff !important;
			opacity: 1 !important;
		}
		input::placeholder {
			color: #eee !important;
		}
		margin: 2rem 0 0 0 !important;
	`,
	LoginButton = styled( Button )`
		width: 100% !important;
		margin: 3rem 0 0 0 !important;
		font-size: 1.2rem !important;
		font-family: inherit !important;
		border-radius: 1px !important;
		color: #fff !important;
		background: rgb(133, 217, 191) !important;
	`,
	ForgotPw = styled.div`
		margin-top: 1rem;
		text-align: center;
		color: #eee;
	`,
	NewAccount = styled.span`
		display: flex;
		align-items: center;
		justify-content: center;
		color: #eee;
		margin: auto;
		font-size: 1rem;
		@media(min-width: 420px) {
			font-size: 1.05rem;
		}
	`,
	ErrorMessage = styled( Message )`
		position: absolute !important;
		top: 0 !important;
		width: 100% !important;
		text-align: center !important;
		border-radius: 0px !important;
	`,
	Signup = styled.span`
		color: #fff;
		margin-left: 0.3rem;
		font-weight: bold;
	`;



class LoginForm extends Component {
	handleKeyPress = e => {
		if ( e.key === "Enter" ) {
			this.props.handleLogin();
		}
	}

	render() {
		return (
			<Wrapper>

				<HeaderContainer className="formHeader">
					<HeaderLogo>Wanamic</HeaderLogo>
					<Subheader>
						Find people and content relative to your interests and hobbies.
					</Subheader>
				</HeaderContainer>

				<FormContainer id="AuthFormContainer">
					{this.props.error &&
						<ErrorMessage negative>
							<Message.Header>{this.props.error}</Message.Header>
						</ErrorMessage>
					}
					<FormDimmer>
						<StyledForm id="AuthForm">
							<EmailInput
								autoFocus
								className="emailInput"
								placeholder="Email address"
								name="email"
								onChange={this.props.handleChange}
								onKeyPress={this.handleKeyPress}
								value={this.props.email}
								icon="mail"
								iconPosition="left"
							/>
							<PasswordInput
								className="passwordInput"
								placeholder="Password"
								type="password"
								name="password"
								onChange={this.props.handleChange}
								onKeyPress={this.handleKeyPress}
								value={this.props.password}
								icon="lock"
								iconPosition="left"
							/>

							<LoginButton
								type="button"
								className="loginButton"
								content="Log In"
								onClick={this.props.handleLogin}
							/>

							<ForgotPw>Forgot your password?</ForgotPw>

						</StyledForm>
					</FormDimmer>

					<NewAccount className="swapLink" onClick={this.props.swapForm}>
						Don't have an account? <Signup>Sign Up</Signup>
					</NewAccount>
				</FormContainer>
			</Wrapper>
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
