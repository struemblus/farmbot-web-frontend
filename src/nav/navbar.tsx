import * as React from "react";
import { Link } from "react-router";
import {
  sync
} from "../devices/actions";
import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { Ticker } from "../ticker/ticker";
import { Everything } from "../interfaces";
import { EStopButton } from "../devices/e_stop_btn";
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
}

export let DropDown = ({ auth, onClick }: DropDownProps) => {
  if (!auth.authenticated) { return <span></span>; }
  onClick = onClick || (() => {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  });
  let hasName = auth.user && auth.user.name;
  let greeting = hasName ? `${hasName} ▾` : "";
  return (
    <div className="nav-dropdown">
      <span>{greeting}</span>
      <div className="dropdown-content drop-shadow">
        <ul>
          <li>
            <Link to="/app/dashboard/account">
              Account Settings <i className="fa fa-cog"></i>
            </Link>
          </li>
          <li>
            <a onClick={onClick}>
              Logout <i className="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
        <div className="version-links">
          <span>API: <a href="https://github.com/FarmBot/Farmbot-Web-API"
            target="_blank">030AC00</a></span>
          <span>Frontend: <a href="https://github.com/FarmBot/farmbot-web-frontend"
            target="_blank">{process.env.SHORT_REVISION}</a></span>
        </div>
      </div>
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

let links = {
  "Farm Designer": "/app/dashboard/designer",
  "Controls": "/app/dashboard/controls",
  "Device": "/app/dashboard/devices",
  "Sequences": "/app/dashboard/sequences",
  "Regimens": "/app/dashboard/regimens",
};

export function Navbar(props: Everything) {
  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header drop-shadow">
          <button className="navbar-toggle"
            data-target="#navbar"
            data-toggle="collapse"
            type="button">
            <span className="glyphicon glyphicon-menu-hamburger" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav">
            {
              Object.keys(links).map((description) => {
                let url = (links as { [name: string]: string })[description];
                return (
                  <li key={url}>
                    <Link to={url}
                      activeClassName="fb-navbar-active-link">
                      {description}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
          <SyncButton { ...props } />
          <Ticker { ...props } />
          <DropDown { ...props } />
          <EStopButton { ...props } />
        </div>
      </div>
    </nav>
  );
};
