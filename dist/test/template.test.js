"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var src_1 = require("./../src");
tape_1.default("Should pick a random choice and fill the template", function (t) {
    var pass = false;
    var payload = {
        phrases: ["Hey $[name], how's it going?", "Hi $[name], here's your $[flavor]"],
        template: {
            name: 'Joe',
            flavor: 'mint'
        }
    };
    var phrases = payload.phrases, template = payload.template;
    var renderedChoices = ["Hey Joe, how's it going?", "Hi Joe, here's your mint"];
    var res = src_1.fillTemplate(phrases, template);
    if (renderedChoices.includes(res)) {
        pass = true;
    }
    t.deepEqual(true, pass);
    t.end();
});
tape_1.default("Should take a string & fill in the template (& not crash if key name happened to be contaied 😶)", function (t) {
    var pass = false;
    var payload = {
        phrases: "What directory to install speedybot ? (defaults to '$[directory]')",
        template: {
            directory: 'speedybot',
        }
    };
    var phrases = payload.phrases, template = payload.template;
    var renderedChoices = ["What directory to install speedybot ? (defaults to 'speedybot')"];
    var res = src_1.fillTemplate(phrases, template);
    if (renderedChoices.includes(res)) {
        pass = true;
    }
    t.deepEqual(true, pass);
    t.end();
});
//# sourceMappingURL=template.test.js.map