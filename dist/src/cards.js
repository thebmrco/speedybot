"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedyCard = void 0;
var index_1 = require("./index");
var SpeedyCard = /** @class */ (function () {
    function SpeedyCard() {
        this.title = '';
        this.subtitle = '';
        this.titleConfig = {};
        this.subTitleConfig = {};
        this.choices = [];
        this.choiceConfig = {};
        this.image = '';
        this.imageConfig = {};
        this.buttonLabel = 'Submit';
        this.inputPlaceholder = '';
        this.inputConfig = {
            id: 'inputData',
        };
        this.url = '';
        this.urlLabel = 'Go';
        this.tableData = [];
        this.attachedData = {};
        this.needsSubmit = false;
        this.dateData = {};
        this.timeData = {};
        this.json = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": []
        };
    }
    SpeedyCard.prototype.setTitle = function (title, config) {
        this.title = title;
        if (config) {
            this.titleConfig = config;
        }
        return this;
    };
    SpeedyCard.prototype.setSubtitle = function (subtitle, config) {
        this.subtitle = subtitle;
        if (config) {
            this.subTitleConfig = config;
        }
        return this;
    };
    SpeedyCard.prototype.setChoices = function (choices, config) {
        this.choices = choices.map(function (choice, idx) {
            return {
                title: choice,
                value: String(choice)
            };
        });
        if (config) {
            this.choiceConfig = config;
        }
        return this;
    };
    SpeedyCard.prototype.setImage = function (url, imageConfig) {
        this.image = url;
        if (imageConfig) {
            this.imageConfig = imageConfig;
        }
        return this;
    };
    SpeedyCard.prototype.setButtonLabel = function (label) {
        this.buttonLabel = label;
        return this;
    };
    SpeedyCard.prototype.setInput = function (placeholder, config) {
        this.inputPlaceholder = placeholder;
        if (config) {
            this.inputConfig = config;
        }
        return this;
    };
    SpeedyCard.prototype.setUrl = function (url, label) {
        if (label === void 0) { label = 'Go'; }
        this.urlLabel = label;
        this.url = url;
        return this;
    };
    SpeedyCard.prototype.setTable = function (input) {
        var core = input;
        if (!Array.isArray(input) && typeof input === 'object') {
            core = Object.entries(input);
        }
        this.tableData = core;
        return this;
    };
    SpeedyCard.prototype.setData = function (payload) {
        if (payload) {
            this.attachedData = payload;
            this.needsSubmit = true;
        }
        return this;
    };
    SpeedyCard.prototype.setDate = function (id, label) {
        if (id === void 0) { id = "selectedDate"; }
        if (label === void 0) { label = 'Select a date'; }
        var payload = {
            "type": "Input.Date",
            id: id,
            label: label
        };
        this.dateData = payload;
        return this;
    };
    SpeedyCard.prototype.setTime = function (id, label) {
        if (id === void 0) { id = "selectedTime"; }
        if (label === void 0) { label = 'Select a time'; }
        var payload = {
            "type": "Input.Time",
            id: id,
            label: label
        };
        this.timeData = payload;
        return this;
    };
    SpeedyCard.prototype.setChips = function (chips) {
        var chipPayload = chips.map(function (chip) {
            var payload = {
                "type": "Action.Submit",
                "title": chip,
                "data": {
                    "chip_action": chip
                }
            };
            return payload;
        });
        this.json.actions = this.json.actions ? this.json.actions.push(chipPayload) : chipPayload;
        return this;
    };
    SpeedyCard.prototype.render = function () {
        if (this.title) {
            var payload = __assign({ type: 'TextBlock', text: this.title, weight: 'Bolder', size: 'Large', wrap: true }, this.titleConfig);
            this.json.body.push(payload);
        }
        if (this.subtitle) {
            var payload = __assign({ type: 'TextBlock', text: this.subtitle, size: "Medium", isSubtle: true, wrap: true, weight: 'Lighter' }, this.subTitleConfig);
            this.json.body.push(payload);
        }
        if (this.tableData && this.tableData.length) {
            var payload_1 = {
                "type": "FactSet",
                "facts": []
            };
            this.tableData.forEach(function (_a, i) {
                var label = _a[0], value = _a[1];
                var fact = {
                    title: label,
                    value: value
                };
                payload_1.facts.push(fact);
            });
            this.json.body.push(payload_1);
        }
        if (this.image) {
            var payload = __assign({ type: "Image", url: this.image, horizontalAlignment: "Center", size: "Large" }, this.imageConfig);
            this.json.body.push(payload);
        }
        if (this.choices.length) {
            this.needsSubmit = true;
            var payload = __assign({ type: 'Input.ChoiceSet', id: 'choiceSelect', "value": "0", "isMultiSelect": false, "isVisible": true, choices: this.choices }, this.choiceConfig);
            this.json.body.push(payload);
        }
        if (this.inputPlaceholder) {
            this.needsSubmit = true;
            var payload = __assign({ "type": "Input.Text", placeholder: this.inputPlaceholder }, this.inputConfig);
            this.json.body.push(payload);
        }
        if (Object.keys(this.dateData).length) {
            var _a = this.dateData, id = _a.id, type = _a.type, label = _a.label;
            if (label) {
                this.json.body.push({
                    "type": "TextBlock",
                    "text": label,
                    "wrap": true
                });
            }
            if (id && type) {
                this.json.body.push({ id: id, type: type });
            }
            this.needsSubmit = true;
        }
        if (Object.keys(this.timeData).length) {
            var _b = this.timeData, id = _b.id, type = _b.type, label = _b.label;
            if (label) {
                this.json.body.push({
                    "type": "TextBlock",
                    "text": label,
                    "wrap": true
                });
            }
            if (id && type) {
                this.json.body.push({ id: id, type: type });
            }
            this.needsSubmit = true;
        }
        if (this.needsSubmit) {
            var payload = {
                type: "Action.Submit",
                title: this.buttonLabel,
            };
            if (this.attachedData) {
                payload.data = this.attachedData;
            }
            this.json.actions = this.json.actions ? this.json.actions.push(payload) : [payload];
        }
        else {
            if (this.attachedData && Object.keys(this.attachedData).length) {
                index_1.bad("attachedData ignore, you must call at least either .setInput(), .setChoices, .setDate, .setTime, to pass through data with an adaptive card");
            }
        }
        if (this.url) {
            var payload = {
                type: "Action.OpenUrl",
                title: this.urlLabel,
                url: this.url,
            };
            if (this.json.actions) {
                this.json.actions.push(payload);
            }
            else {
                this.json.actions = [payload];
            }
        }
        return this.json;
    };
    SpeedyCard.prototype.renderFull = function () {
        var cardData = this.render();
        var fullPayload = {
            "roomId": "__REPLACE__ME__",
            "markdown": "Fallback text **here**",
            "attachments": [cardData]
        };
        return fullPayload;
    };
    return SpeedyCard;
}());
exports.SpeedyCard = SpeedyCard;
//# sourceMappingURL=cards.js.map