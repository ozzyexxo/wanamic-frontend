import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import FollowCheck from "../containers/FollowCheck";

const
	MatchesWrapper = styled.div`
		margin: 50px 0px;
	`,
	MatchFullname = styled.h2`
		margin: 0px;
		grid-area: n;
	`,
	MatchUsername = styled.span`
		color: #808080;
		grid-area: u;
	`,
	MatchDescription = styled.p`
		padding: 5px;
		grid-area: d;
	`,
	StyledFollowCheck = styled( FollowCheck )`
		grid-area: f;
		justify-self: left;
	`,
	Match = styled.div`
		display: grid;
		grid-template-areas:
			"n f"
			"u u"
			"d d"
	`;

class Step4 extends Component {
	render() {
		return (
			<div>
				<h2>Step 4</h2>
				<MatchesWrapper className="matchesWrapper">
					{this.props.matchedUsers.map(( user, index ) =>
						<Match key={index}>
							<MatchFullname>{user.fullname}</MatchFullname>
							<MatchUsername>{user.username}</MatchUsername>
							<MatchDescription>{user.description}</MatchDescription>
							<StyledFollowCheck
								username={user.username}
								handleFollow={this.props.handleFollow}
							/>
						</Match>
					)}
				</MatchesWrapper>
				<Button
					className="nextButton"
					primary
					floated="right"
					content="Next"
					onClick={this.props.finish}
				/>
				<Button
					className="prevButton"
					secondary
					floated="left"
					content="Prev"
					onClick={this.props.handlePrev}
				/>
			</div>
		);
	}
}

export default Step4;
