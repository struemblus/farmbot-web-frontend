import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolBayList, ToolBayForm } from "./components";
import { connect } from "react-redux";
import { Page, Row } from "../ui";
import { fetchToolBays } from "./actions";

class XTools extends React.Component<Everything, ToolsState> {
    componentDidMount() {
        this.props.dispatch(fetchToolBays());
    }
    render() {
        let editing = this.props.tools.editorMode;
        return <Page>
            <Row>
                {!editing && (
                    <ToolBayList
                        all={this.props.tools.all}
                        dispatch={this.props.dispatch}
                        />
                )}
                {editing && (
                    <ToolBayForm
                        all={this.props.tools.all}
                        dispatch={this.props.dispatch}
                        />
                )}
            </Row>
        </Page>;
    }
}

export let Tools = connect((state: Everything) => state)(XTools);
