"use strict";
/**
 * WARNING: Very much work-in-progress
 *
 * Concept: make zero-knowledge templates for adaptive cards w/
 * good default styling
 * ex.
 * SimpleCard
 * Card with chips (row of buttons)
 * Multiselect
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSample = exports.easyKeyValCard = exports.easyChipCard = exports.easyCard = void 0;
var easyCard = function (easyCardPayload) {
    var payload = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "TextBlock",
                "size": "Medium",
                "weight": "Bolder",
                "text": "".concat(easyCardPayload.title)
            },
            {
                "type": "RichTextBlock",
                "inlines": [
                    {
                        "type": "TextRun",
                        "text": "".concat(easyCardPayload.text ? easyCardPayload.text : '')
                    }
                ]
            }
        ],
    };
    if (easyCardPayload.image) {
        var imagePayload = {
            "type": "Image",
            "url": "".concat(easyCardPayload.image),
            "horizontalAlignment": "Center",
            "size": "large"
        };
        payload.body.push(imagePayload);
    }
    if (easyCardPayload.url) {
        var buttonPayload = {
            "type": "Action.OpenUrl",
            "title": "".concat(easyCardPayload.buttonLabel ? easyCardPayload.buttonLabel : 'Go'),
            "url": "".concat(easyCardPayload.url),
            "style": "positive"
        };
        payload.actions = [buttonPayload];
    }
    if (easyCardPayload.input) {
        var _a = easyCardPayload.input.placeholder, placeholder = _a === void 0 ? "Submit" : _a;
        var InputPayload = {
            "type": "Input.Text",
            "id": "inputData",
            "placeholder": placeholder
        };
        payload.body.push(InputPayload);
    }
    if (easyCardPayload.choices && easyCardPayload.choices.length) {
        var choices = easyCardPayload.choices.map(function (choice, idx) {
            return {
                title: choice,
                value: String(idx)
            };
        });
        var choicePayload = {
            "type": "Input.ChoiceSet",
            "id": "choiceSelect",
            "value": "0",
            "isMultiSelect": true,
            "isVisible": true,
            choices: choices,
        };
        payload.body.push(choicePayload);
    }
    if (easyCardPayload.input || easyCardPayload.choices) {
        var submitButton = {
            "type": "Action.Submit",
            "title": "Submit",
            "data": { "cardType": "inputForm" }
        };
        payload.actions.push(submitButton);
    }
    return payload;
};
exports.easyCard = easyCard;
var easyChipCard = function (config) {
    var payload = {
        "type": "AdaptiveCard",
        "body": [],
        actions: [],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2"
    };
    if (config.options.length) {
        var options = config.options;
        options.forEach(function (option) {
            var chip = {
                "type": "Action.Submit",
                "title": option,
                "data": {
                    "chip_action": option
                }
            };
            payload.actions.push(chip);
        });
    }
    return payload;
};
exports.easyChipCard = easyChipCard;
var easyKeyValCard = function (config) {
    var payload = {
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [],
                "spacing": "Padding",
                "horizontalAlignment": "Center"
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2"
    };
    if (config.options.length) {
        var columnsData_1 = [
            {
                "type": "Column",
                "width": 35,
                "items": []
            },
            {
                "type": "Column",
                "width": 65,
                "items": []
            }
        ];
        var buildLabel_1 = function (label) {
            return {
                "type": "TextBlock",
                "text": label,
                "weight": "Bolder",
                "color": "Light",
                "spacing": "Small"
            };
        };
        var buildValue_1 = function (value) {
            return {
                "type": "TextBlock",
                "text": value,
                "color": "Light",
                "weight": "Lighter",
                "spacing": "Small"
            };
        };
        config.options.forEach(function (_a, i) {
            var label = _a[0], value = _a[1];
            columnsData_1[0].items.push(buildLabel_1(label));
            columnsData_1[1].items.push(buildValue_1(value));
        });
        payload.body[0].columns = columnsData_1;
    }
    return payload;
};
exports.easyKeyValCard = easyKeyValCard;
// Kitchen sink example + inputs
exports.CardSample = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": 2,
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Tell us about yourself",
                            "weight": "bolder",
                            "size": "medium"
                        },
                        {
                            "type": "TextBlock",
                            "text": "We just need a few more details to get you booked for the trip of a lifetime!",
                            "isSubtle": true,
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "Don't worry, we'll never share or sell your information.",
                            "isSubtle": true,
                            "wrap": true,
                            "size": "small"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Your name",
                            "wrap": true
                        },
                        {
                            "type": "Input.Text",
                            "id": "myName",
                            "placeholder": "Last, First"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Your email",
                            "wrap": true
                        },
                        {
                            "type": "Input.Text",
                            "id": "myEmail",
                            "placeholder": "youremail@example.com",
                            "style": "email"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Phone Number"
                        },
                        {
                            "type": "Input.Text",
                            "id": "myTel",
                            "placeholder": "xxx.xxx.xxxx",
                            "style": "tel"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": 1,
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Diver_Silhouette%2C_Great_Barrier_Reef.jpg",
                            "size": "auto"
                        }
                    ]
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.Submit",
            "title": "Submit",
            "data": { "cardType": "inputForm" }
        }
    ]
};
//# sourceMappingURL=easycard.js.map