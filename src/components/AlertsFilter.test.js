import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import AlertsFilter from "./AlertsFilter";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

describe( "<AlertsFilter/>", () => {
	const
		wrapper = shallow(
			<AlertsFilter nsfw={false} spoiler={false} handleFilter={() => {}} />
		),
		wrapper2 = shallow(
			<AlertsFilter nsfw={false} spoiler={true} handleFilter={() => {}} />
		);

	it( "Checks that <AlertsFilter/> renders", () => {
		expect( wrapper ).to.have.length( 1 );
	});

	it( "Checks that <AlertsFilter/> children not render", () => {
		expect( wrapper.children()).to.have.length( 0 );
	});

	it( "Checks that <AlertsFilter/> children render when props are true", () => {
		expect( wrapper2.children()).to.have.length( 1 );
	});
});