// import * as React from "react";
// import { ToolProps, ToolState } from "../interfaces";
// import { Widget, WidgetBody, WidgetHeader } from "../../ui";
// import { startEditing } from "../actions";
// import * as _ from "lodash";
// import { t } from "i18next";

// export class ToolList extends React.Component<ToolProps, ToolState> {
//     render() {
//         let { tools, toolBays } = this.props.all;
//         let onClick = () => { this.props.dispatch(startEditing()); };
//         return <div>
//             {tools.map(tool => {
//                 let { name, bay_id } = tool;
//                 return <Widget key={name}>
//                     <WidgetHeader
//                         helpText="Tools are for tooling."
//                         title={name}>
//                         <button
//                             className="gray button-like widget-control"
//                             onClick={onClick}>
//                             {t("EDIT")}
//                         </button>
//                     </WidgetHeader>
//                     <WidgetBody>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>TOOL</th>
//                                     <th>SLOT</th>
//                                     <th>STATUS</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {toolBays.map(bay => {
//                                     if (bay.id === bay_id) {
//                                         return <tr>
//                                             <td>{name}</td>
//                                             {/** Need to iterate over slots */}
//                                             <td>{bay.name}</td>
//                                             <td>INACTIVE</td>
//                                         </tr>;
//                                     };
//                                 })}
//                             </tbody>
//                         </table>
//                     </WidgetBody>
//                 </Widget>;
//             })}
//         </div>;
//     }
// };
