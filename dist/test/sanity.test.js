"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
tape_1.default("setup", function (t) {
    t.end();
});
tape_1.default("Sanity test", function (t) {
    var expected = [1, 2, 3, 4];
    var actual = [1, 2, 3, 4];
    t.deepEqual(actual, expected);
    t.end();
});
tape_1.default("teardown", function (t) {
    t.end();
});
//# sourceMappingURL=sanity.test.js.map