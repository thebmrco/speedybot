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
exports.$ = exports.$Botutils = exports.extractFileData = exports.Locker = exports.Storage = exports.htmlSnippet = exports.snippet = exports.fillTemplate = exports.ValidatewebhookUrl = exports.pickRandom = void 0;
var axios_1 = __importDefault(require("axios"));
var fs_1 = require("fs");
var index_1 = require("./index");
var logger_1 = require("./logger");
var path_1 = require("path");
var form_data_1 = __importDefault(require("form-data"));
/**
* @param list
* Pick an item from the list
**/
var pickRandom = function (list) { return list[Math.floor(Math.random() * list.length)]; };
exports.pickRandom = pickRandom;
/**
 * Make sure webhookUrl exists and has an ending path
 * @param webhookUrl
 *
 *
 * @returns boolean | throws
 */
var ValidatewebhookUrl = function (webhookUrl) {
    // if no webhookUrl specified
    if (!webhookUrl) {
        throw new Error("Error: Missing 'webhookUrl' in config");
    }
    // check if ending route, throw if not present
    // ex. good: https://123-456-789.ngrok.io/webhookroute
    // ex. bad: https://123-456-789.ngrok.io/
    // ex. bad: https://123-456-789.ngrok.io
    var candidate = new URL(webhookUrl);
    if (candidate.pathname === '/') {
        (0, logger_1.loud)("\nIt looks like your config's webhookUrl does not end with a route\n\nEx. (expresjs) If your server's route handler look like this:\n\nconst config = {\n    \"webhookUrl\": \"".concat(webhookUrl, "\",\n    \"token\": \"aaa-bbb-ccc\"\n}\n\napp.post('my_webhook', SpeedybotWebhook(config, handlerList))\n\nChange config.webhookUrl to ").concat(webhookUrl).concat(webhookUrl.slice(-1) === '/' ? 'my_webhook' : '/my_webhook', "\n\nSee here for more details: https://github.com/valgaze/speedybot/blob/master/docs/how-to.md#deploy"));
        var errMsg = "Error: webhookUrl in should end with a path, ex ".concat(webhookUrl).concat(webhookUrl.slice(-1) === '/' ? 'my_webhook' : '/my_webhook');
        throw new Error(errMsg);
    }
    else {
        return true;
    }
};
exports.ValidatewebhookUrl = ValidatewebhookUrl;
/**
 *
 * Randomly selects a phrase & fill in template
 *
 * ```ts
 *
 * // ie from an external template file
 * const payload = {
 *  phrases: ['Hey there, how it going, $[name]?', 'Hi $[name], here's your $[mint]']
 *  template: {
 * 		name: 'Joe',
 *  	flavor: 'mint'
 *  }
 * }
 *
 * fillTemplate(payload.phrases, payload.template)
 *
 * ```
 *
 * @param phrases: array of phrases []string
 * ```ts
 *  ['Howdy, you are $[name] and you like $[flavor]', '$[name], here is $[flavor]']
 * ```
 * @param template: mappings to phrases object
 *
 * ```js
 * {
 *   name: 'Joe',
 *   flavor: 'mint'
 * }
 *```
 *
 *
 */
