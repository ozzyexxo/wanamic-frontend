import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import Newsfeed from "./Newsfeed";
import configureStore from "redux-mock-store";
import sinon from "sinon";

const mockStore = configureStore();
Enzyme.configure({ adapter: new Adapter() });

describe( "<Homepage/>", () => {
	var
		wrapper,
		socketSpy = sinon.spy(),
		store;

	beforeEach(() => {
		store = mockStore({
			posts: [],
			notifications: { displayNotifications: false },
			conversations: { displayMessages: false }
		});
		wrapper = shallow(
			<Newsfeed
				socket={{ emit: socketSpy, on: socketSpy }}
				store={store}
			/>
		).dive();
	});

	it( "Checks that <Newsfeed/> renders", () => {
		expect( wrapper ).to.have.length( 1 );
	});

	it( "Checks that every children renders", () => {
		expect( wrapper.children().children()).to.have.length( 3 );
	});
});