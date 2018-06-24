import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ExplorePage from "./ExplorePage";
import sinon from "sinon";

const mockStore = configureStore();
Enzyme.configure({ adapter: new Adapter() });

describe( "<ExplorePage/>", () => {
	var
		wrapper,
		socketSpy = sinon.spy(),
		store;

	beforeEach(() => {
		store = mockStore({
			posts: [],
			notifications: { displayNotifications: false },
			messages: { displayMessages: false }
		});
		wrapper = shallow(
			<ExplorePage
				socket={{ emit: socketSpy, on: socketSpy }}
				store={store}
			/>
		).dive();
	});

	it( "Checks that <ExplorePage/> renders", () => {
		expect( wrapper ).to.have.length( 1 );
	});

	it( "Checks that every <ExplorePage/> children renders", () => {
		expect( wrapper.children().children()).to.have.length( 3 );
	});

	it( "Checks that changing state.renderProfile changes the return", () => {
		expect( wrapper.find( ".exploreProfile" )).to.have.length( 0 );
		expect( wrapper.find( ".exploreMainWrapper" )).to.have.length( 1 );
		wrapper.setState({ renderProfile: true });
		expect( wrapper.find( ".exploreProfile" )).to.have.length( 1 );
		expect( wrapper.find( ".exploreMainWrapper" )).to.have.length( 0 );
	});

	it( "Checks that clicking the header icons changes the MainComponent", () => {
		expect( wrapper.find( ".exploreUsers" )).to.have.length( 0 );
		expect( wrapper.find( ".exploreContent" )).to.have.length( 1 );
		wrapper.find( ".userIcon" ).simulate( "click" );
		expect( wrapper.find( ".exploreUsers" )).to.have.length( 1 );
		expect( wrapper.find( ".exploreContent" )).to.have.length( 0 );
		wrapper.find( ".contentIcon" ).simulate( "click" );
		expect( wrapper.find( ".exploreUsers" )).to.have.length( 0 );
		expect( wrapper.find( ".exploreContent" )).to.have.length( 1 );
	});
});
