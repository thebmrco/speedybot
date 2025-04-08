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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./../src"); // import { BotHandler } from 'speedybot'
var namegame_1 = __importDefault(require("./namegame"));
/**
 * Add a "handler" below to control your bot's responses to a user-- just add to the list
 *
 * At minimum a handler must have
 * keyword: a word, RegEx, or a list of words and/or regex's to trigger the handler
 * handler: a function with access to the bot instance and "trigger" data
 * helpText: Simple explanation for how to use (this gets displayed by default if the user tells your bot "help")
 *
 * If you can make it fit in this list, you can make it do whatever you want
 * Special keyword phrases:
 * 1) "<@submit>": will be triggered whenever the user subits data from a form
 * 2) "<@catchall>": will be triggered on every message received
 * 3) "<@help>": override the built-in help handler
 * 4) "<@fileupload>": Handle file-upload event
 *
 */
var handlers = [
    {
        keyword: ['hello', 'hey', 'yo', 'watsup', 'hola'],
        handler: function (bot, trigger) {
            var reply = "Heya how's it going ".concat(trigger.person.displayName, "?");
            bot.say(reply);
        },
        helpText: "A handler that greets the user"
    },
    {
        keyword: '<@fileupload>',
        handler: function (bot, trigger) {
        },
        helpText: "Special handler that's fired when the user uploads a file to your bot (by default supports json/csv/txt)"
    },
    {
        keyword: ['sendfile'],
        handler: function (bot, trigger) {
            var fileUrl = 'https://camo.githubusercontent.com/b846bfa57dd26af4e1526abe1173e0b332b75af5d642564b2ab1d0c12a482290/68747470733a2f2f692e696d6775722e636f6d2f56516f5866486e2e676966';
            // Send a DM w/ markdown
            bot.dm(trigger.person.id, 'markdown', 'Sending you a **file**');
            // Send a file by URL
            bot.dm(trigger.person.id, { file: fileUrl });
        },
        helpText: "A handler that attaches a file in a direct message"
    },
    {
        keyword: ['ping', 'pong'],
        handler: function (bot, trigger) {
            var normalized = trigger.text.toLowerCase();
            if (normalized === 'ping') {
                bot.say('pong');
            }
            else {
                bot.say('ping');
            }
        },
        helpText: "A handler that says ping when the user says pong and vice versa"
    },
    {
        keyword: '<@submit>',
        handler: function (bot, trigger) {
            // Ex. From here data could be transmitted to another service or a 3rd-party integrationn
            bot.say("Submission received! You sent us ".concat(JSON.stringify(trigger.attachmentAction.inputs)));
        },
        helpText: "A special handler that fires anytime a user submits data (you can only trigger this handler by tapping Submit in a card)"
    },
    {
        keyword: '<@fileupload>',
        handler: function (bot, trigger) {
            return __awaiter(this, void 0, void 0, function () {
                var supportedFiles, file, fileData, extension, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            supportedFiles = ['json', 'txt', 'csv'];
                            file = trigger.message.files[0];
                            return [4 /*yield*/, (0, src_1.$)(bot).getFile(file)];
                        case 1:
                            fileData = _a.sent();
                            extension = fileData.extension;
                            if (supportedFiles.includes(extension)) {
                                data = fileData.data;
                                // bot.snippet will format json or text data into markdown format
                                bot.say({ markdown: (0, src_1.$)(bot).snippet(data) });
                            }
                            else {
                                bot.say("Sorry, somebody needs to add support to handle *.".concat(extension, " files"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        helpText: 'A special handler that will activate whenever a file is uploaded'
    },
    namegame_1.default, // You can also include single-file handlers in your list
];
exports.default = handlers;
//# sourceMappingURL=handlers.js.map