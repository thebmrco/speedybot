"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chipConfigLabel = exports.chipLabel = exports.placeholder = exports.SpeedyCard = exports.$ = exports.Locker = exports.Storage = exports.snippet = exports.pickRandom = exports.fillTemplate = exports.loud = exports.askQuestion = exports.good = exports.log = exports.ascii_art = exports.help = exports.bad = exports.passThru = exports.Launch = exports.Speedytunnel = exports.SpeedybotWebhook = exports.Speedybot = void 0;
var speedybot_1 = require("./speedybot");
Object.defineProperty(exports, "Speedybot", { enumerable: true, get: function () { return speedybot_1.Speedybot; } });
Object.defineProperty(exports, "SpeedybotWebhook", { enumerable: true, get: function () { return speedybot_1.SpeedybotWebhook; } });
Object.defineProperty(exports, "Speedytunnel", { enumerable: true, get: function () { return speedybot_1.Speedytunnel; } });
Object.defineProperty(exports, "Launch", { enumerable: true, get: function () { return speedybot_1.Launch; } });
// Types: framework
var framework_1 = require("./framework");
Object.defineProperty(exports, "passThru", { enumerable: true, get: function () { return framework_1.passThru; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "bad", { enumerable: true, get: function () { return logger_1.bad; } });
Object.defineProperty(exports, "help", { enumerable: true, get: function () { return logger_1.help; } });
Object.defineProperty(exports, "ascii_art", { enumerable: true, get: function () { return logger_1.ascii_art; } });
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return logger_1.log; } });
Object.defineProperty(exports, "good", { enumerable: true, get: function () { return logger_1.good; } });
Object.defineProperty(exports, "askQuestion", { enumerable: true, get: function () { return logger_1.askQuestion; } });
Object.defineProperty(exports, "loud", { enumerable: true, get: function () { return logger_1.loud; } });
// helpers
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "fillTemplate", { enumerable: true, get: function () { return helpers_1.fillTemplate; } });
Object.defineProperty(exports, "pickRandom", { enumerable: true, get: function () { return helpers_1.pickRandom; } });
Object.defineProperty(exports, "snippet", { enumerable: true, get: function () { return helpers_1.snippet; } });
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return helpers_1.Storage; } });
Object.defineProperty(exports, "Locker", { enumerable: true, get: function () { return helpers_1.Locker; } });
Object.defineProperty(exports, "$", { enumerable: true, get: function () { return helpers_1.$; } });
// make adaptive cards less painful w/ base templates
var cards_1 = require("./cards");
Object.defineProperty(exports, "SpeedyCard", { enumerable: true, get: function () { return cards_1.SpeedyCard; } });
exports.placeholder = '__REPLACE__ME__';
exports.chipLabel = '___$CHIPS';
exports.chipConfigLabel = "".concat(exports.chipLabel, "_$config");
//# sourceMappingURL=index.js.map