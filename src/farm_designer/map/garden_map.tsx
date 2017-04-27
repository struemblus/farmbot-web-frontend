import * as React from "react";
import { Plant } from "../plant";
import { movePlant } from "../actions";
import * as moment from "moment";
import { GardenMapProps, GardenMapState } from "../interfaces";
import { GardenPlant } from "./garden_plant";
import { GardenPoint } from "./garden_point";
import { history } from "../../history";
import { initSave, save, edit } from "../../api/crud";
import { TaggedPlant } from "../../resources/tagged_resources";
import { Link } from "react-router";
import { translateScreenToGarden, round } from "./translate_screen_to_garden";
import { findBySlug } from "../search_selectors";
import { noop } from "lodash";

export class GardenMap
  extends React.Component<GardenMapProps, Partial<GardenMapState>> {

  endDrag = () => {
    let p = this.getPlant();
    if (p) {
      this.props.dispatch(edit(p, { x: round(p.body.x), y: round(p.body.y) }));
      this.props.dispatch(save(p.uuid));
    }
    this.setState({ isDragging: false, pageX: 0, pageY: 0 });
  }
  startDrag = () => this.setState({ isDragging: true });
  selectPlant = (selectedPlant: string) => this.setState({ selectedPlant });
  clearPlant = () => this.setState({ selectedPlant: undefined });
  get isEditing() { return location.pathname.includes("edit"); }
  getPlant = (): TaggedPlant | undefined => {
    return this
      .props
      .plants
      .filter(x => x.uuid === this.state.selectedPlant)[0];
  }
  constructor() {
    super();
    this.state = {};
  }

  handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  handleDragEnter(e: React.DragEvent<HTMLElement>) { e.preventDefault(); }

  findCrop(slug?: string) {
    return findBySlug(this.props.designer.cropSearchResults || [], slug);
  }

  handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    let el = document.querySelector("#drop-area > svg");
    if (el) {
      let box = el.getBoundingClientRect();
      let { x, y } = translateScreenToGarden(e.pageX, e.pageY, box.left, box.top);
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

  drag = (e: React.MouseEvent<SVGElement>) => {
    let plant = this.getPlant();
    if (this.isEditing && this.state.isDragging && plant) {
      let deltaX = e.pageX - (this.state.pageX || e.pageX);
      let deltaY = e.pageY - (this.state.pageY || e.pageY);

      this.setState({ pageX: e.pageX, pageY: e.pageY });
      this.props.dispatch(movePlant({ deltaX, deltaY, plant }));
    }
  }

  render() {
    let { dispatch, crops } = this.props;
    let updater = (plant: TaggedPlant) => (deltaX: number, deltaY: number) => {
      dispatch(movePlant({ deltaX, deltaY, plant }));
    };

    let dropper = (p: TaggedPlant) => () => {
      this.setState({ selectedPlant: p.uuid });
      dispatch(save(p.uuid));
    };

    let { selectedPlant } = this.state;
    return <div className="drop-area"
      id="drop-area"
      onDrop={this.handleDrop}
      onDragEnter={this.handleDragEnter}
      onDragOver={this.handleDragOver}>

      <svg id="drop-area-svg"
        onMouseUp={this.endDrag}
        onMouseDown={this.startDrag}
        onMouseMove={this.drag}>

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
            let selected = !!(selectedPlant && (p.uuid === selectedPlant));

            return <Link className="plant-link-wrapper"
              to={"/app/designer/plants/" + plantId}
              id={plantId || "NOT_SAVED"}
              onClick={noop}
              key={(plantId || index)}>
              <GardenPlant
                plant={p}
                selected={selected}
                dragging={selected && !!this.state.isDragging && this.isEditing}
                onClick={(plant) => { this.selectPlant(plant.uuid); }} />
            </Link>;
          })}

      </svg>

    </div>;
  }
}
