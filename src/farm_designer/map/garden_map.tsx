import * as React from "react";
import { Everything } from "../../interfaces";
import { Plant, PlantOptions } from "../plant";
import { savePlant } from "../actions";
import { connect } from "react-redux";
import * as moment from "moment";
import * as Snap from "snapsvg";

interface GardenMapProps extends Everything {
  params: {
    species: string;
  };
}

function fromScreenToGarden(mouseX: number, mouseY: number, boxX: number, boxY: number) {
  /** The offset of 50px is made for the setDragImage to make it in the
   * center of the mouse for accuracy which is why this is being done.
   * Once we get more dynamic with the values (different size plants),
   * we can tweak this accordingly. 
   */
  let newMouseX = mouseX - 25;
  let newMouseY = mouseY - 25;
  /* */

  let rawX = newMouseX - boxX;
  let rawY = newMouseY - boxY;

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
    console.log(this.props);
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
      let p: PlantOptions = fromScreenToGarden(e.pageX, e.pageY, box.left, box.top);
      // TEMPORARY SOLUTION =======
      let OFEntry = this.findCrop(this.props.params.species);
      p.img_url = OFEntry.image;
      p.openfarm_slug = OFEntry.crop.slug;
      p.name = OFEntry.crop.name || "Mystery Crop";
      p.planted_at = moment().toISOString();
      // END TEMPORARY SOLUTION =======
      let plant = Plant(p);
      this.props.dispatch(savePlant(plant));
    }
  }

  render() {
    return <div className="drop-area"
      id="drop-area"
      onDrop={this.handleDrop.bind(this)}
      onDragEnter={this.handleDragEnter.bind(this)}
      onDragOver={this.handleDragOver.bind(this)}>
      <svg id="svg">
        {
          this
            .props
            .sync
            .plants
            .map((p, inx) => <image key={inx}
              x={(p.x * 10)}
              y={(p.y * 10)}
              width="32"
              height="32"
              href={"/app-resources/img/icons/Apple-96.png"} />)
        }
      </svg>
    </div>;
  }
}
