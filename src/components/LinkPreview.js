import React, { Component } from "react";
import { Image, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

const
	LinkPreviewWrapper = styled.div`
		display: grid;
		height: auto;
		grid-template-columns: 100%;
		grid-row-gap: ${props => props.explore ? "0" : "7px"};
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"img"
			"txt"
	`,
	LinkPreviewImage = styled( Image )`
		grid-area: img;
		position: absolute !important;
		height: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto !important;
		border-radius: ${props => props.explore ? "8px" : "0"};
		filter: ${props => props.explore && "brightness( 85% )"};
	`,
	LinkPreviewIframe = styled.iframe`
		grid-area: img;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: ${props => props.explore ? "8px" : "0"};
		border: none;
	`,
	LinkMedia = styled.div`
		position: relative;
		height: 0;
		padding-bottom: 100%;
		:hover {
			cursor: pointer;
		}
		@media (min-width: 760px) {
			padding-bottom: ${props => props.details ?
		( props.video ? "50%" : "420px" ) : "100%"};

			width: ${props => props.details && !props.video && "420px"};
			margin: ${props => props.details && !props.video && "0 auto"};
		}
	`,
	LinkPreviewText = styled.div`
		grid-area: txt;
		padding: 5px 10px;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 50% 50%;
		grid-template-areas:
			"head"
			"host"
	`,
	LinkPreviewHeader = styled.h4`
		grid-area: head;
		margin-bottom: 5px;
	`,
	LinkPreviewHostname = styled.span`
		grid-area: host;
		color: #808080;
		font-size: 13px;
	`,
	PlayIcon = styled( Icon )`
		position: absolute !important;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto !important;
		font-size: 2.5rem !important;
		color: rgba( 255, 255, 255, 0.75 );
	`,
	LinkIcon = styled( Icon )`
		position: absolute !important;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto !important;
		font-size: 2.5rem !important;
		color: rgba( 255, 255, 255, 0.75 );
	`;


class LinkPreview extends Component {
	render() {
		const { linkContent } = this.props;
		if ( this.props.explore ) {
			return (
				<LinkPreviewWrapper
					explore={this.props.explore ? 1 : 0}
					className="linkPreviewWrapper"
				>
					<LinkMedia>
						<LinkPreviewImage
							explore={this.props.explore ? 1 : 0}
							className="linkPreviewImage"
							src={linkContent.type === "image" ?
								linkContent.url : linkContent.image}
						/>
						{linkContent.embeddedUrl ?
							<PlayIcon name="video play" />
							:
							<LinkIcon name="linkify" />
						}
					</LinkMedia>

				</LinkPreviewWrapper>
			);
		}
		return (
			<LinkPreviewWrapper
				className="linkPreviewWrapper"
			>
				<LinkMedia
					video={linkContent.embeddedUrl}
					details={this.props.details}
					onClick={this.props.displayPostDetails}
				>
					{linkContent.embeddedUrl ?
						<LinkPreviewIframe
							src={linkContent.embeddedUrl}
							frameBorder="0"
							allow="autoplay; encrypted-media"
							allowFullScreen="allowfullscreen"
						/>
						:
						<LinkPreviewImage src={linkContent.type === "image" ?
							linkContent.url : linkContent.image} />
					}
				</LinkMedia>

				{linkContent.type !== "image" &&
					<LinkPreviewText>
						<a href={linkContent.url} target="_blank">
							<LinkPreviewHeader>
								{linkContent.title}
							</LinkPreviewHeader>
						</a>
						<a
							href={`https://${linkContent.hostname}`}
							target="_blank"
						>
							<LinkPreviewHostname>
								{linkContent.hostname}
							</LinkPreviewHostname>
						</a>
					</LinkPreviewText>}
			</LinkPreviewWrapper>
		);
	}
}

LinkPreview.propTypes = {
	linkContent: PropTypes.object.isRequired,
	explore: PropTypes.bool,
	details: PropTypes.bool,
	displayPostDetails: PropTypes.func
};

export default LinkPreview;
