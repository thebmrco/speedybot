"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
// import { resolve } from 'fs'
var src_1 = require("./../src");
var fakeBot = { framework: {
        options: {
            token: src_1.placeholder
        }
    } };
var inst = (0, src_1.$)(fakeBot);
(0, tape_1.default)("setup", function (t) {
    t.end();
});
(0, tape_1.default)("$uperpower, handleExt helper passes through full filename", function (t) {
    var sample = 'a.json';
    var actual = inst.handleExt(sample);
    t.deepEqual(actual, sample);
    t.end();
});
(0, tape_1.default)("$uperpower, handleExt helper generates a file name when given just an extension", function (t) {
    var sample = '.json';
    var actual = inst.handleExt('a.json');
    var result = actual.includes(sample) && actual.length > sample.length;
    t.equal(result, true);
    t.end();
});
(0, tape_1.default)("$uperpower, handleExt helper generates a file name when given just an extension without a dot", function (t) {
    var sample = '.json';
    var actual = inst.handleExt('.json');
    console.log("#", actual);
    var result = actual.includes(sample) && actual.length > sample.length;
    t.equal(result, true);
    t.end();
});
(0, tape_1.default)("$uperpower, random name will generate distinct names", function (t) {
    var sample = inst.generateFileName();
    var sample2 = inst.generateFileName();
    t.notEqual(sample, sample2);
    t.end();
});
(0, tape_1.default)("$uperpower context: name ops are inverses of each other", function (t) {
    var key = 'my_key';
    var sample = inst.genContextName(key);
    var sample2 = inst.degenContextName(sample);
    t.equal(key, sample2);
    t.end();
});
(0, tape_1.default)("teardown", function (t) {
    t.end();
});
//# sourceMappingURL=files.test.js.map