import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchMedia from "../containers/SearchMedia";
import ShareBox from "../components/ShareBox";
import ShareLink from "../components/ShareLink";
import MediaPicture from "./MediaPicture";
import api from "../services/api";
import { addPost, switchMediaOptions } from "../services/actions/posts";
import { connect } from "react-redux";
import refreshToken from "../utils/refreshToken";
import extract from "mention-hashtag";

const
	MediaOptionsWrapper = styled.div`
		display: flex;
		justify-content: center;
		position: fixed;
		height: 100vh;
		width: 100%;
		z-index: 2;
	`,
	MediaDimmer = styled.div`
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.85);
	`,
	MediaButtons = styled.div`
		display: flex;
		justify-content: space-between;
		align-self: center;
		@media (min-height: 575px) {
			flex-direction: column;
			height: 70%;
		}
		@media (max-width: 450px) and (max-height: 575px) {
			flex-wrap: wrap;
			width: 50%;
			justify-content: space-around;
			height: 60%;
    	align-content: space-between;
		}
	`,
	MediaButton = styled( Button )`
		background: none !important;
		color: #fff !important;
		border: 1px solid #fff !important;
		z-index: 2;
	`,
	PictureUploadWrapper = styled.span`
		position: relative;
	`,
	PictureUploadInput = styled.input`
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	`,
	StyledSearchMedia = styled( SearchMedia )`
		z-index: 2;
	`;

class MediaOptions extends Component {
	constructor() {
		super();
		this.state = {
			socialCircle: [],
			searchMedia: false,
			shareLink: false,
			shareState: false,
			sharePicture: false,
			mediaType: "",
			mediaData: {}
		};
	}

	componentDidMount() {
		this.getSocialCircle();
	}

	getSocialCircle = () => {
		api.getSocialCircle()
			.then( res => {
				if ( res === "jwt expired" ) {
					refreshToken()
						.then(() => this.getSocialCircle())
						.catch( err => console.log( err ));
				} else {
					this.setState({ socialCircle: res.data });
				}
			}).catch( err => console.log( err ));
	}

	handleChange = e => {
		this.setState({ [ e.target.name ]: e.target.value });
	}

	submitLink = async( description, link, privacyRange, alerts ) => {
		var i;

		if ( !link ) {
			return;
		}
		const { mentions, hashtags } = await extract(
			description, { symbol: false, type: "all" }
		);

		api.createMediaLink(
			link, description, mentions, hashtags, privacyRange, alerts
		)
			.then( res => {
				if ( res === "jwt expired" ) {
					refreshToken()
						.then(() => this.submitLink())
						.catch( err => console.log( err ));
				} else if ( res ) {
					this.props.addPost( res.newPost );
					this.props.switchMediaOptions();
					this.props.toggleMediaButton();
					if ( res.mentionsNotifications ) {
						const notifLength = res.mentionsNotifications.length;
						for ( i = 0; i < notifLength; i++ ) {
							this.props.socket.emit(
								"sendNotification", res.mentionsNotifications[ i ]
							);
						}
					}
				}
			}).catch( err => console.log( err ));
	}

	handleLinkKeyPress = e => {
		if ( e.key === "Enter" ) {
			e.preventDefault();
			this.submitLink();
		}
	}

	switchSearchMedia = media => {
		this.props.toggleMediaButton();
		this.setState({ searchMedia: !this.state.searchMedia, mediaType: media });
	}

	switchLink = () => {
		this.props.toggleMediaButton();
		this.setState({ shareLink: !this.state.shareLink });
	}

	switchPicture = () => {
		this.props.toggleMediaButton();
		this.setState({ sharePicture: !this.state.sharePicture });
	}

	switchState = () => {
		this.props.toggleMediaButton();
		this.setState({ shareState: !this.state.shareState });
	}

	shareTextPost = async( userInput, privacyRange, alerts ) => {
		var i;
		if ( userInput ) {
			const { mentions, hashtags } = await extract(
				userInput, { symbol: false, type: "all" }
			);
			api.createPost( userInput, mentions, hashtags, privacyRange, alerts )
				.then( res => {
					if ( res === "jwt expired" ) {
						refreshToken()
							.then(() => this.shareTextPost())
							.catch( err => console.log( err ));
					} else if ( res ) {
						this.props.addPost( res.newPost );
						this.props.switchMediaOptions();
						this.props.toggleMediaButton();
						if ( res.mentionsNotifications ) {
							const notifLength = res.mentionsNotifications.length;
							for ( i = 0; i < notifLength; i++ ) {
								this.props.socket.emit(
									"sendNotification", res.mentionsNotifications[ i ]
								);
							}
						}
					}
				}).catch( err => console.log( err ));
		}
	};

