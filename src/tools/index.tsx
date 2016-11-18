import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { Page, Row } from "../ui";
import { fetchAll } from "./actions";

class XTools extends React.Component<Everything, ToolsState> {
    componentDidMount() {
        this.props.dispatch(fetchAll());
    }
    render() {
        let editing = this.props.tools.editorMode;
        return <Page>
            <Row>
                <div className="col-md-6 col-lg-6 col-sm-6">
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
