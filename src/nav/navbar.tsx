import * as React from "react";
import { Link } from "react-router";
import {
    sync
} from "../devices/actions";
import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { Ticker } from "../ticker/ticker";
import { Everything, Sync } from "../interfaces";
import { EStopButton } from "../devices/e_stop_btn";
import { connect } from "react-redux";
import { t } from "i18next";

interface NavButtonProps {
    auth: AuthState;
    dispatch: Function;
    bot: BotState;
    onClick?: () => void;
}

interface DropDownProps {
  auth: AuthState;
  onClick?: () => void;
  sync: Sync;
}

interface MobileNavToggleProps {
    toggleNav?: () => void;
}

interface NavMobileMenuToggleProps {
    onClick?: () => void;
}

export let DropDown = ({ auth, onClick, sync }: DropDownProps) => {
    if (!auth.authenticated) { return <span></span>; }

    let hasName = auth.user && auth.user.name;
    let greeting = hasName ? `${hasName} ▾` : "";
    return (
        <div className="nav-dropdown">
            <span>{greeting}</span>
            <div className="dropdown-content drop-shadow">
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
>>>>>>> mobile-nav-drawer
        </div>
    );
};

let SyncButton = ({auth, bot, dispatch}: NavButtonProps) => {
    if (!auth.authenticated) { return <span></span>; }
    let dirty = bot.dirty;
    let color = dirty ? "yellow" : "green";

    return <button className={"nav-sync button-like " + color}
        onClick={() => { dispatch(sync()); } }>
        {dirty ? t("Sync Required") : t("Synced")}
    </button>;
};

let links = [
    { name: "Farm Designer", data: ["leaf", "/app/dashboard/designer"] },
    { name: "Controls", data: ["keyboard-o", "/app/dashboard/controls"] },
    { name: "Device", data: ["cog", "/app/dashboard/devices"] },
    { name: "Sequences", data: ["server", "/app/dashboard/sequences"] },
    { name: "Regimens", data: ["calendar-check-o", "/app/dashboard/regimens"] }
];

interface NavBarState {
    mobileNavExpanded: boolean;
}

class XNavBar extends React.Component<Everything, NavBarState> {
    constructor() {
        super();
        this.state = {
            mobileNavExpanded: false
        };
    }
    toggleNav() {
        console.log(this.state);
        this.setState({
            mobileNavExpanded: !this.state.mobileNavExpanded
        });
    }
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
    render() {
        let mobileMenuClass = this.state.mobileNavExpanded ? "expanded" : "";
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header drop-shadow">
                        <button className="navbar-toggle"
                            onClick={this.toggleNav.bind(this)}
                            type="button">
                            <span className="glyphicon glyphicon-menu-hamburger" />
                        </button>
                    </div>
                    <div className="navbar-collapse"
                        id="navbar">
                        <ul className={`nav navbar-nav ${mobileMenuClass}`}>
                            {
                                links.map(link => {
                                    return (
                                        <li key={link.data[1]}>
                                            <Link to={link.data[1]}
                                                onClick={this.toggleNav.bind(this)}
                                                activeClassName="fb-navbar-active-link">
                                                <i className={`fa fa-${link.data[0]}`} />
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                            <li>
                                <a onClick={this.logout.bind(this)}
                                    className="logout-button-mobile">
                                    <i className="fa fa-sign-out"></i> Logout
                                </a>
                            </li>
                        </ul>
                        <SyncButton { ...this.props } />
                        <Ticker { ...this.props } />
                        <DropDown onClick={this.logout.bind(this)} { ...this.props } />
                        <EStopButton { ...this.props } />
                        <div className={`mobile-menu-underlay ${mobileMenuClass}`}
                            onClick={this.toggleNav.bind(this)}></div>
                    </div>
                </div>
            </nav>
        );
    }
}

export let NavBar = connect((state: Everything) => state)(XNavBar);
