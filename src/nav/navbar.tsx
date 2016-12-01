import * as React from "react";
import { Link } from "react-router";
import { sync } from "../devices/actions";
import { Ticker } from "../ticker/ticker";
import { Everything } from "../interfaces";
import { NavButtonProps, DropDownProps, NavBarState } from "./interfaces";
import { EStopButton } from "../devices/components/e_stop_btn";
import { connect } from "react-redux";
import { t } from "i18next";
import { Session } from "../session";

let DropDown = ({ auth, onClick, sync }: DropDownProps) => {
    if (!auth) { return <span></span>; }
    let hasName = auth.user && auth.user.name;
    let greeting = hasName ? `${hasName} ▾` : "";
    return (
        <div className="nav-dropdown">
            <span>{greeting}</span>
            <div className="nav-dropdown-content">
                <ul>
                    <li>
                        <Link to="/app/dashboard/account">
                            <i className="fa fa-cog"></i>{t("Account Settings")}
                        </Link>
                    </li>
                    <li>
                        <a onClick={onClick}>
                            <i className="fa fa-sign-out"></i>{t("Logout")}
                        </a>
                    </li>
                </ul>
                <div className="version-links">
                    <span>API:
                    <a href="https://github.com/FarmBot/Farmbot-Web-API"
                            target="_blank">{sync.api_version}
                        </a>
                    </span>
                    <span>Frontend:
                    <a href="https://github.com/FarmBot/farmbot-web-frontend"
                            target="_blank">{process.env.SHORT_REVISION}
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

let SyncButton = ({auth, bot, dispatch}: NavButtonProps) => {
    if (!auth) { return <span></span>; }
    let dirty = bot.dirty;
    let color = dirty ? "yellow" : "green";
    return <div>
        <button className={`nav-sync button-like ${color}`}
            onClick={() => { dispatch(sync()); } }>
            {dirty ? t("Sync Required") : t("Synced")}
        </button>
    </div>;
};

let links = [
    { name: "Farm Designer", icon: "leaf", url: "/app/dashboard/designer" },
    { name: "Controls", icon: "keyboard-o", url: "/app/dashboard/controls" },
    { name: "Devices", icon: "cog", url: "/app/dashboard/devices" },
    { name: "Sequences", icon: "server", url: "/app/dashboard/sequences" },
    {
        name: "Regimens", icon: "calendar-check-o",
        url: "/app/dashboard/regimens"
    },
    { name: "Tools", icon: "wrench", url: "/app/dashboard/tools" }
];

class XNavBar extends React.Component<Everything, NavBarState> {
    constructor() {
        super();
        this.state = {
            mobileNavExpanded: false
        };
    }

    toggleNav() {
        this.setState({
            mobileNavExpanded: !this.state.mobileNavExpanded
        });
    }

    logout() {
        Session.clear();
        location.reload(true);
    }

    render() {
        let mobileMenuClass = this.state.mobileNavExpanded ? "expanded" : "";
        return <nav role="navigation">
            <button className="fa fa-bars d-hide"
                onClick={this.toggleNav.bind(this)}>
            </button>
            <div>
                <ul className={`links ${mobileMenuClass}`}>
                    {links.map(link => {
                        return (
                            <li key={link.url}>
                                <Link to={link.url}
                                    onClick={this.toggleNav.bind(this)}
                                    activeClassName="active">
                                    <i className={`fa fa-${link.icon}`} />
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <SyncButton { ...this.props } />
            <EStopButton { ...this.props } />
            <Ticker { ...this.props } />
            <DropDown onClick={this.logout.bind(this)} { ...this.props } />
            <div className={`underlay ${mobileMenuClass}`}
                onClick={this.toggleNav.bind(this)}></div>
        </nav>;
    }
}

export let NavBar = connect((state: Everything) => state)(XNavBar);
