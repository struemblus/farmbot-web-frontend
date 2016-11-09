import * as hbs from "handlebars";

interface StaticConfigSettings {
    templateName: string;
}

export default function ({templateName}: StaticConfigSettings) {

    var template = require("./" + templateName + ".hbs");

    var isProd = (global as any).WEBPACK_ENV === "production";
    console.log(`WEBPACK ENV is ${(global as any).WEBPACK_ENV}`);
    var locals = {
        isProd
    };

    return template(locals);

}
