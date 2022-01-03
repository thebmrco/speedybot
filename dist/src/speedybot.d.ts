import { FrameworkInst, BotHandler, ToMessage, BotInst, Trigger, WebhookHandler, Message } from "./framework";
/**
 * Minimal config to get up and running. If you need a token...
 * Create new bot: https://developer.webex.com/my-apps/new/bot
 * Get an existing bot's token (tap "regenerate"): https://developer.webex.com/my-apps
 *
 * Leave webhookUrl blank to use websockets
 */
export interface SpeedybotConfig {
    token: string;
    webhookUrl?: string;
}
export declare class Speedybot {
    frameworkRef: FrameworkInst;
    initialized: boolean;
    Magickeywords: {
        "<@help>": string;
        "<@catchall>": RegExp;
    };
    MagicFrameworkkeywords: {
        "<@submit>": string;
        "<@spawn>": string;
        "<@despawn>": string;
        "<@fileupload>": string;
    };
    chips: {
        label: string;
        handler: null | Function;
    }[];
    WebhookKeyword: string;
    constructor(config: SpeedybotConfig);
    send(payload: ToMessage): void;
    sendCardToRoom(roomId: any, cardPayload: any, fallbackText?: string, parentId?: string): void;
    sendCardToPerson(email: any, cardPayload: any, fallbackText?: string): void;
    start(): Promise<FrameworkInst>;
    addHandler(botHandler: BotHandler): void;
    registerHandlersWithHelp(handlers: BotHandler[], helpHandler?: (handlers: BotHandler[]) => BotHandler): void;
    loadHandlers(...handlers: unknown[]): void;
    flatten(...handlers: unknown[]): BotHandler[];
    defaultHelpHandler(handlerList: BotHandler[]): {
        keyword: string[];
        handler(bot: BotInst, trigger: Trigger): Promise<Message>;
        helpText: string;
    };
    snippet(data: object | string): string;
    defaultHealthcheck(): {
        keyword: string[];
        handler(bot: any, trigger: any): any;
        helpText: string;
    };
    webhook(): any;
}
/**
 * SpeedybotWebhook
 * With express requires body-parser
 *
 * ex. app.post('/mywebhook', SpeedybotWebhook(config, handlers))
 * @param config: SpeedybotConfig
 * @param handlers: Bothandler[]
 * @returns Promise<unknown>
 */
export declare const SpeedybotWebhook: (config: SpeedybotConfig, handlers: (BotHandler | WebhookHandler)[], app?: any) => (req: any, res: any) => Promise<any>;
/**
 * Speedytunnel: You likely don't need/want this, just leave webhookUrl blank
 * and you can use websockets
 * @param app: express app instance
 * @param port: port to tunnel
 * @param tunnel: nGrok boot that returns Promise<string>
 * @param config: token
 * @param handlers: list of handlers
 * @param rest: a series of handlers (separated by commas), a list of handlers, or a combination of both
 */
export interface miniNgrok {
    port?: string | number;
    addr?: string | number;
}
export declare type tunnlerFunc = (config: miniNgrok) => Promise<string>;
export declare const Speedytunnel: (app: any, port: string | number, tunneler: tunnlerFunc, config: SpeedybotConfig, handlers: BotHandler[]) => Promise<void>;
/**
 *
 * @param config: Speedybot Config
 * @param handlerList: list of botHandlers
 * @returns Framework instance
 */
export declare const Launch: (config: SpeedybotConfig, handlerList: BotHandler[]) => Promise<FrameworkInst>;
export declare const speedybotKoa: () => (ctx: any) => void;
