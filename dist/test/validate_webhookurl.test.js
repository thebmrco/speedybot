"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var helpers_1 = require("./../src/helpers");
(0, tape_1.default)("setup", function (t) {
    t.end();
});
// ex. good: https://123-456-789.ngrok.io/webhookroute
// ex. bad: https://123-456-789.ngrok.io/
// ex. bad: https://123-456-789.ngrok.io
(0, tape_1.default)("Should return true if valid", function (t) {
    var webhookUrl = 'https://123-456-789.ngrok.io/webhookroute';
    var expected = true;
    var actual = (0, helpers_1.ValidatewebhookUrl)(webhookUrl);
    t.deepEqual(actual, expected);
    t.end();
});
(0, tape_1.default)("Should throw if no ending path", function (t) {
    var webhookUrl = 'https://123-456-789.ngrok.io';
    try {
        (0, helpers_1.ValidatewebhookUrl)(webhookUrl);
        t.fail('Should throw error');
    }
    catch (e) {
        t.match(e.message, /.*?/, 'Error thrown correctly');
    }
    finally {
        t.end();
    }
});
(0, tape_1.default)("Should throw if no ending path, ends in slash", function (t) {
    var webhookUrl = 'https://123-456-789.ngrok.io/';
    try {
        (0, helpers_1.ValidatewebhookUrl)(webhookUrl);
        t.fail('Should throw error');
    }
    catch (e) {
        t.match(e.message, /.*?/, 'Error thrown correctly');
    }
    finally {
        t.end();
    }
});
(0, tape_1.default)("teardown", function (t) {
    t.end();
});
//# sourceMappingURL=validate_webhookurl.test.js.map