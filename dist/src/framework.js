"use strict";
/**
 *
 * Framework: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js
 * Bot inst: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/bot.js
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.passThru = void 0;
var passThru = function (bot, trigger) {
    // HACK: pass the button-tap value through the handler system
    return bot.framework.onMessageCreated(trigger.message);
};
exports.passThru = passThru;
//# sourceMappingURL=framework.js.map