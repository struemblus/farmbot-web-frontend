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

export let DropDown = ({ auth, onClick, sync }: DropDownProps) => {
    if (!auth) { return <span></span>; }
    let hasName = auth.user && auth.user.name;
    let greeting = hasName ? `${hasName} ▾` : "";
    return (
        <div className="nav-dropdown">
            <span>{greeting}</span>
            <div className="dropdown-content">
                <ul>
                    <li>
                        <Link to="/app/dashboard/account"
                            className="settings-button">
                            Account Settings <i className="fa fa-cog"></i>
                        </Link>
                    </li>
                    <li>
                        <a onClick={onClick} className="logout-button">
                            Logout <i className="fa fa-sign-out"></i>
                        </a>
                    </li>
                </ul>
                <div className="version-links">
                    <span>API: <a href="https://github.com/FarmBot/Farmbot-Web-API"
                        target="_blank">{sync.api_version}</a></span>
                    <span>Frontend: <a href="https://github.com/FarmBot/farmbot-web-frontend"
                        target="_blank">{process.env.SHORT_REVISION}</a></span>
                </div>
            </div>
        </div>
    );
};

let SyncButton = ({auth, bot, dispatch}: NavButtonProps) => {
    if (!auth) { return <span></span>; }
    let dirty = bot.dirty;
    let color = dirty ? "yellow" : "green";
    return <button className={`nav-sync button-like ${color}`}
        onClick={() => { dispatch(sync()); } }>
        {dirty ? t("Sync Required") : t("Synced")}
    </button>;
};

let links = [
    { name: "Farm Designer", icon: "leaf", url: "/app/dashboard/designer" },
    { name: "Controls", icon: "keyboard-o", url: "/app/dashboard/controls" },
    { name: "Device", icon: "cog", url: "/app/dashboard/devices" },
    { name: "Sequences", icon: "server", url: "/app/dashboard/sequences" },
    { name: "Regimens", icon: "calendar-check-o", url: "/app/dashboard/regimens" },
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
            <div>
                <button className="fa fa-bars d-hide"
                    onClick={this.toggleNav.bind(this)}>
                </button>
            </div>
            <div>
                <ul className={mobileMenuClass}>
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
            <div><SyncButton { ...this.props } /></div>
            <div><Ticker { ...this.props } /></div>
            <div>
                <DropDown onClick={this.logout.bind(this)} { ...this.props } />
            </div>
            <div><EStopButton { ...this.props } /></div>
            <div className={`mobile-menu-underlay ${mobileMenuClass}`}
                onClick={this.toggleNav.bind(this)}></div>
        </nav>;
    }
}

export let NavBar = connect((state: Everything) => state)(XNavBar);
