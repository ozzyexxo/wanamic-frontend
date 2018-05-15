import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import MediaStep3 from "./MediaStep3";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

describe( "<MediaStep3/>", () => {
	var
		prevStepSpy = sinon.spy(),
		nextStepSpy = sinon.spy(),
		privacyRangeSpy = sinon.spy(),
		wrapper = shallow(
			<MediaStep3
				mediaData={{}}
				privacyRange={1}
				DefaultCover={""}
				prevStep={prevStepSpy}
				handleSubmit={nextStepSpy}
				setPrivacyRange={privacyRangeSpy}
			/>
		);

	it( "Checks that <MediaStep3/> renders", () => {
		expect( wrapper ).to.have.length( 1 );
	});

	it( "Checks that <MediaStep3/> children renders", () => {
		expect( wrapper.children()).to.have.length( 2 );
		expect( wrapper.children().children()).to.have.length( 4 );
	});

	it( "Checks that nextButton calls nextStep", () => {
		expect( nextStepSpy.called ).to.equal( false );
		wrapper.find( ".nextButton" ).simulate( "click" );
		expect( nextStepSpy.called ).to.equal( true );
	});

	it( "Checks that prevButton calls prevStep", () => {
		expect( prevStepSpy.called ).to.equal( false );
		wrapper.find( ".prevButton" ).simulate( "click" );
		expect( prevStepSpy.called ).to.equal( true );
	});

	it( "Checks that privacyButton2 calls handleChangeSpy", () => {
		expect( privacyRangeSpy.called ).to.equal( false );
		wrapper.find( ".privacyButton2" ).simulate( "click" );
		expect( privacyRangeSpy.called ).to.equal( true );
	});

});
