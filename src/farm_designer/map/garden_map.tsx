import * as React from "react";
import { Plant } from "../plant";
import { movePlant } from "../actions";
import * as moment from "moment";
import { GardenMapProps, GardenMapState } from "../interfaces";
import { GardenPlant } from "./garden_plant";
import { GardenPoint } from "./garden_point";
import { history } from "../../history";
import { initSave, save } from "../../api/crud";
import { TaggedPlant } from "../../resources/tagged_resources";
import { Link } from "react-router";

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

export class GardenMap extends React.Component<GardenMapProps, GardenMapState> {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // Possible alternative to this? Maybe refs? Hmm...
    setTimeout(() => {
      let el = document.querySelector("#drop-area-svg");
      let map = el && el.getBoundingClientRect();
      map && this.setState({ map });
    }, 1);
  }

  handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  handleDragEnter = (e: React.DragEvent<HTMLElement>) => { e.preventDefault(); }

  findCrop(slug?: string) {
    let crops = this.props.designer.cropSearchResults || [];
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

  handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    let el = document.querySelector("#drop-area > svg");
    if (el) {
      let box = el.getBoundingClientRect();
      let { x, y } = fromScreenToGarden(e.pageX, e.pageY, box.left, box.top);
      let species = history.getCurrentLocation().pathname.split("/")[5];
      let OFEntry = this.findCrop(species);
      let p: TaggedPlant = {
        kind: "plants",
        uuid: "--never",
        dirty: true,
        body: Plant({
          x,
          y,
          openfarm_slug: OFEntry.crop.slug,
          name: OFEntry.crop.name || "Mystery Crop",
          planted_at: moment().toISOString(),
          spread: OFEntry.crop.spread
        })
      }
      this.props.dispatch(initSave(p));
    } else {
      throw new Error("never");
    }
  }

  handleOnClick = (plantId: string) => {

  }

  render() {
    let { dispatch, crops } = this.props;
    let updater = (plant: TaggedPlant) => (deltaX: number, deltaY: number) => {
      dispatch(movePlant({ deltaX, deltaY, plant }));
    };

    let dropper = (p: TaggedPlant) => () => {
      this.setState({ selectedUUID: "" });
      dispatch(save(p.uuid));
    };

    return <div className="drop-area"
      id="drop-area"
      onDrop={this.handleDrop}
      onDragEnter={this.handleDragEnter}
      onDragOver={this.handleDragOver}>

      <svg id="drop-area-svg" onMouseUp={() => { this.setState({ selectedUUID: "" }) }}>

        {this
          .props
          .points
          .map(p => {
            return <GardenPoint point={p} key={p.body.id} />;
          })}

        {this
          .props
          .plants
          .filter(x => !!x.body.id)
          .map((p, index) => {
            let plantId = (p.body.id || "ERR_NO_PLANT_ID").toString();
            let c = crops.find(x => x.body.slug === p.body.openfarm_slug);
            return <Link className="plant-link-wrapper"
              to={"/app/designer/plants/" + plantId}
              id={plantId}
              onClick={() => this.handleOnClick(plantId)}
              key={(plantId || index)}>
              <GardenPlant
                crop={c}
                plant={p}
                selected={p.uuid === this.state.selectedUUID}
                onClick={(uuid) => this.setState({ selectedUUID: uuid })}
                onUpdate={updater(p)}
                onDrop={dropper(p)} />
            </Link>;
          })}

      </svg>

    </div>;
  }
}