	handlePicture = e => {
		this.props.toggleMediaButton();
		this.setState({
			mediaData: {
				imageFile: e.target.files[ 0 ],
				image: URL.createObjectURL( e.target.files[ 0 ])
			},
			sharePicture: true
		});
	}

	submitPicture = async( description, privacyRange, alerts ) => {
		var
			data = new FormData(),
			i;

		const
			{ mediaData } = this.state,
			{ mentions, hashtags } = await extract(
				description, { symbol: false, type: "all" }
			);

		if ( !mediaData.imageFile ) {
			return;
		}

		await data.append( "picture", mediaData.imageFile );
		await data.append( "content", description );
		await data.append( "mentions", mentions );
		await data.append( "hashtags", hashtags );
		await data.append( "privacyRange", privacyRange );
		await data.append( "alerts", alerts );
		await data.append( "token", localStorage.getItem( "token" ));

		api.createMediaPicture( data )
			.then( res => {
				if ( res === "jwt expired" ) {
					refreshToken()
						.then(() => this.submitPicture())
						.catch( err => console.log( err ));
				} else if ( res ) {
					this.props.addPost( res.newPost );
					this.props.switchMediaOptions();
					this.props.toggleMediaButton();
					if ( res.mentionsNotifications ) {
						const notifLength = res.mentionsNotifications.length;
						for ( i = 0; i < notifLength; i++ ) {
							this.props.socket.emit(
								"sendNotification", res.mentionsNotifications[ i ]
							);
						}
					}
				}
			}).catch( err => console.log( err ));
	}

	render() {
		if ( this.state.searchMedia ) {
			return (
				<div>
					<MediaDimmer />
					<StyledSearchMedia
						socket={this.props.socket}
						mediaType={this.state.mediaType}
						switchSearchMedia={this.switchSearchMedia}
						socialCircle={this.state.socialCircle}
						toggleMediaButton={this.props.toggleMediaButton}
					/>
				</div>
			);
		}
		if ( this.state.shareState ) {
			return (
				<div>
					<MediaDimmer />
					<ShareBox
						shareTextPost={this.shareTextPost}
						switchState={this.switchState}
						socialCircle={this.state.socialCircle}
					/>
				</div>
			);
		}
		if ( this.state.shareLink ) {
			return (
				<div>
					<MediaDimmer />
					<ShareLink
						submitLink={this.submitLink}
						switchLink={this.switchLink}
						socialCircle={this.state.socialCircle}
					/>
				</div>
			);
		}
		if ( this.state.sharePicture ) {
			return (
				<div>
					<MediaDimmer />
					<MediaPicture
						mediaData={this.state.mediaData}
						socialCircle={this.state.socialCircle}
						switchPicture={this.switchPicture}
						submitPicture={this.submitPicture}
					/>
				</div>
			);
		}
		return (
			<MediaOptionsWrapper>
				<MediaDimmer />
				<MediaButtons>
					<MediaButton secondary circular icon="book" size="huge"
						onClick={() => this.switchSearchMedia( "book" )}
					/>
					<MediaButton secondary circular icon="music" size="huge"
						onClick={() => this.switchSearchMedia( "music" )}
					/>
					<MediaButton secondary circular icon="linkify" size="huge"
						onClick={this.switchLink}
					/>
					<PictureUploadWrapper>
						<MediaButton secondary circular icon="picture" size="huge"
							onClick={() => document.getElementById( "pictureInput" ).click()}
						>
						</MediaButton>
						<PictureUploadInput type="file" name="picture" id="pictureInput"
							onChange={this.handlePicture}
						/>
					</PictureUploadWrapper>
					<MediaButton secondary circular icon="film" size="huge"
						onClick={() => this.switchSearchMedia( "movie" )}
					/>
					<MediaButton secondary circular icon="tv" size="huge"
						onClick={() => this.switchSearchMedia( "tv" )}
					/>
					<MediaButton secondary circular icon="pencil" size="huge"
						onClick={this.switchState}
					/>
				</MediaButtons>
			</MediaOptionsWrapper>
		);
	}
}

MediaOptions.propTypes = {
	addPost: PropTypes.func.isRequired,
	switchMediaOptions: PropTypes.func.isRequired,
	toggleMediaButton: PropTypes.func.isRequired
};

const
	mapStateToProps = state => ({
	}),

	mapDispatchToProps = dispatch => ({
		addPost: post => dispatch( addPost( post )),
		switchMediaOptions: () => dispatch( switchMediaOptions())
	});

export default connect( mapStateToProps, mapDispatchToProps )( MediaOptions );
