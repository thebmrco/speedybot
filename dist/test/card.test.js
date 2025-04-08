"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var src_1 = require("./../src");
(0, tape_1.default)("setup", function (t) {
    t.end();
});
(0, tape_1.default)("Sanity test", function (t) {
    var expected = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [{
                "type": "TextBlock",
                "text": "System is 👍",
                "weight": "Bolder",
                "size": "Large",
                "wrap": true
            }]
    };
    var cardPayload = new src_1.SpeedyCard().setTitle('System is 👍');
    var actual = cardPayload.render();
    t.deepEqual(actual, expected);
    t.end();
});
(0, tape_1.default)("Kitchen sink", function (t) {
    var expected = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "TextBlock",
                "text": "System is 👍",
                "weight": "Bolder",
                "size": "Large",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "If you see this card, everything is working",
                "size": "Medium",
                "isSubtle": true,
                "wrap": true,
                "weight": "Lighter"
            },
            {
                "type": "FactSet",
                "facts": [
                    {
                        "title": "Bot's Uptime",
                        "value": "12.492006583s"
                    }
                ]
            },
            {
                "type": "Image",
                "url": "https://i.imgur.com/SW78JRd.jpg",
                "horizontalAlignment": "Center",
                "size": "Large"
            },
            {
                "type": "Input.Text",
                "placeholder": "What's on your mind?",
                "id": "inputData"
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "data": {
                    "mySpecialData": {
                        "a": 1,
                        "b": 2
                    }
                }
            }
        ]
    };
    var cardPayload = new src_1.SpeedyCard().setTitle('System is 👍')
        .setSubtitle('If you see this card, everything is working')
        .setImage('https://i.imgur.com/SW78JRd.jpg')
        .setInput("What's on your mind?")
        .setTable([["Bot's Uptime", "12.492006583s"]])
        .setData({ mySpecialData: { a: 1, b: 2 } });
    var actual = cardPayload.render();
    t.deepEqual(actual, expected);
    t.end();
});
(0, tape_1.default)("Date and Time Pickers", function (t) {
    var expected = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "TextBlock",
                "text": "xxx",
                "weight": "Bolder",
                "size": "Large",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "Hi subtlte",
                "size": "Medium",
                "isSubtle": true,
                "wrap": true,
                "weight": "Lighter"
            },
            {
                "type": "Input.ChoiceSet",
                "id": "selectedChoice",
                "value": "0",
                "isMultiSelect": false,
                "isVisible": true,
                "choices": [
                    {
                        "title": "a",
                        "value": "0"
                    },
                    {
                        "title": "b",
                        "value": "1"
                    },
                    {
                        "title": "c",
                        "value": "2"
                    }
                ]
            },
            {
                "type": "TextBlock",
                "text": "Choose yer date",
                "wrap": true
            },
            {
                "id": "selectedDate",
                "type": "Input.Date"
            },
            {
                "type": "TextBlock",
                "text": "Select a time",
                "wrap": true
            },
            {
                "id": "selectedTime",
                "type": "Input.Time"
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "data": {
                    "a": 1
                }
            }
        ]
    };
    var myCard = new src_1.SpeedyCard().setTitle('xxx')
        .setSubtitle('Hi subtlte')
        .setData({ a: 1 })
        .setTime('selectedTime')
        .setDate('selectedDate', 'Choose yer date')
        .setChoices(['a', 'b', 'c'], { id: 'selectedChoice' });
    var actual = myCard.render();
    t.deepEqual(actual, expected);
    t.end();
});
(0, tape_1.default)("teardown", function (t) {
    t.end();
});
//# sourceMappingURL=card.test.js.map