import "../../unmock_i18next";
import * as React from "react";
import { render, mount } from "enzyme";
import { TitleBar } from "../weed_detector_title";

describe("<TitleBar/>", () => {
  it("Has a progress bar", () => {
    let props = {
      onSave: jest.fn(),
      onTest: jest.fn(),
      onPhotoClick: jest.fn(),
      onSettingToggle: jest.fn(),
      onDeletionClick: jest.fn(),
      settingsMenuOpen: false
    }
    let tb = mount(<TitleBar {...props} />);
    expect(tb.text().toLowerCase()).toContain("clear weeds");
    tb.setProps({ deletionProgress: "10%" });
    expect(tb.text().toLowerCase()).toContain("10%");
    expect(tb.text().toLowerCase()).not.toContain("clear weeds");
  });
});
