import React, { Component } from "react";
import { Form, Icon, Button, Message } from "semantic-ui-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { WithContext as ReactTags } from "react-tag-input";

const
	Wrapper = styled.div`
		position: absolute;
		height: 100vh;
		width: 100%;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 9% 91%;
		grid-template-areas:
			"hea"
			"opt"
	`,
	StyledMessage = styled( Message )`
		position: fixed !important;
		z-index: 2;
	`,
	HeaderWrapper = styled.div`
		grid-area: hea;
		display: flex;
		align-items: center;
		padding-left: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, .5);
	`,
	BackArrow = styled( Icon )`
		font-size: 1.3rem !important;
		margin: 0 !important;
	`,
	HeaderTxt = styled.span`
		margin-left: 1rem;
		font-weight: bold;
		font-size: 1.25rem;
	`,
	Options = styled.div`
		grid-area: opt;
		padding: 1rem !important;
		::-webkit-scrollbar {
			display: none !important;
		}
		overflow-y: scroll;
	`,
	FormInput = styled( Form.Input )`
		margin-bottom: 2rem !important;
		label {
			color: rgba(0,0,0,0.45) !important;
		}
	`,
	FormTextarea = styled( Form.TextArea )`
		margin-bottom: 2rem !important;
		label {
			color: rgba(0,0,0,0.45) !important;
		}
	`,
	SaveButton = styled( Button )`
		display: flex !important;
		margin: 1rem 0 0 auto !important;
	`,
	Hobbies = styled.div`
		margin-bottom: 2rem;
		.ReactTags__tag {
			padding: 0.25rem;
			border: 1px solid rgba( 0,0,0,0.4);
			border-radius: 5px;
			display: inline-block;
			margin: 0 0 0.5rem 0.5rem;
			font-size: 1rem;
			box-shadow: 0 1px 2px rgba(0, 0, 0, .125);
		}
		.ReactTags__remove {
			font-size: 1.7rem;
			margin-left: 0.5rem;
		}
	`,
	HobbiesLabel = styled.label`
		display: block;
		margin: 0 0 .28571429rem 0;
		color: rgba(0,0,0,0.45);
		font-size: .92857143em;
		font-weight: 700;
		text-transform: none;
	`,
	KeyCodes = { comma: 188, enter: 13 };

class AccountSettings extends Component {
	render() {
		return (
			<Wrapper>
				<HeaderWrapper>
					<BackArrow
						name="arrow left"
						onClick={this.props.backToMain}
					/>
					<HeaderTxt>Account</HeaderTxt>
				</HeaderWrapper>
				<Options>
					<Form>
						{this.props.error &&
							<StyledMessage negative>
								<Message.Header>{this.props.error}</Message.Header>
							</StyledMessage>
						}
						<FormInput
							maxLength="30"
							className="fullnameInput"
							onChange={this.props.handleChange}
							name="fullname"
							label="Full Name"
							value={this.props.fullname}
						/>
						<FormInput
							maxLength="30"
							className="usernameInput"
							onChange={this.props.handleChange}
							name="username"
							label="Username"
							value={this.props.username}
						/>
						<FormTextarea
							maxLength="250"
							className="descriptionArea"
							onChange={this.props.handleChange}
							name="description"
							label="Description"
							value={this.props.description}
						/>
						<Hobbies>
							<HobbiesLabel>Hobbies and interests</HobbiesLabel>
							<ReactTags
								tags={this.props.hobbies}
								handleDelete={this.props.handleDelete}
								handleAddition={this.props.handleAddition}
								delimiters={this.props.hobbies.length < 10 ?
									[ KeyCodes.comma, KeyCodes.enter ]
									:
									[]}
								placeholder="Add a new interest (with enter or comma)"
								autofocus={false}
								maxLength={"17"}
							/>
						</Hobbies>
						<FormInput
							className="profileImageInput"
							name="userImage"
							onChange={this.props.handleFileChange}
							label="Profile Image"
							type="file"
						/>
						<FormInput
							className="headerImageInput"
							name="headerImage"
							onChange={this.props.handleFileChange}
							label="Header Image"
							type="file"
						/>
					</Form>
					<SaveButton content="Save" onClick={this.props.updateUserInfo} />
				</Options>
			</Wrapper>
		);
	}
}

AccountSettings.propTypes = {
	updateUserInfo: PropTypes.func.isRequired,
	handleFileChange: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	backToMain: PropTypes.func.isRequired,
	hobbies: PropTypes.array.isRequired,
	description: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	fullname: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleAddition: PropTypes.func.isRequired,
};

export default AccountSettings;
