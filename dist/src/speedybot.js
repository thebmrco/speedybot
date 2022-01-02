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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.speedybotKoa = exports.Launch = exports.Speedytunnel = exports.SpeedybotWebhook = exports.Speedybot = void 0;
var helpers_1 = require("./helpers");
var _1 = require("./");
// TODO: make peer dependency
var webex_node_bot_framework_1 = __importDefault(require("webex-node-bot-framework"));
var webhook_1 = __importDefault(require("webex-node-bot-framework/webhook"));
var Speedybot = /** @class */ (function () {
    function Speedybot(config) {
        this.initialized = false;
        // Chat/framework handler mappings
        this.Magickeywords = {
            "<@help>": "help",
            "<@catchall>": /(.*?)/,
        };
        this.MagicFrameworkkeywords = {
            "<@submit>": "attachmentAction",
            "<@spawn>": "spawn",
            "<@despawn>": "despawn",
            "<@fileupload>": "files",
        };
        this.chips = [];
        this.WebhookKeyword = "<@webhook>";
        var inst = new webex_node_bot_framework_1.default(config);
        this.frameworkRef = inst;
    }
    Speedybot.prototype.send = function (payload) {
        this.frameworkRef.webex.messages.create(payload);
    };
    // Send card is a bit tricky in the <@webhook> case since we don't have any
    // existing room binding
    // For now, just make 2 different methods
    Speedybot.prototype.sendCardToRoom = function (roomId, cardPayload, fallbackText) {
        if (fallbackText === void 0) { fallbackText = "Your client does not appear to support rendering adaptive cards"; }
        var card = {
            roomId: roomId,
            markdown: fallbackText,
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: cardPayload,
                },
            ],
        };
        this.frameworkRef.webex.messages.create(card);
    };
    Speedybot.prototype.sendCardToPerson = function (email, cardPayload, fallbackText) {
        if (fallbackText === void 0) { fallbackText = "Your client does not appear to support rendering adaptive cards"; }
        var card = {
            toPersonEmail: email,
            markdown: fallbackText,
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: cardPayload,
                },
            ],
        };
        this.frameworkRef.webex.messages.create(card);
    };
    Speedybot.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inst;
            var _this = this;
            return __generator(this, function (_a) {
                inst = this.frameworkRef;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var e_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, inst.start()];
                                case 1:
                                    _a.sent();
                                    inst.on("initialized", function () {
                                        _this.initialized = true;
                                        return resolve(inst);
                                    });
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Speedybot.prototype.addHandler = function (botHandler) {
        var _this = this;
        // https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js#L1663
        var frameworkRef = this.frameworkRef;
        var registerHandler = function (keyword, handler, helpText, preference) {
            if (preference === void 0) { preference = 0; }
            frameworkRef.hears(keyword, handler, helpText, preference);
        };
        var registerFrameworkHandler = function (eventName, handler) {
            frameworkRef.on(eventName, handler);
        };
        var keyword = botHandler.keyword, handler = botHandler.handler;
        var trigger = keyword;
        if (trigger instanceof Array) {
            trigger.forEach(function (alias) {
                var newHandler = __assign(__assign({}, botHandler), { keyword: alias });
                _this.addHandler(newHandler);
            });
        }
        else {
            if (typeof keyword === "string") {
                var specialFramework = this.MagicFrameworkkeywords[keyword];
                if (specialFramework) {
                    return registerFrameworkHandler(specialFramework, handler);
                }
                trigger = this.Magickeywords[keyword] || keyword;
            }
            var helpText = botHandler.helpText, preference = botHandler.preference;
            return registerHandler(trigger, handler, helpText, preference);
        }
    };
    Speedybot.prototype.registerHandlersWithHelp = function (handlers, helpHandler) {
        var _this = this;
        var addHelp = true;
        var addHealthcheck = true;
        var submitter = null;
        handlers.forEach(function (botHandler) {
            var keyword = botHandler.keyword;
            if (keyword === "<@help>") {
                addHelp = false;
            }
            if (keyword === "<@healthcheck>") {
                addHealthcheck = false;
            }
            if (keyword === "<@submit>") {
                submitter = botHandler;
            }
            else {
                _this.addHandler(botHandler);
            }
        });
        if (addHelp) {
            var helpDefault = helpHandler
                ? helpHandler(handlers)
                : this.defaultHelpHandler(handlers);
            // add help handler
            this.addHandler(helpDefault);
        }
        if (addHealthcheck) {
            this.addHandler(this.defaultHealthcheck());
        }
        var rootSubmitHandler = function (bot, trigger) { return __awaiter(_this, void 0, void 0, function () {
            var getData, disappearOnTap, msgId, registeredChips, chip_action, _i, registeredChips_1, chip, label, handler, payload;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getData = function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                        var res, e_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 2, , 3]);
                                                    return [4 /*yield*/, bot.recall(key)];
                                                case 1:
                                                    res = _a.sent();
                                                    resolve(res);
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    e_2 = _a.sent();
                                                    resolve(null);
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        }); };
                        return [4 /*yield*/, getData(_1.chipConfigLabel)];
                    case 1:
                        disappearOnTap = ((_a.sent()) || { disappearOnTap: false }).disappearOnTap;
                        if (!disappearOnTap) return [3 /*break*/, 3];
                        msgId = trigger.attachmentAction.messageId;
                        return [4 /*yield*/, bot.censor(msgId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, getData(_1.chipLabel)];
                    case 4:
                        registeredChips = (_a.sent()) || [];
                        chip_action = (trigger.attachmentAction
                            ? trigger.attachmentAction.inputs
                            : { chip_action: "" }).chip_action;
                        for (_i = 0, registeredChips_1 = registeredChips; _i < registeredChips_1.length; _i++) {
                            chip = registeredChips_1[_i];
                            label = chip.label, handler = chip.handler;
                            if (chip_action === label) {
                                if (typeof handler === "function") {
                                    handler.call(this, bot, trigger);
                                }
                                else {
                                    payload = {
                                        roomId: trigger.attachmentAction.roomId,
                                        personId: trigger.person.id,
                                        text: trigger.attachmentAction.inputs.chip_action,
                                    };
                                    // HACK: pass the button-tap value through the handler system
                                    bot.framework.onMessageCreated(payload);
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // if <@submit> alias present, combine
        if (submitter) {
            var submit = {
                keyword: "<@submit>",
                handler: function (bot, trigger) {
                    var isChip = trigger.attachmentAction.inputs
                        ? Boolean(trigger.attachmentAction.inputs.chip_action)
                        : false;
                    if (!isChip) {
                        return submitter === null || submitter === void 0 ? void 0 : submitter.handler(bot, trigger);
                    }
                    else {
                        return rootSubmitHandler(bot, trigger);
                    }
                },
                helpText: "<@submit>",
            };
            this.addHandler(submit);
        }
        else {
            var submit = {
                keyword: "<@submit>",
                handler: function (bot, trigger) {
                    var isChip = trigger.attachmentAction.inputs
                        ? Boolean(trigger.attachmentAction.inputs.chip_action)
                        : false;
                    if (isChip) {
                        return rootSubmitHandler(bot, trigger);
                    }
                },
                helpText: "<@submit>",
            };
            this.addHandler(submit);
        }
    };
    Speedybot.prototype.loadHandlers = function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return this.registerHandlersWithHelp(this.flatten.apply(this, handlers));
    };
    // Take unknown number of args, lists, etc
    Speedybot.prototype.flatten = function () {
        var _a;
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return (_a = Array.prototype.concat).call.apply(_a, __spreadArrays([[]], handlers));
    };
    Speedybot.prototype.defaultHelpHandler = function (handlerList) {
        return {
            keyword: ["help", "helpme", "?"],
            handler: function (bot, trigger) {
                var text = handlerList
                    .map(function (handler) {
                    var keyword = handler.keyword;
                    var label = keyword;
                    if (keyword instanceof Array) {
                        label = keyword[0];
                    }
                    return label + ": " + handler.helpText;
                })
                    .join("\n\n");
                var cardJSON = {
                    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                    type: "AdaptiveCard",
                    version: "1.0",
                    body: [
                        {
                            type: "TextBlock",
                            size: "Medium",
                            weight: "Bolder",
                            text: "Available Handlers",
                        },
                        {
                            type: "RichTextBlock",
                            inlines: [
                                {
                                    type: "TextRun",
                                    text: text,
                                },
                            ],
                        },
                    ],
                };
                return bot.sendCard(cardJSON, "Your client doesn't support rendering adpative cards. Help data: " + text);
            },
            helpText: "Get help info",
        };
    };
    Speedybot.prototype.snippet = function (data) {
        return helpers_1.snippet(data);
    };
    Speedybot.prototype.defaultHealthcheck = function () {
        return {
            keyword: ["healthcheck"],
            handler: function (bot, trigger) {
                // Pick a random response for healthcheck
                var choices = [
                    "At the tone, the time will be " + new Date(),
                    new Date() + ", healthcheck is GOOD",
                    "Health Status: Good (" + new Date() + ")",
                ];
                bot.say(helpers_1.pickRandom(choices));
                // Adapative Card: https://developer.webex.com/docs/api/guides/cards
                var cardPayload = new _1.SpeedyCard()
                    .setTitle("System is 👍")
                    .setSubtitle("If you see this card, everything is working")
                    .setImage("https://i.imgur.com/SW78JRd.jpg")
                    .setInput("What's on your mind?")
                    .setUrl(helpers_1.pickRandom([
                    "https://www.youtube.com/watch?v=3GwjfUFyY6M",
                    "https://www.youtube.com/watch?v=d-diB65scQU",
                ]), "Take a moment to celebrate")
                    .setTable([
                    ["Bot's Date", new Date().toDateString()],
                    ["Bot's Uptime", String(process.uptime()).substring(0, 25) + "s"],
                ]);
                // const cardPayload = {
                //     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                //     "type": "AdaptiveCard",
                //     "version": "1.0",
                //     "body": [{
                //         "type": "TextBlock",
                //         "size": "Medium",
                //         "weight": "Bolder",
                //         "text": "System is 👍"
                //     }, {
                //         "type": "RichTextBlock",
                //         "inlines": [{
                //             "type": "TextRun",
                //             "text": "If you see this card, everything is working"
                //         }]
                //     }, {
                //         "type": "Image",
                //         "url": "https://i.imgur.com/SW78JRd.jpg",
                //         "horizontalAlignment": "Center",
                //         "size": "large"
                //     }, {
                //         "type": "Input.Text",
                //         "id": "inputData",
                //         "placeholder": "What's on your mind?"
                //     }],
                //     "actions": [{
                //         "type": "Action.OpenUrl",
                //         "title": "Take a moment to celebrate",
                //         "url": "https://www.youtube.com/watch?v=3GwjfUFyY6M",
                //         "style": "positive"
                //     }, {
                //         "type": "Action.Submit",
                //         "title": "Submit",
                //         "data": {
                //             "cardType": "inputForm"
                //         }
                //     }]
                // }
                return bot.sendCard(cardPayload.render(), "Your client does not currently support Adaptive Cards :(");
            },
            helpText: "Test the health of your bot. Otherwise there may be an issue with your tunnel, server, or network)",
        };
    };
    Speedybot.prototype.webhook = function () {
        return webhook_1.default(this.frameworkRef);
    };
    return Speedybot;
}());
exports.Speedybot = Speedybot;
/**
 * SpeedybotWebhook
 * With express requires body-parser
 *
 * ex. app.post('/mywebhook', SpeedybotWebhook(config, handlers))
 * @param config: SpeedybotConfig
 * @param handlers: Bothandler[]
 * @returns Promise<unknown>
 */
