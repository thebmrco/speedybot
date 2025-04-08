"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.ascii_art = void 0;
exports.log = log;
exports.warning = warning;
exports.bad = bad;
exports.good = good;
exports.color = color;
exports.red = red;
exports.loud = loud;
exports.askQuestion = askQuestion;
exports.yesNo = yesNo;
var simple_log_colors_1 = __importDefault(require("simple-log-colors"));
var index_1 = require("./index");
var readline_1 = require("readline");
function log() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    console.log.apply(console, payload);
}
function warning() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    log(simple_log_colors_1.default.yellow.apply(simple_log_colors_1.default, payload));
}
function bad() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    color('red', "\n\n# ----------------PROBLEM!------------------- #\n\n");
    log(simple_log_colors_1.default.red.apply(simple_log_colors_1.default, payload));
    color('red', "\n\n# ------------------------------------------- #\n\n");
}
function good() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    log(simple_log_colors_1.default.green.apply(simple_log_colors_1.default, payload));
}
function color(color) {
    if (color === void 0) { color = "red"; }
    var payload = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        payload[_i - 1] = arguments[_i];
    }
    try {
        log(simple_log_colors_1.default[color].apply(simple_log_colors_1.default, payload));
    }
    catch (_a) {
        log(simple_log_colors_1.default['red'].apply(simple_log_colors_1.default, payload));
    }
}
function red() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    return color.apply(void 0, __spreadArray(['red'], payload, false));
}
function loud() {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    color('red', "\n\n# ---------------------------------------- #\n\n");
    log(simple_log_colors_1.default.yellow.apply(simple_log_colors_1.default, payload));
    color('red', "\n\n# ---------------------------------------- #\n\n");
}
function askQuestion(question) {
    var rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(function (resolve, reject) {
        rl.question(question, function (res) {
            resolve(res);
            rl.close();
        });
    });
}
function yesNo(question) {
    return __awaiter(this, void 0, void 0, function () {
        var yay, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    yay = ['yes', 'y', 'yah', '1', 1, 'true', true];
                    return [4 /*yield*/, askQuestion("(y/n) ".concat(question))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, yay.includes(res.toLowerCase())];
            }
        });
    });
}
var ascii_art = function (colorChoice) {
    var colorFallback = colorChoice;
    if (!colorFallback) {
        var opts = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
        colorFallback = (0, index_1.pickRandom)(opts);
    }
    color(colorFallback, "\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551  \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \n\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2551  \u2588\u2588\u2551  \u255A\u2588\u2588\u2554\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D   \u2588\u2588\u2551   \n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u255D    \u255A\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D    \u255A\u2550\u255D   \n");
};
exports.ascii_art = ascii_art;
var help = function () {
    (0, exports.ascii_art)();
    log("\nSee here for a step-by-step guide: https://github.com/valgaze/speedybot/blob/master/quickstart.md\n_________________________________\n\nSpeedybot makes it easy to QUICKLY stand up a bot without having to worry about infrastructe details\n\nex. You can edit a single file to handle all your bots logic, receive user data from forms, catch file-upload events and easily extend/integrate with third-party services\n\nBefore you start, you'll need a WebEx bot token\n\n- Create one and save the token from here: https://developer.webex.com/my-apps/new/bot\n\n## [CLI] Fast setup & boot\nRun the following to scaffold & boot\n\n$ npx speedybot setup xxxxyyyyzzz_bot_token_here_xxxxyyyyzzz\n\n\n## [Git] Setup & boot\nOr alteratively, run\n\n$ git clone https://github.com/valgaze/speedybot-starter speedybot\n$ cd speedybot-starter\n$ npm run setup\n# Save your bot token to speedybot/settings/config.json under the \"token\" field\n$ npm start\n\nOnce your agent is running:\n\n- Start a 1-1 session with the bot & ask it \"healthcheck\" to verify all's well\n\nIf any trouble, see here: https://github.com/valgaze/speedybot/blob/master/quickstart.md");
};
exports.help = help;
//# sourceMappingURL=logger.js.map