import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { Page, Row, Col } from "../ui";
import { fetchAll } from "./actions";
import { success } from "../ui";

class XTools extends React.Component<Everything, ToolsState> {
    componentDidMount() {
        success(
            "Subscribe to the FarmBot.io mailing list for news and updates.",
            "Work in Progress"
        );
    }
    render() {
        let editing = this.props.tools.editorMode;
        return <Page>
            <Row>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
            </Row>
        </Page>;
    }
}

export let Tools = connect((state: Everything) => state)(XTools);
