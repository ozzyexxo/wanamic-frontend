import React, { Component } from "react";
import { Dropdown, Modal, Form } from "semantic-ui-react";
import styled from "styled-components";
import PropTypes from "prop-types";

const
	UpdateModal = styled( Modal )`
		margin: 0px !important;
	`;

class DropdownOptions extends Component {
	render() {
		return (
			<Dropdown style={this.props.style} direction="left">
				{ localStorage.getItem( "username" ) === this.props.author ?
					<Dropdown.Menu className="postDropdown">
						<UpdateModal trigger={<Dropdown.Item text="Update" />} >
							<Modal.Content>
								<Form>
									<Form.Input
										className="postUpdateInput"
										name="updatedContent"
										value={this.props.updatedContent}
										onChange={this.props.handleChange}
									/>
									<Form.Button
										className="postUpdateButton"
										primary
										content="Update"
										onClick={this.props.handleUpdate}
									/>
								</Form>
							</Modal.Content>
						</UpdateModal>

						<Dropdown.Item
							className="postDeleteOption"
							text="Delete"
							onClick={this.props.handleDelete}
						/>
					</Dropdown.Menu>
					:
					<Dropdown.Menu className="postDropdown">
						<Dropdown.Item
							text="Report"
						/>
					</Dropdown.Menu>
				}
			</Dropdown>
		);
	}
}

DropdownOptions.propTypes = {
	author: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleUpdate: PropTypes.func.isRequired
};

export default DropdownOptions;
