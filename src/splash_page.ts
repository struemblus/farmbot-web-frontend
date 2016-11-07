import * as hbs from "handlebars";

interface StaticConfigSettings {
    templateName: string;
}

export default function ({templateName}: StaticConfigSettings) {

    var template = require("./" + templateName + ".hbs");

    var local = {
        "header": "Welcome to the FarmBot Web App",
        "subHeader": "Setup, customize, and control FarmBot from any device",
        "callToAction": "Login or Create an Account",
    };

    return template(local);

}
