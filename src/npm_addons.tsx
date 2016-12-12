// This module dynamically loads an NPM module of the author's choosing.
// In the case of FarmBot, Inc (the "public servers"), we use this file
// to load non-opensource tools, such as RollBar error reporting.
declare var SHORT_REVISION: string;

if (process.env.NPM_ADDON) {
    SHORT_REVISION = process.env.SHORT_REVISION;
    require(process.env.NPM_ADDON);
}