var fillTemplate = function (utterances, template) {
    var payload;
    if (typeof utterances != "string") {
        payload = (0, exports.pickRandom)(utterances) || "";
    }
    else {
        payload = utterances;
    }
    var replacer = function (utterance, target, replacement) {
        if (!utterance.includes("$[".concat(target, "]"))) {
            return utterance;
        }
        else {
            return replacer(utterance.replace("$[".concat(target, "]"), replacement), target, replacement);
        }
    };
    for (var key in template) {
        var val = template[key];
        payload = replacer(payload, key, val);
    }
    return payload;
};
exports.fillTemplate = fillTemplate;
var snippet = function (data, dataType) {
    if (dataType === void 0) { dataType = 'json'; }
    var msg = "\n```".concat(dataType, "\n").concat(dataType === 'json' ? JSON.stringify(data, null, 2) : data, "\n```");
    return msg;
};
exports.snippet = snippet;
var htmlSnippet = function (data) {
    return (0, exports.snippet)(data, 'html');
};
exports.htmlSnippet = htmlSnippet;
// Alias store/recall
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.get = function (bot, key) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bot.recall(key)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res];
                }
            });
        });
    };
    Storage.save = function (bot, key, val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bot.store(key, val)];
            });
        });
    };
    Storage.delete = function (bot, key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bot.forget(key)];
            });
        });
    };
    return Storage;
}());
exports.Storage = Storage;
var Locker = /** @class */ (function () {
    function Locker(state) {
        if (state === void 0) { state = {}; }
        this.state = state;
    }
    Locker.prototype.save = function (trigger, key, value) {
        var personId = trigger.personId;
        if (!this.state[personId]) {
            this.state[personId] = {};
        }
        this.state[personId][key] = value;
    };
    Locker.prototype.get = function (trigger, key) {
        var personId = trigger.personId;
        return this.state[personId] ? (this.state[personId][key] || null) : null;
    };
    Locker.prototype.delete = function (trigger, key) {
        var personId = trigger.personId;
        if (this.state[personId]) {
            delete this.state[personId][key];
        }
    };
    Locker.prototype.snapShot = function () {
        return JSON.parse(JSON.stringify(this.state));
    };
    return Locker;
}());
exports.Locker = Locker;
var extractFileData = function (contentDisposition) {
    // header >> 'content-disposition': 'attachment; filename="a.json"',      
    var fileName = contentDisposition.split(';')[1].split('=')[1].replace(/\"/g, '');
    var extension = fileName.split('.').pop() || '';
    return {
        fileName: fileName,
        extension: extension
    };
};
exports.extractFileData = extractFileData;
var $Botutils = /** @class */ (function () {
    function $Botutils(botRef) {
        this.ContextKey = '_context_';
        // https://developer.webex.com/docs/basics
        this.supportedExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'gif', 'png'];
        this.API = {
            messages: 'https://webexapis.com/v1/messages',
        };
        this.botRef = botRef;
        this.token = botRef.framework.options.token;
        this.request = axios_1.default;
    }
    $Botutils.prototype.snippet = function (ref) {
        return (0, exports.snippet)(ref);
    };
    $Botutils.prototype.htmlSnippet = function (ref, dataType) {
        if (dataType === void 0) { dataType = 'html'; }
        return (0, exports.snippet)(ref, dataType);
    };
    $Botutils.prototype.get = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, config) {
            if (config === void 0) { config = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(__assign({ url: url, method: 'GET' }, config))];
            });
        });
    };
    $Botutils.prototype.post = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, config) {
            if (config === void 0) { config = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(__assign({ url: url, method: 'POST' }, config))];
            });
        });
    };
    $Botutils.prototype.getFile = function (fileUrl_1) {
        return __awaiter(this, arguments, void 0, function (fileUrl, opts) {
            var requestOpts, res, headers, data, _a, fileName, extension, type, payload, e_2;
            if (opts === void 0) { opts = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestOpts = __assign({ method: 'GET', url: fileUrl, headers: {
                                Authorization: "Bearer ".concat(this.token),
                            } }, opts);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1.default)(requestOpts)];
                    case 2:
                        res = _b.sent();
                        headers = res.headers, data = res.data;
                        _a = (0, exports.extractFileData)(headers['content-disposition']), fileName = _a.fileName, extension = _a.extension;
                        type = headers['content-type'];
                        payload = {
                            data: data,
                            extension: extension,
                            fileName: fileName,
                            type: type,
                            markdownSnippet: (type === 'application/json' || (typeof data === 'string' && data.length < 900)) ? this.snippet(data) : ''
                        };
                        return [2 /*return*/, payload];
                    case 3:
                        e_2 = _b.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // public markdownTable(data: any) {
    // 	// todo
    // 	return data
    // }
    $Botutils.prototype.send = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.botRef.webex.messages.create(payload)];
            });
        });
    };
    $Botutils.prototype.genContextName = function (key) {
        return "".concat(this.ContextKey, "_").concat(key);
    };
    $Botutils.prototype.degenContextName = function (key) {
        return key.replace("".concat(this.ContextKey, "_"), '');
    };
    $Botutils.prototype.saveContext = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var writeData;
            return __generator(this, function (_a) {
                writeData = data ? data : { _active: true };
                return [2 /*return*/, this.saveData("".concat(this.genContextName(key)), writeData)];
            });
        });
    };
    $Botutils.prototype.getContext = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData(this.genContextName(key))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    $Botutils.prototype.contextActive = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContext(key)];
                    case 1:
                        ctx = _a.sent();
                        return [2 /*return*/, ctx ? true : false];
                }
            });
        });
    };
    $Botutils.prototype.deleteContext = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteData(this.genContextName(key))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    $Botutils.prototype.getAllContexts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fullRef, keys, actives;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.botRef.recall()];
                    case 1:
                        fullRef = _a.sent();
                        keys = Object.keys(fullRef) || [];
                        actives = keys.filter(function (key) { return key.includes(_this.ContextKey); })
                            .map(function (key) { return _this.degenContextName(key); });
                        return [2 /*return*/, actives];
                }
            });
        });
    };
    $Botutils.prototype.sendURL = function (url, title) {
        return __awaiter(this, void 0, void 0, function () {
            var card;
            return __generator(this, function (_a) {
                card = new index_1.SpeedyCard();
                if (title) {
                    card.setTitle(title).setUrl(url);
                }
                else {
                    card.setSubtitle(url).setUrl(url, 'Open');
                }
                this.botRef.sendCard(card.render(), url);
                return [2 /*return*/];
            });
        });
    };
    $Botutils.prototype.saveData = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.botRef.store(key, data)];
            });
        });
    };
    $Botutils.prototype.deleteData = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var res, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.botRef.forget(key)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_3 = _a.sent();
                                    resolve(null);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
 *
 * Storage aliases
 * getData: bot.recall
 * deleteData: bot.forget don't throw, resolve to null
 *
 */
    $Botutils.prototype.getData = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var res, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.botRef.recall(key)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_4 = _a.sent();
                                    resolve(null);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    $Botutils.prototype.resolveFilePath = function () {
        var filePieces = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filePieces[_i] = arguments[_i];
        }
        return path_1.resolve.apply(void 0, filePieces);
    };
    $Botutils.prototype.prepareLocalFile = function () {
        var filePieces = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filePieces[_i] = arguments[_i];
        }
        var target = path_1.resolve.apply(void 0, filePieces);
        var stream = (0, fs_1.createReadStream)(target);
        return stream;
    };
    $Botutils.prototype.sendFile = function () {
        var filePieces = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filePieces[_i] = arguments[_i];
        }
        try {
            var stream = this.prepareLocalFile.apply(this, filePieces);
            this.botRef.uploadStream(stream);
        }
        catch (e) {
            throw e;
        }
    };
    $Botutils.prototype.sendDataAsFile = function (data_1, extensionOrFileName_1) {
        return __awaiter(this, arguments, void 0, function (data, extensionOrFileName, fallbackText, roomId, personEmail, parentId) {
            var fullFileName, formData, formDataHeaders, headers;
            if (fallbackText === void 0) { fallbackText = ' '; }
            return __generator(this, function (_a) {
                fullFileName = this.handleExt(extensionOrFileName);
                formData = new form_data_1.default();
                formData.append('files', data, fullFileName);
                if (roomId != undefined) {
                    formData.append('roomId', roomId);
                }
                if (personEmail != undefined) {
                    formData.append('toPersonEmail', personEmail);
                }
                if (parentId != undefined)
                    formData.append('parentId', parentId);
                formData.append('text', fallbackText);
                formDataHeaders = formData.getHeaders();
                headers = __assign(__assign({}, formDataHeaders), { Authorization: "Bearer ".concat(this.token) });
                return [2 /*return*/, axios_1.default.post(this.API.messages, formData, { headers: headers })];
            });
        });
    };
    $Botutils.prototype._FSsendDataAsFile = function (data_1, extensionOrFileName_1) {
        return __awaiter(this, arguments, void 0, function (data, extensionOrFileName, config, fallbackText) {
            var fullFileName, stream, e_5;
            if (config === void 0) { config = {}; }
            if (fallbackText === void 0) { fallbackText = ' '; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullFileName = this.handleExt(extensionOrFileName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        (0, fs_1.writeFileSync)(fullFileName, data);
                        stream = (0, fs_1.createReadStream)(fullFileName);
                        return [4 /*yield*/, this.botRef.webex.messages.create({ roomId: this.botRef.room.id, files: [stream], text: fallbackText })];
                    case 2:
                        _a.sent();
                        this.killFile(fullFileName);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    $Botutils.prototype.killFile = function (path) {
        return new Promise(function (resolve, reject) {
            (0, fs_1.unlink)(path, function (err) {
                if (err) {
                    resolve(err);
                }
                else {
                    resolve({});
                }
            });
        });
    };
    $Botutils.prototype.sendDataFromUrl = function (resourceUrl_1) {
        return __awaiter(this, arguments, void 0, function (resourceUrl, fallbackText) {
            if (fallbackText === void 0) { fallbackText = ' '; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.botRef.webex.messages.create({ roomId: this.botRef.room.id, files: [resourceUrl], text: fallbackText })];
            });
        });
    };
    $Botutils.prototype.sendSnippet = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, label, dataType, fallbackText) {
            var markdown;
            if (label === void 0) { label = ''; }
            if (dataType === void 0) { dataType = 'json'; }
            if (fallbackText === void 0) { fallbackText = 'It appears your client does not support markdown'; }
            return __generator(this, function (_a) {
                if (dataType === 'json') {
                    markdown = this.snippet(data);
                }
                else {
                    markdown = this.htmlSnippet(data);
                }
                if (label) {
                    markdown = label + ' \n ' + markdown;
                }
                return [2 /*return*/, this.botRef.webex.messages.create({ roomId: this.botRef.room.id, markdown: markdown, text: fallbackText })];
            });
        });
    };
    $Botutils.prototype.handleExt = function (input) {
        var hasDot = input.indexOf('.') > -1;
        var fileName = '';
        var _a = input.split('.'), prefix = _a[0], ext = _a[1];
        if (hasDot) {
            if (!prefix || prefix === '*') {
                // '.json' case, generate prefix
                fileName = "".concat(this.generateFileName(), ".").concat(ext);
            }
            else {
                // 'a.json' case, pass through
                fileName = input;
            }
        }
        else {
            // 'json' case, generate prefix, add .
            fileName = "".concat(this.generateFileName(), ".").concat(prefix);
        }
        return fileName;
    };
    $Botutils.prototype.generateFileName = function () {
        return "".concat(this.rando(), "_").concat(this.rando());
    };
    $Botutils.prototype.rando = function () {
        return "".concat(Math.random().toString(36).slice(2));
    };
    // Alias to other helpers
    $Botutils.prototype.sendTemplate = function (utterances, template) {
        var res = (0, exports.fillTemplate)(utterances, template);
        return this.botRef.webex.messages.create({ roomId: this.botRef.room.id, text: res });
    };
    $Botutils.prototype.sendRandom = function (utterances) {
        var res = (0, exports.pickRandom)(utterances);
        return this.botRef.webex.messages.create({ roomId: this.botRef.room.id, text: res });
    };
    $Botutils.prototype.log = function () {
        var payload = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            payload[_i] = arguments[_i];
        }
        return logger_1.log.apply(void 0, payload);
    };
    $Botutils.prototype.checkMatch = function (candidate, list) {
        var checkRegex = function (regex, text) { return regex.test(text); };
        return list.some(function (element) {
            if (typeof element === 'string') {
                if (candidate === element) {
                    return true;
                }
            }
            if (typeof element === 'object') {
                checkRegex(element, candidate);
            }
        });
    };
    $Botutils.prototype.sendChips = function (chipPayload_1) {
        return __awaiter(this, arguments, void 0, function (chipPayload, title) {
            var newChips, chips, keys, writeChips, labels, card;
            if (title === void 0) { title = ''; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newChips = [];
                        if (Array.isArray(chipPayload)) {
                            chipPayload.forEach(function (chip) {
                                if (typeof chip === 'string') {
                                    var payload = {
                                        label: chip
                                    };
                                    newChips.push(payload);
                                }
                                var _a = chip, label = _a.label, handler = _a.handler;
                                if (label) {
                                    if (typeof handler === 'function') {
                                        newChips.push({ label: label, handler: handler });
                                    }
                                    else {
                                        newChips.push({ label: label });
                                    }
                                }
                            });
                        }
                        return [4 /*yield*/, this.getData(index_1.chipLabel)];
                    case 1:
                        chips = (_a.sent()) || [];
                        keys = newChips.map(function (_a) {
                            var label = _a.label;
                            return label;
                        });
                        writeChips = chips.filter(function (chip) { return !keys.includes(chip.label); }).concat(newChips);
                        return [4 /*yield*/, this.saveData(index_1.chipLabel, writeChips)
                            // Render chips in chat
                        ];
                    case 2:
                        _a.sent();
                        labels = newChips.map(function (_a) {
                            var label = _a.label;
                            return label;
                        });
                        card = new index_1.SpeedyCard().setChips(labels);
                        if (title) {
                            card.setSubtitle(title);
                        }
                        return [2 /*return*/, this.botRef.sendCard(card.render(), title)];
                }
            });
        });
    };
    $Botutils.prototype.getChipPayload = function (chipPayload_1) {
        return __awaiter(this, arguments, void 0, function (chipPayload, title) {
            var newChips, chips, keys, writeChips, labels, card;
            if (title === void 0) { title = ''; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newChips = [];
                        if (Array.isArray(chipPayload)) {
                            chipPayload.forEach(function (chip) {
                                if (typeof chip === 'string') {
                                    var payload = {
                                        label: chip
                                    };
                                    newChips.push(payload);
                                }
                                var _a = chip, label = _a.label, handler = _a.handler;
                                if (label) {
                                    if (typeof handler === 'function') {
                                        newChips.push({ label: label, handler: handler });
                                    }
                                    else {
                                        newChips.push({ label: label });
                                    }
                                }
                            });
                        }
                        return [4 /*yield*/, this.getData(index_1.chipLabel)];
                    case 1:
                        chips = (_a.sent()) || [];
                        keys = newChips.map(function (_a) {
                            var label = _a.label;
                            return label;
                        });
                        writeChips = chips.filter(function (chip) { return !keys.includes(chip.label); }).concat(newChips);
                        return [4 /*yield*/, this.saveData(index_1.chipLabel, writeChips)
                            // Render chips in chat
                        ];
                    case 2:
                        _a.sent();
                        labels = newChips.map(function (_a) {
                            var label = _a.label;
                            return label;
                        });
                        card = new index_1.SpeedyCard().setChips(labels);
                        if (title) {
                            card.setSubtitle(title);
                        }
                        return [2 /*return*/, card.render()];
                }
            });
        });
    };
    $Botutils.prototype.setChipsConfig = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.saveData(index_1.chipConfigLabel, config)];
            });
        });
    };
    $Botutils.prototype.$trigger = function (text, trigger) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                payload = {
                    text: text,
                    personId: trigger.person.id,
                    roomId: trigger.attachmentAction ? trigger.attachmentAction.roomId : trigger.message.roomId,
                };
                this.botRef.framework.onMessageCreated(payload);
                return [2 /*return*/];
            });
        });
    };
    $Botutils.prototype._auth = function (fn) {
        return fn.call(this, this.token);
    };
    $Botutils.prototype.edit = function (message, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, roomId, _a, msgId, msgRoomId, submitData, headers, url;
            return __generator(this, function (_b) {
                id = message;
                roomId = this.botRef.room.id;
                if (typeof message === 'object') {
                    _a = message, msgId = _a.id, msgRoomId = _a.roomId;
                    id = msgId;
                    roomId = msgRoomId;
                }
                submitData = {
                    roomId: roomId,
                    markdown: newData
                };
                headers = {
                    Authorization: "Bearer ".concat(this.token),
                };
                url = "".concat(this.API.messages, "/").concat(id);
                return [2 /*return*/, axios_1.default.put(url, submitData, { headers: headers })];
            });
        });
    };
    $Botutils.prototype.editFull = function (message, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, msgId, headers, url;
            return __generator(this, function (_a) {
                id = message;
                msgId = message.id;
                id = msgId;
                headers = {
                    Authorization: "Bearer ".concat(this.token),
                };
                url = "".concat(this.API.messages, "/").concat(id);
                return [2 /*return*/, axios_1.default.put(url, newData, { headers: headers })];
            });
        });
    };
    return $Botutils;
}());
exports.$Botutils = $Botutils;
var $ = function (botRef) {
    // memo?
    return new $Botutils(botRef);
};
exports.$ = $;
//# sourceMappingURL=helpers.js.map