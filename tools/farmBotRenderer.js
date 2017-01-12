var merge = require("lodash.merge");
var hbs = require("handlebars");
var fs = require("fs");

function FarmBotRenderer(options) {
    this.options = merge({}, {
        path: "/",
        filename: "blah.html",
        outputPath: "/",
        isProd: false,
        exclude: []
    }, options);
}

FarmBotRenderer.prototype = {

    constructor: FarmBotRenderer,

    apply: function(compiler) {
        var self = this;

        compiler.plugin("after-emit", function(compilation, callback) {
            var options = compiler.options;
            var stats = compilation.getStats().toJson({
                hash: false,
                publicPath: true,
                assets: true,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            });

            var wantedAssets = [];

            stats.assets.map(function(asset) {
                var nameWithoutHash = asset.name.split(".")[0].toString();
                if (self.options.exclude.indexOf(nameWithoutHash) <= 0) {
                    wantedAssets.push({ name: asset.name });
                }
            })

            var finalPath = self.options.path;
            fs.readFile(finalPath, "utf-8", function(err, source) {

                wantedAssets.sort(function(a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });

                var data = self.options;
                data.wantedAssets = wantedAssets;
                var template = hbs.compile(source);

                var html = template(data);
                var outputDest = self.option.outputPath + self.options.filename;

                fs.writeFile(outputDest, html, function(err, data) {
                    if (err) { console.error("error in writing file", err); }
                });
            });

            callback();
        })
    }
}

module.exports = FarmBotRenderer;