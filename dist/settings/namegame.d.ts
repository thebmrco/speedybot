import { Trigger, BotInst } from './../src';
declare const _default: {
    keyword: string[];
    handler(bot: BotInst, trigger: Trigger): Promise<import("./../src").Message> | undefined;
    helpText: string;
};
export default _default;
export declare const lyricsGenerator: (name?: string) => string;
