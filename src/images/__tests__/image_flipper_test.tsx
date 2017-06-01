import "../../unmock_i18next";
import * as React from "react";
import { ImageFlipper } from "../image_flipper";
import { fakeImages } from "../../__test_support__/fake_state/images";
import * as freeze from "deep-freeze";
import { TaggedImage } from "../../resources/tagged_resources";
import { defensiveClone } from "../../util";
describe("<ImageFlipper/>", () => {
  let images: TaggedImage[] = [];

  fakeImages.forEach((item, index) => {
    let image = defensiveClone(item);
    image.uuid = `Position ${index}`;
    images.push(image);
  });

  describe("up/down flipping", () => {

    it("none selected, no images.", () => {
      let onFlip = jest.fn();
      let x = new ImageFlipper();
      let currentImage = undefined;
      x.props = { images: [], currentImage, onFlip };
      let up = x.go(1);
      let down = x.go(-1);
      down();
      expect(onFlip).toHaveBeenCalledWith(undefined);
      up();
      expect(onFlip).toHaveBeenCalledWith(undefined);
      up();
      expect(onFlip).toHaveBeenCalledWith(undefined);
    });

    it("none selected, with images.", () => {
      let onFlip = jest.fn();
      let x = new ImageFlipper();
      let currentImage = undefined;
      x.props = { images, currentImage, onFlip };
      let up = x.go(1);
      let down = x.go(-1);
      down();
      expect(onFlip).toHaveBeenCalledWith(undefined);
      onFlip.mockClear();
      up();
      expect(onFlip).toHaveBeenCalledWith(images[1].uuid);
      onFlip.mockClear();
      down();
      expect(onFlip).toHaveBeenCalledWith(undefined);
    });

    it("flips past current selected item", () => {
      let onFlip = jest.fn();
      let x = new ImageFlipper();
      let currentImage = images[1];
      x.props = { images, currentImage, onFlip };
      let up = x.go(1);
      let down = x.go(-1);
      down();
      expect(onFlip).toHaveBeenCalledWith(images[0].uuid);
      onFlip.mockClear();
      up();
      expect(onFlip).toHaveBeenCalledWith(images[1].uuid);
    });

    it("flips past last item");
  })
});
