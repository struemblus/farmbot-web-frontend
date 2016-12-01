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
                        <Link to="/app/account">
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
    return <button className={`nav-sync button-like ${color}`}
        onClick={() => { dispatch(sync()); } }>
        {dirty ? t("Sync Required") : t("Synced")}
    </button>;
};

let links = [
    { name: "Farm Designer", icon: "leaf", url: "/app/designer" },
    { name: "Controls", icon: "keyboard-o", url: "/app/controls" },
    { name: "Devices", icon: "cog", url: "/app/devices" },
    { name: "Sequences", icon: "server", url: "/app/sequences" },
    {
        name: "Regimens", icon: "calendar-check-o",
        url: "/app/regimens"
    },
    { name: "Tools", icon: "wrench", url: "/app/tools" }
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
        let pageName = location.href.split("/").pop(); // ¯\_(ツ)_/¯
        return <nav role="navigation">
            <button
                onClick={this.toggleNav.bind(this)}>
                <i className="fa fa-bars"></i>
            </button>
            <span className="page-name">{pageName}</span>
            <div className={`links ${mobileMenuClass}`}>
                <ul>
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
                {/** TODO: Getting the links from the desktop dropdown to the 
                    mobile slide-out menu involves gnarly (and probably mobile-
                    incompatible) CSS. I'll look into this one. -CV */}
                <ul className="mobile-menu-extras">
                    <li>
                        <Link to="/app/account"
                            onClick={this.toggleNav.bind(this)}>
                            <i className="fa fa-cog"></i>{t("Account Settings")}
                        </Link>
                    </li>
                    <li>
                        <a onClick={this.logout.bind(this)}>
                            <i className="fa fa-sign-out"></i>{t("Logout")}
                        </a>
                    </li>
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
