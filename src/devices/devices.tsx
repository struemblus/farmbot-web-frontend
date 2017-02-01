import * as React from "react";
import { connect } from "react-redux";
import { RpcBotLog as BotLog } from "../devices/interfaces";
import * as moment from "moment";
import { Everything } from "../interfaces";
import { t } from "i18next";
import { WeedDetector } from "../images";
import { HardwareSettings } from "./components/hardware_settings";
import { FarmbotOsSettings } from "./components/farmbot_os_settings";

// TODO HACK : This is the biggest refactor target in the app right now.
// Numerous issues: uses local variables instead of component state, references
// Farmbot object and Redux .bot property (redundant).
@connect((state: Everything) => state)
export class Devices extends React.Component<Everything, {}> {

    render() {
        if (this.props.auth) {
            let auth = this.props.auth;
            return <div className="all-content-wrapper">
                <div className="row">
                    <div className={`col-md-6 col-sm-6 col-xs-12 col-sm-12`}>
                        <div className="widget-wrapper devices-widget">
                            <div className="row">
                                <FarmbotOsSettings {...this.props} auth={auth} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <HardwareSettings {...this.props} />
                        <WeedDetector {...this.props} />
                    </div>
                </div>
            </div>;
        } else {
            throw new Error("Log in first");
        }
    }
};

interface LogsProps {
    logs: BotLog[];
}

function Logs({logs}: LogsProps) {
    function HasLogs(_: LogsProps) {
        function displayTime(t: number): string {
            return moment.unix(t).format("D MMM h:mma");
        }

        function displayCoordinates(log: BotLog) {
            // Stringify coords bcuz 0 is falsy in JS.
            let x = log.meta.x;
            let y = log.meta.y;
            let z = log.meta.z;

            if (x && y && z) {
                return `${x}, ${y}, ${z}`;
            } else {
                return "Unknown";
            }
        }

        return <tbody>
            {
                logs.map((log, i) => <tr key={i}>
                    <td> {displayTime(log.created_at)} </td>
                    <td> {log.message} </td>
                    <td> {displayCoordinates(log)} </td>
                </tr>)
            }
        </tbody>;
    }

    function NoLogs(_: LogsProps) {
        return <tbody>
            <tr>
                <td colSpan={3}>
                    <p>{t("No logs yet.")}</p>
                </td>
            </tr>
        </tbody>;
    }
    return (logs.length ? <HasLogs logs={logs} /> : <NoLogs logs={logs} />);
}
