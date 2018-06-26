import React, { Component } from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import InputTrigger from "react-input-trigger";

const
	Wrapper = styled.div`
		overflow: hidden;
	`,
	Content = styled.div`
		position: absolute;
		height: 100vh;
		width: 100%;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 7% 33% 60%;
		grid-template-areas:
			"hea"
			"inp"
			"img"
	`,
	HeaderWrapper = styled.div`
		grid-area: hea;
		display: flex;
		z-index: 2;
		align-items: center;
		justify-content: space-between;
		padding: 0px 10px;
		color: #fff;
		border-bottom: 1px solid rgba(0, 0, 0, .5);
	`,
	HeaderTxt = styled.span`
		font-weight: bold;
		font-size: 1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 65%;
	`,
	ContentInputWrapper = styled.div`
		grid-area: inp;
		display: grid;
		padding-bottom: 40px;
	`,
	UserContentInput = {
		width: "80%",
		alignSelf: "flex-end",
		zIndex: 2
	},
	InputTriggerStyles = {
		display: "flex",
		justifyContent: "center",
		zIndex: 2
	},
	SelectedMediaImgWrapper = styled.div`
		grid-area: img;
		display: grid;
	`,
	SelectedMediaBackground = styled.div`
		height: 100vh;
		background-image: url(${props => props.background});
		background-size: cover;
		filter: blur(20px) brightness(50%);
		transform: scale(1.2);
	`,
	SelectedMediaImg = styled( Image )`
		width: 128px;
		height: 194px;
		justify-self: center;
		align-self: start;
		z-index: 2;
	`,
	BackButton = styled( Button )`
		position: absolute;
		bottom: 5px;
		left: 5px;
	`,
	ShareButton = styled( Button )`
		position: absolute;
		bottom: 5px;
		right: 5px;
	`,
	Suggestions = styled.div`
		grid-area: img;
		position: absolute;
		z-index: 3;
		height: 100%;
		width: 100%;
		background: #fff;
		padding: 10px;
		overflow-y: scroll;
		display: ${props => props.showSuggestions ? "block" : "none"};
	`,
	Suggestion = styled.div`
		display: flex;
		flex-direction: column;
		padding: 10px 0px;
		border-bottom: 1px solid #808080;
		background: ${props => props.selection === props.index ? "#808080" : "none"};
	`;


class MediaStep2 extends Component {
	constructor() {
		super();
		this.state = {
			description: "",
			showSuggestions: false,
			suggestionsTop: undefined,
			suggestionsLeft: undefined,
			mentionInput: "",
			currentSelection: 0,
			startPosition: undefined
		};
	}

	handleKeyPress = e => {
		if ( e.key === "Enter" ) {
			e.preventDefault();
			if ( this.state.showSuggestions ) {
				const
					{ description, startPosition, currentSelection } = this.state,
					user = this.props.socialCircle[ currentSelection ],
					updatedDescription =
						description.slice( 0, startPosition - 1 )
						+ "@" + user.username + " " +
						description.slice( startPosition + user.username.length, description.length );

				this.setState({
					description: updatedDescription,
					startPosition: undefined,
					showSuggestions: false,
					suggestionsLeft: undefined,
					suggestionsTop: undefined,
					mentionInput: "",
					currentSelection: 0
				});

				this.endHandler();
			} else {
				this.props.nextStep( this.state.description );
			}
		}

		if ( this.state.showSuggestions ) {
			if ( e.keyCode === 40 &&
			this.state.currentSelection !== this.props.socialCircle.length - 1 ) {
				e.preventDefault();
				this.setState({
					currentSelection: this.state.currentSelection + 1
				});
			}

			if ( e.keyCode === 38 && this.state.currentSelection !== 0 ) {
				e.preventDefault();
				this.setState({
					currentSelection: this.state.currentSelection - 1
				});
			}
		}
	}

	toggleSuggestions = metaData => {
		if ( metaData.hookType === "start" ) {
			this.setState({
				startPosition: metaData.cursor.selectionStart,
				showSuggestions: true,
				suggestionsLeft: metaData.cursor.left,
				suggestionsTop: metaData.cursor.top + metaData.cursor.height,
			});
		}

		if ( metaData.hookType === "cancel" ) {
			this.setState({
				startPosition: undefined,
				showSuggestions: false,
				suggestionsLeft: undefined,
				suggestionsTop: undefined,
				mentionInput: "",
				currentSelection: 0
			});
		}
	}

	handleMentionInput = metaData => {
		if ( this.state.showSuggestions ) {
			this.setState({ mentionInput: metaData.text });
		}
	}

	handleChange = e => {
		this.setState({ [ e.target.name ]: e.target.value });
	}

	render() {
		return (
			<Wrapper>
				<Content>
					<HeaderWrapper>
						<Icon
							className="backIcon"
							name="arrow left"
							onClick={this.props.prevStep}
						/>
						<HeaderTxt>{this.props.mediaData.title}</HeaderTxt>
						<Icon
							className="nextIcon"
							name="check"
							onClick={() => this.props.nextStep( this.state.description )}
						/>
					</HeaderWrapper>
					<ContentInputWrapper>
						<InputTrigger
							style={InputTriggerStyles}
							trigger={{ keyCode: 50 }}
							onStart={metaData => this.toggleSuggestions( metaData ) }
							onCancel={metaData => this.toggleSuggestions( metaData ) }
							onType={metaData => this.handleMentionInput( metaData ) }
							endTrigger={endHandler => this.endHandler = endHandler }
						>
							<textarea
								style={UserContentInput}
								className="userInput"
								name="description"
								value={this.state.description}
								placeholder="Share your opinion, tag @users and add #hashtags..."
								onChange={this.handleChange}
								onKeyDown={this.handleKeyPress}
							/>
						</InputTrigger>
						<Suggestions showSuggestions={this.state.showSuggestions}>
							{this.props.socialCircle
								.filter( user =>
									user.fullname.toLowerCase().indexOf(
										this.state.mentionInput.toLowerCase()) !== -1
									||
									user.username.indexOf( this.state.mentionInput ) !== -1
								)
								.map(( user, index ) => (
									<Suggestion
										key={index}
										index={index}
										selection={this.state.currentSelection}>
										<b>{user.fullname}</b>
										<span>@{user.username}</span>
									</Suggestion>
								))}
						</Suggestions>
					</ContentInputWrapper>
					<SelectedMediaImgWrapper>
						{this.props.mediaData && this.props.mediaData.image &&
							<SelectedMediaImg src={this.props.mediaData.image} />
						}
					</SelectedMediaImgWrapper>
				</Content>
				{this.props.mediaData && this.props.mediaData.image &&
					<SelectedMediaBackground background={this.props.mediaData.image} />
				}
			</Wrapper>
		);
	}
}

MediaStep2.propTypes = {
	prevStep: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	mediaData: PropTypes.object.isRequired,
	socialCircle: PropTypes.array.isRequired,
};

export default MediaStep2;
