import * as React from "react";
import { Everything } from "../../interfaces";
import * as Snap from "snapsvg";
import { Plant, PlantOptions } from "../plant";
import { savePlant } from "../actions";
import { API } from "../../api";
import { connect } from "react-redux";

interface GardenMapProps extends Everything {
  params: {
    species: string;
  };
}

function fromScreenToGarden(mouseX: number, mouseY: number, boxX: number, boxY: number) {
  let rawX = mouseX - boxX;
  let rawY = boxY - mouseY;

  return { x: rawX, y: rawY };
}

@connect((state: Everything) => state)
export class GardenMap extends React.Component<GardenMapProps, {}> {
  handleDragOver(e: React.DragEvent<HTMLElement>) {
    // Perform drop availability here probably
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  handleDragEnter(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  findCrop(slug?: string) {
    let crops = this.props.designer.cropSearchResults;
    let crop = _(crops).find((result) => result.crop.slug === slug);
    return crop || {
      crop: {
        binomial_name: "binomial_name",
        common_names: "common_names",
        name: "name",
        row_spacing: "row_spacing",
        spread: "spread",
        description: "description",
        height: "height",
        processing_pictures: "processing_pictures",
        slug: "slug",
        sun_requirements: "sun_requirements"
      },
      image: "http://placehold.it/350x150"
    };
  }

  handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();

    let el = document.querySelector("#drop-area > svg");
    if (!el) {
      throw new Error("why");
    } else {
      let box = el.getBoundingClientRect();
      let p: PlantOptions = fromScreenToGarden(e.pageX, e.pageY, box.left, box.bottom);
      // TEMPORARY SOLUTION =======
      let OFEntry = this.findCrop(this.props.params.species);
      p.img_url = OFEntry.image;
      // TODO: Why is Natural-Food saving with a whitespace and not a "-"?
      p.img_url.replace(" ", "-");
      p.openfarm_slug = OFEntry.crop.slug;
      p.name = OFEntry.crop.name || "Mystery Crop";
      // END TEMPORARY SOLUTION =======
      let plant = Plant(p);
      let baseUrl: string = API.current.baseUrl;
      this.props.dispatch(savePlant(plant, baseUrl));
    }
  }

  componentDidMount() {

    let s = Snap("#svg");
    let move = function (dx: number, dy: number) {
      this.attr({
        transform: this.data("origTransform") +
        (this.data("origTransform") ? "T" : "t") + [dx, dy]
      });
    };

    let start = function () {
      this.data("origTransform", this.transform().local);
    };

    let stop = function () {
      console.log(event);
    };

    this.props.designer.plants.map(plant => {
      let plot = s.image(plant.icon_url, plant.x, plant.y, 45, 45);
      plot.drag(move, start, stop);
    });

  }

  render() {
    return <div className="drop-area"
      id="drop-area"
      onDrop={this.handleDrop.bind(this)}
      onDragEnter={this.handleDragEnter}
      onDragOver={this.handleDragOver}>
      <svg id="svg"></svg>
    </div>;
  }
}
