import * as React from "react";
import { BackArrow } from "../../ui";
import { Everything } from "../../interfaces";
import { connect } from "react-redux";
import { t } from "i18next";
import { OpenFarmResults } from "./openfarm_search_results";
import { DesignerState, CropLiveSearchResult } from "../interfaces";
import { DEFAULT_ICON } from "../../open_farm/index";
import { OpenFarm, CropSearchResult } from "../openfarm";
import * as Axios from "axios";

interface SpeciesCatalogProps {
  cropSearchQuery: string;
  dispatch: Function;
  designer: DesignerState;
  cropSearchResults: CropLiveSearchResult[];
  srch: (e: React.FormEvent<HTMLInputElement>) => (dispatch: Function) => void;
}

let url = (q: string) => `${OpenFarm.cropUrl}?include=pictures&filter=${q}`;

let openFarmSearchQuery = _.throttle((q: string) =>
  Axios.get<CropSearchResult>(url(q)), 800);

function mapStateToProps(props: Everything): SpeciesCatalogProps {

  let srch = (e: React.FormEvent<HTMLInputElement>) => (dispatch: Function) => {

    let { value } = e.currentTarget;

    dispatch({ type: "SEARCH_QUERY_CHANGE", payload: value });

    openFarmSearchQuery(value)
      .then(resp => {
        // Pluck ID and URL of user-submitted OpenFarm crops...
        // EG: => { X1y3ZAA: "cabbage.png" }
        let images: { [key: string]: string } = {};

        _.get<OpenFarm.Included[]>(resp, "data.included", [])
          .map(item => {
            return {
              id: item.id,
              url: item.attributes.thumbnail_url
            };
          })
          .map((val, acc) => images[val.id] = val.url);

        let payload = resp.data.data.map(datum => {
          let crop = datum.attributes;
          let id = _.get<string>(datum, "relationships.pictures.data[0].id");
          return { crop, image: (images[id] || DEFAULT_ICON) };
        });

        dispatch({ type: "OF_SEARCH_RESULTS_OK", payload });
      });
  };

  return {
    srch,
    cropSearchQuery: props.resources.consumers.farm_designer.cropSearchQuery,
    designer: props.resources.consumers.farm_designer,
    dispatch: Function,
    cropSearchResults: props
      .resources
      .consumers
      .farm_designer
      .cropSearchResults || []
  };
}

@connect(mapStateToProps)
export class SpeciesCatalog extends React.Component<SpeciesCatalogProps, {}> {
  render() {
    return <div className="panel-container green-panel species-catalog-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow /> {t("Choose a species")}
        </p>
      </div>
      <div className="panel-content">
        <div className="thin-search-wrapper">
          <i className="fa fa-search"></i>
          <div className="thin-search">
            <input value={this.props.cropSearchQuery}
              onChange={(e) => { this.props.srch(e)(this.props.dispatch); }}
              className="search"
              placeholder="Search OpenFarm" />
          </div>
        </div>
        <div className="panel-content">
          <div className="crop-search-result-wrapper row">
            <OpenFarmResults cropSearchResults={this.props.cropSearchResults} />
          </div>
        </div>
      </div>
    </div>;
  }
}
