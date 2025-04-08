"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyricsGenerator = void 0;
// See here: https://www.youtube.com/watch?v=NeF7jqf0GU4
var src_1 = require("./../src");
exports.default = {
    keyword: ['namegame', 'namegame:start'],
    handler: function (bot, trigger) {
        var _a = trigger.args, rootCommand = _a[0], name = _a[1];
        if (rootCommand === 'namegame:start') {
            var text = "\n\t\t\t\uD83C\uDFB6\uD83C\uDFB6\uD83C\uDFB8\uD83C\uDFB6\uD83C\uDFB6\n\t\t\tCome on ev'rybody, I say now let's play a gamme\n\n\t\t\tMention this bot and give it a nammme:\n\n\t\t\tex. @botname namegame Shirley\n\n\t\t\tex. namegame Lincoln\n\t\t\t\uD83C\uDFB6\uD83C\uDFB6\uD83C\uDFB8\uD83C\uDFB6\uD83C\uDFB6\n\t\t\t";
            var myCard_1 = new src_1.SpeedyCard().setTitle('The Name Game by Shirley Ellis').setSubtitle(text).setUrl('https://www.youtube.com/watch?v=NeF7jqf0GU4').setImage('https://i3.ytimg.com/vi/NeF7jqf0GU4/hqdefault.jpg');
            return bot.sendCard(myCard_1.render(), 'It appears your client does not support adaptive cards');
        }
        var firstName = name ? name : trigger.person.firstName;
        var res = (0, exports.lyricsGenerator)(firstName);
        var warmup = ['Alright,', 'Here we go', 'Ready?', 'Deep breath...'];
        var output = "".concat((0, src_1.pickRandom)(warmup), " ").concat(res);
        var myCard = new src_1.SpeedyCard().setTitle('The Name Game by Shirley Ellis').setSubtitle(output).setUrl('https://www.youtube.com/watch?v=NeF7jqf0GU4').setImage('https://i3.ytimg.com/vi/NeF7jqf0GU4/hqdefault.jpg');
        bot.sendCard(myCard.render(), 'The Name Game by Shirley Ellis: https://www.youtube.com/watch?v=NeF7jqf0GU4');
        if (!name) {
            bot.say('Psst, try adding a name, like this: @botname namegame Shirley');
        }
        return;
    },
    helpText: "\uD83C\uDFB6\uD83C\uDFB6 Come on everybody, let's play the name game! \uD83C\uDFB6\uD83C\uDFB6 Start a game with 'namegame:start' or enter it directly, ex 'namegame Lincoln'"
};
// https://github.com/valgaze/aws-ecr/blob/master/app/lyrics_generator.js
var isVowel = function (letter) {
    var vowels = {
        'a': true,
        'e': true,
        'i': true,
        'o': true,
        'u': true
    };
    return Boolean(vowels[letter]);
};
var isBFM = function (letter) {
    var vowels = {
        'b': true,
        'f': true,
        'm': true
    };
    return Boolean(vowels[letter]);
};
var cases = function (firstLetter, remainder, fullname) {
    // Vowel case
    if (isVowel(firstLetter)) {
        return "\n".concat(fullname, ", ").concat(fullname, ", bo-").concat(fullname.toLowerCase(), "\nBanana-fana fo-f").concat(fullname.toLowerCase(), "\nFee-fi-mo-m").concat(fullname.toLowerCase(), "\n").concat(fullname, "! \t\n");
    }
    // Billy/Felix/Mary case
    if (isBFM(firstLetter)) {
        return "\n".concat(fullname, ", ").concat(fullname, ", bo-").concat(remainder, "\nBanana-fana fo-").concat(remainder, "\nFee-fi-mo-m").concat(remainder, "\n").concat(fullname, "!\n");
    }
    return "\n".concat(fullname, ", ").concat(fullname, ", bo-b").concat(remainder, "\nBanana-fana fo-f").concat(remainder, "\nFee-fi-mo-m").concat(remainder, "\n").concat(fullname, "! \t\n");
};
var lyricsGenerator = function (name) {
    if (name === void 0) { name = "Marsha"; }
    var firstLetter = name.charAt(0);
    var remainder = name.slice(1);
    return cases(firstLetter, remainder, name);
};
exports.lyricsGenerator = lyricsGenerator;
//# sourceMappingURL=namegame.js.map