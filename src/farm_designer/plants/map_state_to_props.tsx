import { Everything } from "../../interfaces";
import { EditPlantInfoProps } from "../interfaces";
import { maybeFindPlantById } from "../../resources/selectors";
import { history } from "../../history";
import * as moment from "moment";
import { TaggedPlant } from "../../resources/tagged_resources";

export function mapStateToProps(props: Everything): EditPlantInfoProps {
  let findPlant = (id: string | undefined) => {
    let num = parseInt(id || "NOPE", 10);
    if (_.isNumber(num) && !_.isNaN(num)) {
      return maybeFindPlantById(props.resources.index, num);
    }
  };

  return {
    findPlant,
    push: history.push,
    dispatch: props.dispatch,
  }
}

/** All of the info a user would need to know about a plant, formatted and
 * ready to use by the UI. */
export interface formattedPlantInfo {
  x: number;
  y: number;
  id: number | undefined;
  name: string;
  uuid: string;
  daysOld: number;
  plantedAt: string;
}
export function formatPlantInfo(resource: TaggedPlant): formattedPlantInfo {
  let p = resource.body;
  return {
    id: p.id,
    name: p.name,
    daysOld: (moment().diff(moment(p.planted_at), "days") + 1),
    x: p.x,
    y: p.y,
    uuid: resource.uuid,
    plantedAt: moment(p.planted_at).format("MMMM Do YYYY, h:mma")
  }
}