exports.SpeedybotWebhook = function (config, handlers, app) {
    var _a = config.webhookUrl, webhookUrl = _a === void 0 ? "" : _a;
    helpers_1.ValidatewebhookUrl(webhookUrl);
    if (config.token === _1.placeholder) {
        throw new Error("Placeholder detected under 'token' in config.json! See here for instructions: https://github.com/valgaze/speedybot-starter/blob/master/quickstart.md Exiting...");
    }
    var speedybot = new Speedybot(config);
    var webhookHandlers = [];
    var standardHandlers = handlers.filter(function (handler) {
        var keyword = handler.keyword;
        if (typeof keyword === "string") {
            var isWebhook = keyword.includes(speedybot.WebhookKeyword);
            if (isWebhook) {
                webhookHandlers.push(handler);
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true; // regex | (string|regex)[]
        }
    });
    speedybot.loadHandlers(standardHandlers);
    speedybot.start();
    // TODO: support other route handler schemas-- koa, hapi, sails, etc
    if (app) {
        webhookHandlers.forEach(function (webhook) {
            var _a = webhook.method, method = _a === void 0 ? "post" : _a, route = webhook.route, handler = webhook.handler;
            app[method](route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, handler.call(speedybot, req, res)];
                });
            }); });
        });
    }
    // Main webhook specifically for incoming chat webhooks
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, speedybot.webhook()(req)];
        });
    }); };
    /**
     * Maybe in future, grab the route from webhookUrl in config
     * ex.
     *  const config = { webhookUrl: 'https://hostname123.net/mywebhookroute' }
     *  app.use(SpeedybotWebhook(config, handlerList)) // <-- checks for /mywebhookroute & Handles
     *
     * Or maybe validate
     * app.post('/mywebhookroute_bongo', SpeedybotWebhook(config, handlerList)) // <-- compare webhookUrl & req.originalUrl
     * Make sure it matches req.originalUrl
     * ex. app.use(SpeedybotWebhook(config, handlerList))
     * // Use /webhookFun without specifying like app.post('/webhookFun', SpeedybotWebhook(config, handlerList))
     *
     */
};
exports.Speedytunnel = function (app, port, tunneler, config, handlers) { return __awaiter(void 0, void 0, void 0, function () {
    var tunnelUrl, webhookRoute, token, _a, webhookUrl, speedyConfig;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, tunneler({ port: port })];
            case 1:
                tunnelUrl = _b.sent();
                webhookRoute = "speedywebhook";
                token = config.token, _a = config.webhookUrl, webhookUrl = _a === void 0 ? "" : _a;
                if (webhookUrl) {
                    console.log("WARNING: webhookUrl ('" + webhookUrl + "' detected in config, igoring and booting with tunnel " + tunnelUrl);
                }
                speedyConfig = {
                    token: token,
                    webhookUrl: tunnelUrl + "/" + webhookRoute,
                };
                app.post("/" + webhookRoute, exports.SpeedybotWebhook(speedyConfig, handlers));
                return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param config: Speedybot Config
 * @param handlerList: list of botHandlers
 * @returns Framework instance
 */
exports.Launch = function (config, handlerList) { return __awaiter(void 0, void 0, void 0, function () {
    var speedybot, tidyHandlerList, frameworkRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (config.token === _1.placeholder) {
                    throw new Error("Placeholder detected in config.json! See here for instructions: https://github.com/valgaze/speedybot/blob/master/quickstart.md Exiting...");
                }
                _1.ascii_art();
                speedybot = new Speedybot(config);
                tidyHandlerList = handlerList.filter(function (_a) {
                    var keyword = _a.keyword;
                    return !(typeof keyword === "string" && keyword === speedybot.WebhookKeyword);
                });
                speedybot.loadHandlers(tidyHandlerList);
                return [4 /*yield*/, speedybot.start()];
            case 1:
                frameworkRef = _a.sent();
                return [2 /*return*/, frameworkRef];
        }
    });
}); };
exports.speedybotKoa = function () {
    return function (ctx) {
        // do some koa middle ware stuff
    };
};
//# sourceMappingURL=speedybot.js.map