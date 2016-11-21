import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { Page, Row, NoContent } from "../ui";
import { fetchAll } from "./actions";

class XTools extends React.Component<Everything, ToolsState> {
    componentDidMount() {
        this.props.dispatch(fetchAll());
    }
    render() {
        let editing = this.props.tools.editorMode;
        let { tools, tool_bays } = this.props.tools;
        return <Page>
            <Row>
                <div className="col-md-6 col-lg-6 col-sm-6">
                    {tool_bays.length === 0 && (
                        <NoContent
                            name="ToolBay"
                            cb={() => {
                                console.log("add toolbay");
                            } } />
                    )}
                    {!editing && (
                        <ToolBayList
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                    {editing && (
                        <ToolBayForm
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                </div>
                <div className="col-md-6 col-lg-6 col-sm-6">
                    {tools.length === 0 && (
                        <NoContent
                            name="Tool"
                            cb={() => {
                                console.log("add tool");
                            } } />
                    )}
                    {!editing && (
                        <ToolList
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                    {editing && (
                        <ToolForm
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                </div>
            </Row>
        </Page>;
    }
}

export let Tools = connect((state: Everything) => state)(XTools);
