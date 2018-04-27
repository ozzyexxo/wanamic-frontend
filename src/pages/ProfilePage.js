import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ShareBox from "../components/ShareBox";
import NewsFeed from "../components/NewsFeed";
import api from "../services/api";
import InfiniteScroll from "react-infinite-scroller";
var
	backgroundImg,
	profileImg;

const
	Wrapper = styled.div`
		height: 100vh;
		width: 100%;
		overflow: auto;
		::-webkit-scrollbar {
			@media (max-width: 420px) {
				display: none !important;
			}
		}
	`,
	StyledInfiniteScroll = styled( InfiniteScroll )`
		@media (max-width: 420px) {
			height: 100%;
			width: 100%;
			display: grid;
			grid-template-columns: 100%;
			grid-template-rows: 25% 45% auto;
			grid-template-areas:
				"h"
				"i"
				"p"
		}
	`,
	Header = styled.div`
		@media (max-width: 420px) {
			grid-area: h;
			border-bottom: 1px solid #000;
			background-image: ${props => props.image};
			background-repeat: no-repeat;
			background-size: cover;
		}
	`,
	Information = styled.div`
		@media (max-width: 420px) {
			grid-area: i;

			display: grid;
			grid-template-columns: 45% 55%;
			grid-template-rows: 50% 50%;
			grid-template-areas:
				"i o"
				"d d"
		}
	`,
	BasicInfo = styled.div`
		@media (max-width: 420px) {
			grid-area: i;
			position: relative;
			display: grid;
			padding: 10px;
		}
	`,
	UserImage = styled.img`
		@media (max-width: 420px) {
			width: 116px;
			height: 116px;
			position: absolute;
			top: -62px;
			left: 10px;
			border-radius: 4px;
		}
	`,
	Names = styled.span`
		align-self: center;
	`,
	UserName = styled.h2`
		@media (max-width: 420px) {
			margin: 0px;
		}
	`,
	NickName = styled.span`
		@media (max-width: 420px) {
			color: #D3D3D3;
		}
	`,
	Options = styled.div`
		@media (max-width: 420px) {
			grid-area: o;
			display: grid;
			grid-template-columns: 100%;
			grid-template-rows: 33% 66%;
			grid-template-areas:
				"buttons"
				"kw"
		}
	`,
	Buttons = styled.span`
		grid-area: buttons;
		align-self: center;
		justify-self: center;
	`,
	Keywords = styled.span`
		grid-area: kw;
		align-self: center;
	`,
	Description = styled.div`
		@media (max-width: 420px) {
			padding: 10px;
			grid-area: d;
			text-align: left;
			align-self: center;
		}
	`,
	Timeline = styled.div`
		@media (max-width: 420px) {
			grid-area: p;
		}
	`;


class ProfilePage extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			posts: [],
			hasMore: true,
			skip: 1,
			isInfiniteLoading: false,
			empty: false,
			sharebox: ""
		};
	}

	componentWillMount() {
		this.refreshTimeline();
		api.getUserInfo( this.props.match.params.username )
			.then( res => {
				this.setImages( res.data.headerImage, res.data.profileImage );
				this.setState({
					user: res.data
				});
			})
			.catch( err => {
				console.log( err );
				this.setState({ inexistent: true });
			});
	}

	setImages( headerImage, profileImage ) {
		try {
			if ( headerImage ) {
				backgroundImg = require( "../images/" + headerImage );
			} else {
				backgroundImg = require( "../images/defaultbg.png" );
			}
		} catch ( err ) {
			console.log( err );
		}

		try {
			if ( profileImage ) {
				profileImg = require( "../images/" + profileImage );
			} else {
				profileImg = require( "../images/defaultUser.png" );
			}
		} catch ( err ) {
			console.log( err );
		}
	}

	getTimeline = () => {
		if ( this.state.hasMore && !this.state.isInfiniteLoading ) {
			this.setState({ isInfiniteLoading: true });
			api.getTimeline( this.state.skip, this.props.match.params.username )
				.then( res => {
					if ( res.data.length < 10 ) {
						this.setState({ hasMore: false, isInfiniteLoading: false });
						return;
					}
					this.setState({
						posts: [ ...this.state.posts, ...res.data ],
						isInfiniteLoading: false,
						skip: this.state.skip + 1
					});
				}).catch( err => console.log( err ));
		}
	}

	refreshTimeline = () => {
		api.getTimeline( 0, this.props.match.params.username )
			.then( res => {
				this.setState({
					posts: res.data
				});
			}).catch( err => console.log( err ));
	}

	updatePost = ( postIndex, updatedContent ) => {
		var posts = this.state.posts;
		posts[ postIndex ].content = updatedContent;
		this.setState({ posts: posts });
	}

	handleChange = e =>
		this.setState({ [ e.target.name ]: e.target.value });

	handleShare = () => {
		if ( this.state.sharebox !== "" ) {
			const post = {
				post: { content: this.state.sharebox }
			};

			api.createPost( post )
				.then(() => this.refreshTimeline())
				.catch( err => console.log( err ));

			this.setState({ sharebox: "" });
		}
	}

	handleAddFriend = () => {
		api.addFriend( this.props.match.params.username )
			.then( res => console.log( res ))
			.catch( err => console.log( err ));
	}

	handleFollow = () => {
		api.followUser( this.props.match.params.username )
			.then( res => console.log( res ))
			.catch( err => console.log( err ));
	}

	render() {
		if ( this.state.inexistent ) {
			return (
				<h2>This account doesn't exist</h2>
			);
		} else {
			return (
				<Wrapper>
					<StyledInfiniteScroll
						pageStart={this.state.skip}
						hasMore={this.state.hasMore}
						loadMore={this.getTimeline}
						initialLoad={false}
						useWindow={false}
					>
						<Header image={`url(${backgroundImg})`} />
						<Information>
							<BasicInfo>
								<UserImage src={profileImg} />
								<Names>
									<UserName>{this.state.user.fullname}</UserName>
									<NickName>@{this.state.user.username}</NickName>
								</Names>
							</BasicInfo>
							<Options>
								<Buttons>
									<Button
										onClick={this.handleAddFriend}
										primary
										size="tiny"
										content="Add Friend"
									/>
									<Button
										onClick={this.handleFollow}
										secondary
										size="tiny"
										content="Follow"
									/>
									<Button size="tiny" icon="mail outline" />
								</Buttons>
								<Keywords>
									{this.state.user.keywords}
								</Keywords>
							</Options>
							<Description>
								<p>{this.state.user.description}</p>
							</Description>
						</Information>
						<Timeline>
							<ShareBox
								handleChange={this.handleChange}
								sharebox={this.state.sharebox}
								handleShare={this.handleShare}
							/>
							<NewsFeed
								posts={this.state.posts}
								getNewsFeed={this.getTimeline}
								updatePost={this.updatePost}
								hasMore={this.state.hasMore}
								skip={this.state.skip}
							/>
						</Timeline>
					</StyledInfiniteScroll>
				</Wrapper>
			);
		}
	}
}

export default ProfilePage;
