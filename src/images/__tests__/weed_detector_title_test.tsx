import * as React from "react";
import { render } from "enzyme";
import { TitleBar } from "../weed_detector_title";

describe("<TitleBar/>", () => {
  it("Has a progress bar", () => {
    pending("http://stackoverflow.com/questions/43523664/jest-and-i18next-cant-see-text-in-react-component");
    let props = {
      onSave: jest.fn(),
      onTest: jest.fn(),
      onPhotoClick: jest.fn(),
      onSettingToggle: jest.fn(),
      onDeletionClick: jest.fn(),
      settingsMenuOpen: false
    }
    let tb = render(<TitleBar {...props} />);
  });
})
