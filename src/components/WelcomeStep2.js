import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class Step2 extends Component {
	render() {
		return (
			<Form>
				<h2>Step 2</h2>
				<Form.TextArea
					className="descriptionArea"
					onChange={this.props.handleChange}
					name="description"
					label="Description"
				/>
				<Form.Input
					className="profileImageInput"
					name="userImage"
					onChange={this.props.handleFileChange}
					label="Profile Image"
					type="file"
				/>
				<Form.Button
					className="nextButton"
					primary
					type="button"
					floated="right"
					content="Next"
					onClick={this.props.handleNext}
				/>
			</Form>
		);
	}
}

export default Step2;
