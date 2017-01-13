webpackJsonp([0],{

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = __webpack_require__(3);
var components_1 = __webpack_require__(700);
var react_redux_1 = __webpack_require__(412);
var ui_1 = __webpack_require__(41);
var Tools = (function (_super) {
    __extends(Tools, _super);
    function Tools() {
        return _super.apply(this, arguments) || this;
    }
    Tools.prototype.render = function () {
        var editing = this.props.tools.editorMode;
        var isEditingTools = this.props.tools.tools.isEditing;
        return React.createElement(ui_1.Page, { className: "tools" },
            React.createElement(ui_1.Col, { md: 8 },
                !editing && (React.createElement(components_1.ToolBayList, { all: this.props.tools, dispatch: this.props.dispatch })),
                editing && (React.createElement(components_1.ToolBayForm, { all: this.props.tools, dispatch: this.props.dispatch }))),
            React.createElement(ui_1.Col, { md: 4 },
                !isEditingTools && (React.createElement(components_1.ToolList, { all: this.props.tools, dispatch: this.props.dispatch })),
                isEditingTools && (React.createElement(components_1.ToolForm, { all: this.props.tools, dispatch: this.props.dispatch }))));
    };
    return Tools;
}(React.Component));
Tools = __decorate([
    react_redux_1.connect(function (state) { return state; })
], Tools);
exports.Tools = Tools;


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var axios = __webpack_require__(21);
var i18next_1 = __webpack_require__(20);
var api_1 = __webpack_require__(85);
var ui_1 = __webpack_require__(41);
var _ = __webpack_require__(42);
var util_1 = __webpack_require__(52);
/** Generic */
function startEditingToolBays() {
    return { type: "EDIT_TOOL_BAYS_START", payload: {} };
}
exports.startEditingToolBays = startEditingToolBays;
function stopEditingToolBays() {
    return { type: "EDIT_TOOL_BAYS_STOP", payload: {} };
}
exports.stopEditingToolBays = stopEditingToolBays;
function startEditingTools() {
    return { type: "EDIT_TOOLS_START", payload: {} };
}
exports.startEditingTools = startEditingTools;
function stopEditingTools() {
    return { type: "EDIT_TOOLS_STOP", payload: {} };
}
exports.stopEditingTools = stopEditingTools;
/** ToolBays */
function saveToolBayNo(toolBays) {
    return { type: "SAVE_TOOL_BAY_NO", payload: ui_1.error };
}
exports.saveToolBayNo = saveToolBayNo;
function saveToolBayOk(toolBay) {
    return { type: "SAVE_TOOL_BAY_OK", payload: toolBay };
}
exports.saveToolBayOk = saveToolBayOk;
function updateToolBay(id, value) {
    return { type: "UPDATE_TOOL_BAY", payload: { id: id, value: value } };
}
exports.updateToolBay = updateToolBay;
function saveToolBay(id, toolBays) {
    var bay = _.findWhere(toolBays, { id: id });
    return function (dispatch, getState) {
        axios
            .patch(api_1.API.current.toolBaysPath + id, bay)
            .then(function (resp) {
            dispatch(saveToolBayOk(resp.data));
        }, function (e) {
            dispatch(saveToolBayNo(e));
            ui_1.error(i18next_1.t("ToolBay could not be updated: " + e.message));
        });
    };
}
exports.saveToolBay = saveToolBay;
/** ToolSlots */
function updateToolSlot(id, name, value) {
    return { type: "UPDATE_TOOL_SLOT", payload: { id: id, name: name, value: value } };
}
exports.updateToolSlot = updateToolSlot;
function addToolSlotOk(toolSlot) {
    return { type: "ADD_TOOL_SLOT_OK", payload: toolSlot };
}
exports.addToolSlotOk = addToolSlotOk;
function addToolSlotNo(error) {
    return { type: "ADD_TOOL_SLOT_NO", payload: error };
}
exports.addToolSlotNo = addToolSlotNo;
function saveToolSlotOk(toolSlot) {
    return { type: "SAVE_TOOL_SLOTS_OK", payload: toolSlot };
}
exports.saveToolSlotOk = saveToolSlotOk;
function updateToolSlotOk(toolSlot) {
    return { type: "UPDATE_TOOL_SLOT_OK", payload: toolSlot };
}
exports.updateToolSlotOk = updateToolSlotOk;
function updateToolSlotNo(error) {
    return { type: "UPDATE_TOOL_SLOT_NO", payload: error };
}
exports.updateToolSlotNo = updateToolSlotNo;
function destroyToolSlotOk(id) {
    return { type: "DESTROY_TOOL_SLOT_OK", payload: { id: id } };
}
exports.destroyToolSlotOk = destroyToolSlotOk;
function destroyToolSlotNo(error) {
    return { type: "DESTROY_TOOL_SLOT_NO", payload: error };
}
exports.destroyToolSlotNo = destroyToolSlotNo;
function addToolSlot(slot, tool_bay_id) {
    var x = slot.x, y = slot.y, z = slot.z, tool_id = slot.tool_id;
    var data = { x: x, y: y, z: z, tool_id: tool_id, tool_bay_id: tool_bay_id };
    return function (dispatch, getState) {
        axios
            .post(api_1.API.current.toolSlotsPath, data)
            .then(function (resp) {
            dispatch(addToolSlotOk(resp.data));
        }, function (e) {
            dispatch(addToolSlotNo(e));
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.addToolSlot = addToolSlot;
function saveToolSlots(toolSlots) {
    return function (dispatch, getState) {
        var dirtSlots = {
            tool_slots: toolSlots.filter(function (allSlots) { return !!allSlots.dirty; })
        };
        var url = api_1.API.current.toolSlotsPath;
        axios.post(url, dirtSlots)
            .then(function (resp) {
            ui_1.success(i18next_1.t("ToolBay saved."));
            dispatch(saveToolSlotOk(resp.data));
        }, function (e) {
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.saveToolSlots = saveToolSlots;
function destroySlot(id) {
    return function (dispatch, getState) {
        axios
            .delete(api_1.API.current.toolSlotsPath + id)
            .then(function (resp) {
            dispatch(destroyToolSlotOk(id));
        }, function (e) {
            dispatch(destroyToolSlotNo(e));
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.destroySlot = destroySlot;
/** Tools */
function updateTool(id, value) {
    return { type: "UPDATE_TOOL", payload: { id: id, value: value } };
}
exports.updateTool = updateTool;
function saveToolsOk(tools) {
    return { type: "SAVE_TOOLS_OK", payload: tools };
}
exports.saveToolsOk = saveToolsOk;
function saveToolNo(error) {
    return { type: "SAVE_TOOL_NO", payload: error };
}
exports.saveToolNo = saveToolNo;
function addToolOk(tool) {
    return { type: "ADD_TOOL_OK", payload: tool };
}
exports.addToolOk = addToolOk;
function addToolNo(error) {
    return { type: "ADD_TOOL_NO", payload: error };
}
exports.addToolNo = addToolNo;
function destroyToolOk(id) {
    return { type: "DESTROY_TOOL_OK", payload: { id: id } };
}
exports.destroyToolOk = destroyToolOk;
function destroyToolNo(error) {
    return { type: "DESTROY_TOOL_NO", payload: error };
}
exports.destroyToolNo = destroyToolNo;
function saveTools(tools) {
    return function (dispatch, getState) {
        function finish() {
            ui_1.success(i18next_1.t("Tools saved."));
            dispatch(stopEditingTools());
        }
        var dirtyTools = tools.filter(function (allTools) { return !!allTools.dirty; });
        // Return early if API call not required.
        if (!dirtyTools.length) {
            return finish();
        }
        axios.post(api_1.API.current.toolsPath, { tools: dirtyTools })
            .then(function (resp) {
            finish();
            dispatch(saveToolsOk(resp.data));
        }, function (e) {
            dispatch(saveToolNo(e));
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.saveTools = saveTools;
function destroyTool(id) {
    return function (dispatch, getState) {
        axios
            .delete(api_1.API.current.toolsPath + id)
            .then(function (resp) {
            dispatch(destroyToolOk(id));
        }, function (e) {
            dispatch(destroyToolNo(e));
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.destroyTool = destroyTool;
function addTool(name) {
    return function (dispatch, getState) {
        axios
            .post(api_1.API.current.toolsPath, { name: name })
            .then(function (resp) {
            dispatch(addToolOk(resp.data));
        }, function (e) {
            dispatch(addToolNo(e));
            ui_1.error(util_1.prettyPrintApiErrors(e));
        });
    };
}
exports.addTool = addTool;


/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(703));
__export(__webpack_require__(704));
__export(__webpack_require__(702));
__export(__webpack_require__(701));


/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var actions_1 = __webpack_require__(699);
var i18next_1 = __webpack_require__(20);
var ui_1 = __webpack_require__(41);
var ToolForm = (function (_super) {
    __extends(ToolForm, _super);
    function ToolForm() {
        var _this = _super.call(this) || this;
        _this.add = _this.add.bind(_this);
        _this.set = _this.set.bind(_this);
        _this.save = _this.save.bind(_this);
        _this.updateToolName = _this.updateToolName.bind(_this);
        _this.state = { name: "" };
        return _this;
    }
    ToolForm.prototype.add = function () {
        this.props.dispatch(actions_1.addTool(this.state.name));
        this.setState({ name: "" });
    };
    ToolForm.prototype.updateToolName = function (e) {
        var _a = e.currentTarget, id = _a.id, value = _a.value;
        this.props.dispatch(actions_1.updateTool(parseInt(id), value));
    };
    ToolForm.prototype.save = function () {
        this.props.dispatch(actions_1.saveTools(this.props.all.tools.all));
    };
    ToolForm.prototype.set = function (e) {
        this.setState({ name: e.currentTarget.value });
    };
    ToolForm.prototype.render = function () {
        var _a = this, set = _a.set, add = _a.add, updateToolName = _a.updateToolName, save = _a.save;
        var dispatch = this.props.dispatch;
        var tools = this.props.all.tools;
        var stopEdit = function () { dispatch(actions_1.stopEditingTools()); };
        return React.createElement(ui_1.Col, null,
            React.createElement(ui_1.Widget, null,
                React.createElement(ui_1.WidgetHeader, { helpText: i18next_1.t("This is a list of all your FarmBot Tools.\n                      Click the Edit button to add, edit, or delete tools."), title: "TOOLS" },
                    React.createElement("button", { className: "green button-like", onClick: function () { save(); } },
                        i18next_1.t("SAVE"),
                        tools.dirty && ("*")),
                    React.createElement("button", { className: "gray button-like", onClick: stopEdit }, i18next_1.t("BACK"))),
                React.createElement(ui_1.WidgetBody, null,
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, i18next_1.t("TOOL NAME")))),
                        React.createElement("tbody", null,
                            tools.all.map(function (tool, index) {
                                index++;
                                var name = tool.name, id = tool.id;
                                return React.createElement("tr", { key: index },
                                    React.createElement("td", null,
                                        React.createElement(ui_1.BlurableInput, { value: name || "Error getting Name", onCommit: updateToolName, id: id.toString(), name: index.toString() })),
                                    React.createElement("td", null,
                                        React.createElement("button", { className: "button-like \n                                                red", onClick: function () {
                                                dispatch(actions_1.destroyTool(id));
                                            } },
                                            React.createElement("i", { className: "fa fa-times" }))));
                            }),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("input", { value: this.state.name, onChange: set, name: "name" })),
                                React.createElement("td", null,
                                    React.createElement("button", { className: "button-like \n                                                green", onClick: function () { dispatch(add); } },
                                        React.createElement("i", { className: "fa fa-plus" })))))))));
    };
    return ToolForm;
}(React.Component));
exports.ToolForm = ToolForm;
;


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var ui_1 = __webpack_require__(41);
var actions_1 = __webpack_require__(699);
var i18next_1 = __webpack_require__(20);
var ToolList = (function (_super) {
    __extends(ToolList, _super);
    function ToolList() {
        return _super.apply(this, arguments) || this;
    }
    ToolList.prototype.render = function () {
        var _this = this;
        var onClick = function () { _this.props.dispatch(actions_1.startEditingTools()); };
        return React.createElement(ui_1.Col, null,
            React.createElement(ui_1.Widget, null,
                React.createElement(ui_1.WidgetHeader, { helpText: i18next_1.t("This is a list of all your FarmBot Tools.\n                      Click the Edit button to add, edit, or delete tools."), title: "TOOLS" },
                    React.createElement("button", { className: "gray button-like", onClick: onClick }, i18next_1.t("EDIT"))),
                React.createElement(ui_1.WidgetBody, null,
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "TOOL NAME"),
                                React.createElement("th", null, "STATUS"))),
                        React.createElement("tbody", null, this.props.all.tools.all.map(function (tool, index) {
                            var name = tool.name;
                            index++;
                            return React.createElement("tr", { key: index },
                                React.createElement("td", null, name),
                                React.createElement("td", null, "INACTIVE"));
                        }))))));
    };
    return ToolList;
}(React.Component));
exports.ToolList = ToolList;
;


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var ui_1 = __webpack_require__(41);
var ui_2 = __webpack_require__(41);
var actions_1 = __webpack_require__(699);
var i18next_1 = __webpack_require__(20);
var ToolBayForm = (function (_super) {
    __extends(ToolBayForm, _super);
    function ToolBayForm() {
        var _this = _super.call(this) || this;
        _this.set = _this.set.bind(_this);
        _this.updateCoordinate = _this.updateCoordinate.bind(_this);
        _this.updateToolBayName = _this.updateToolBayName.bind(_this);
        _this.updateToolSlotTool = _this.updateToolSlotTool.bind(_this);
        _this.addToolSlot = _this.addToolSlot.bind(_this);
        _this.updateToolSelect = _this.updateToolSelect.bind(_this);
        _this.resetState = _this.resetState.bind(_this);
        _this.saveAll = _this.saveAll.bind(_this);
        _this.state = { x: 0, y: 0, z: 0, tool_id: null };
        return _this;
    }
    ToolBayForm.prototype.resetState = function () {
        this.setState({ x: 0, y: 0, z: 0, tool_id: null });
    };
    ToolBayForm.prototype.set = function (e) {
        var _a = e.currentTarget, name = _a.name, value = _a.value;
        this.setState((_b = {}, _b[name] = parseInt(value), _b));
        var _b;
    };
    ToolBayForm.prototype.updateCoordinate = function (e) {
        var _a = e.currentTarget, id = _a.id, name = _a.name, value = _a.value;
        var dispatch = this.props.dispatch;
        dispatch(actions_1.updateToolSlot(parseInt(id), name, parseInt(value)));
    };
    ToolBayForm.prototype.updateToolSlotTool = function (e) {
        var _a = e.currentTarget, id = _a.id, value = _a.value;
        var name = "tool_id";
        var dispatch = this.props.dispatch;
        dispatch(actions_1.updateToolSlot(parseInt(id), name, parseInt(value)));
    };
    ToolBayForm.prototype.updateToolBayName = function (e) {
        var _a = e.currentTarget, id = _a.id, value = _a.value;
        this.props.dispatch(actions_1.updateToolBay(parseInt(id), value));
    };
    ToolBayForm.prototype.updateToolSelect = function (e) {
        this.setState({ tool_id: parseInt(e.currentTarget.value) });
    };
    ToolBayForm.prototype.addToolSlot = function (tool_bay_id) {
        this.props.dispatch(actions_1.addToolSlot(this.state, tool_bay_id));
        this.resetState();
    };
    ToolBayForm.prototype.saveAll = function (tool_bay_id) {
        var dispatch = this.props.dispatch;
        var _a = this.props.all, tool_slots = _a.tool_slots, tool_bays = _a.tool_bays;
        dispatch(actions_1.saveToolSlots(tool_slots));
        dispatch(actions_1.saveToolBay(tool_bay_id, tool_bays));
    };
    ToolBayForm.prototype.renderTools = function (tool_id, slot_id) {
        var defaultValue = 0;
        var options = this.props.all.tools.all.map(function (tool, index) {
            index++;
            var id = tool.id, name = tool.name;
            if (tool.id === tool_id) {
                defaultValue = id;
            }
            ;
            return React.createElement("option", { value: id, id: (slot_id || "").toString(), key: index }, name);
        });
        return React.createElement(ui_1.Select, { id: (slot_id || "").toString(), onChange: this.updateToolSlotTool, value: defaultValue.toString() },
            options,
            React.createElement("option", { value: "0" }, "---"));
    };
    ToolBayForm.prototype.renderSlots = function (tool_bay_id) {
        var _this = this;
        return this.props.all.tool_slots.map(function (slot, index) {
            index++;
            var x = slot.x, y = slot.y, z = slot.z, tool_id = slot.tool_id;
            var slot_id = slot.id;
            return React.createElement("tr", { key: index },
                React.createElement("td", null, index),
                React.createElement("td", null,
                    React.createElement(ui_2.BlurableInput, { type: "number", id: (slot_id || "").toString(), name: "x", value: (x || "0").toString(), onCommit: _this.updateCoordinate })),
                React.createElement("td", null,
                    React.createElement(ui_2.BlurableInput, { type: "number", id: (slot_id || "").toString(), name: "y", value: (y || "0").toString(), onCommit: _this.updateCoordinate })),
                React.createElement("td", null,
                    React.createElement(ui_2.BlurableInput, { type: "number", id: (slot_id || "").toString(), name: "z", value: (z || "0").toString(), onCommit: _this.updateCoordinate })),
                React.createElement("td", null, _this.renderTools(tool_id, slot_id)),
                React.createElement("td", null,
                    React.createElement("button", { className: "button-like red", onClick: function () {
                            /** TODO: This isn't right, but if I make the id
                             *  required, TS throws errors everywhere. I'll
                             *  have to come back to this. -CV
                            */
                            _this.props.dispatch(actions_1.destroySlot(slot_id || 0));
                        } },
                        React.createElement("i", { className: "fa fa-times" }))));
        });
    };
    ToolBayForm.prototype.render = function () {
        var _this = this;
        var _a = this, set = _a.set, updateCoordinate = _a.updateCoordinate, updateToolBayName = _a.updateToolBayName, addToolSlot = _a.addToolSlot, updateToolSelect = _a.updateToolSelect, saveAll = _a.saveAll;
        var dispatch = this.props.dispatch;
        var _b = this.props.all, tool_bays = _b.tool_bays, tools = _b.tools;
        var stopEdit = function () { dispatch(actions_1.stopEditingToolBays()); };
        return React.createElement(ui_2.Col, null, tool_bays.map(function (bay, index) {
            index++;
            var name = bay.name;
            var _a = _this.state, x = _a.x, y = _a.y, z = _a.z;
            var tool_bay_id = bay.id;
            return React.createElement(ui_1.Widget, { key: index },
                React.createElement(ui_1.WidgetHeader, { helpText: i18next_1.t("Toolbays are where you store your FarmBot\n                          Tools. Each Toolbay has Slots that you can put your\n                          Tools in, which should be reflective of your real\n                          FarmBot hardware configuration."), title: name },
                    React.createElement("button", { className: "green button-like", onClick: function () { saveAll(tool_bay_id); } },
                        i18next_1.t("SAVE"),
                        bay.dirty && ("*")),
                    React.createElement("button", { className: "gray button-like", onClick: stopEdit }, i18next_1.t("BACK"))),
                React.createElement(ui_1.WidgetBody, null,
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", null, "TOOLBAY NAME")),
                                React.createElement("td", null,
                                    React.createElement(ui_2.BlurableInput, { value: name, onCommit: updateToolBayName, id: (tool_bay_id || "").toString() }))))),
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "SLOT"),
                                React.createElement("th", null, "X"),
                                React.createElement("th", null, "Y"),
                                React.createElement("th", null, "Z"),
                                React.createElement("th", null, "TOOL"))),
                        React.createElement("tbody", null,
                            _this.renderSlots(tool_bay_id),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement(ui_2.BlurableInput, { value: (x || "0").toString(), type: "number", name: "x", onCommit: set })),
                                React.createElement("td", null,
                                    React.createElement(ui_2.BlurableInput, { value: (y || "0").toString(), type: "number", name: "y", onCommit: set })),
                                React.createElement("td", null,
                                    React.createElement(ui_2.BlurableInput, { value: (z || "0").toString(), type: "number", name: "z", onCommit: set })),
                                React.createElement("td", null,
                                    React.createElement(ui_1.Select, { onChange: updateToolSelect, value: (_this.state.tool_id || "0")
                                            .toString() },
                                        tools.all.map(function (tool, iTool) {
                                            iTool++;
                                            return React.createElement("option", { key: iTool, value: tool.id }, tool.name);
                                        }),
                                        React.createElement("option", { key: tools.all.length + 1, value: "0" }, "---"))),
                                React.createElement("td", null,
                                    React.createElement("button", { className: "button-like\n                                                    green", onClick: function () { return addToolSlot(tool_bay_id); } },
                                        React.createElement("i", { className: "fa fa-plus" }))))))));
        }));
    };
    return ToolBayForm;
}(React.Component));
exports.ToolBayForm = ToolBayForm;
;


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(3);
var ui_1 = __webpack_require__(41);
var actions_1 = __webpack_require__(699);
var _ = __webpack_require__(42);
var i18next_1 = __webpack_require__(20);
var ToolBayList = (function (_super) {
    __extends(ToolBayList, _super);
    function ToolBayList() {
        return _super.apply(this, arguments) || this;
    }
    ToolBayList.prototype.renderTool = function (tool_id) {
        var tools = this.props.all.tools;
        return tools.all.map(function (tool, index) {
            index++;
            if (tool_id === tool.id) {
                return React.createElement("td", { key: index }, tool.name);
            }
        });
    };
    ToolBayList.prototype.renderSlots = function (tool_bay_id) {
        var _this = this;
        var _a = this.props.all, tool_slots = _a.tool_slots, tools = _a.tools;
        var currentSlots = _.where(tool_slots, { tool_bay_id: tool_bay_id });
        return currentSlots.map(function (slot, index) {
            index++;
            var x = slot.x, y = slot.y, z = slot.z, tool_id = slot.tool_id;
            return React.createElement("tr", { key: index },
                React.createElement("td", null, index),
                React.createElement("td", null, x),
                React.createElement("td", null, y),
                React.createElement("td", null, z),
                tools.all.length > 0 && (_this.renderTool(tool_id)),
                tools.all.length === 0 && (React.createElement("td", null, "---")));
        });
    };
    ToolBayList.prototype.render = function () {
        var _this = this;
        var onClick = function () { _this.props.dispatch(actions_1.startEditingToolBays()); };
        var tool_bays = this.props.all.tool_bays;
        return React.createElement(ui_1.Col, null, tool_bays.map(function (bay, index) {
            index++;
            var id = bay.id, name = bay.name;
            return React.createElement(ui_1.Widget, { key: index },
                React.createElement(ui_1.WidgetHeader, { helpText: i18next_1.t("Toolbays are where you store your FarmBot\n                          Tools. Each Toolbay has Slots that you can put your\n                          Tools in, which should be reflective of your real\n                          FarmBot hardware configuration."), title: name },
                    React.createElement("button", { className: "gray button-like", onClick: onClick }, i18next_1.t("EDIT"))),
                React.createElement(ui_1.WidgetBody, null,
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "SLOT"),
                                React.createElement("th", null, "X"),
                                React.createElement("th", null, "Y"),
                                React.createElement("th", null, "Z"),
                                React.createElement("th", null, "TOOL"))),
                        React.createElement("tbody", null, _this.renderSlots(id)))));
        }));
    };
    return ToolBayList;
}(React.Component));
exports.ToolBayList = ToolBayList;
;


/***/ })

});
//# sourceMappingURL=0.js.map