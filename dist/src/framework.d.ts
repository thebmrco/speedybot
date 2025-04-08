/**
 *
 * Framework: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js
 * Bot inst: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/bot.js
 *
 */
/**
 * Framework instance: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/framework.js#L25-L34
 *
*/
export interface FrameworkInst {
    options: FrameworkOptions;
    id: string;
    active: boolean;
    isBotAccount: boolean;
    isUserAccount: boolean;
    person: Person;
    email: string;
    webex: WebexInst;
    messageFormat?: string;
    setWebexToken(token: string): Promise<string>;
    testWebexToken(token: string): Promise<string>;
    getWebexSDK(): WebexInst;
    stop(): Promise<boolean>;
    start(): Promise<boolean>;
    initialize(): Promise<boolean>;
    restart(): Promise<boolean>;
    hears(phrase: string | RegExp, action: any, helpText: string, preference?: number): string;
    clearHears(hearsId: string): void;
    showHelp(header: string, footer: string): string;
    setAuthorizer(func: any): any;
    boolean: any;
    clearAuthorizer(): void;
    on(eventName: string, handler: unknown): void;
    onMessageCreated(payload: Message): void;
}
export interface FrameworkOptions {
    token: string;
    webhookSecret: string;
    webhookRequestJSONLocation: string;
    removeWebhooksOnStart: boolean;
    removeDeviceRegistrationsOnStart: boolean;
}
/**
 * Bot
 * Bot inst: https://github.com/WebexSamples/webex-node-bot-framework/blob/master/lib/bot.js
 *
 */
export interface BotInst {
    framework: FrameworkInst;
    active: boolean;
    person: object;
    email: string;
    room: Room;
    membership: object;
    isLocked: boolean;
    isModerator: boolean;
    isGroup: boolean;
    isDirect: boolean;
    isTeam: boolean;
    isDirectTo: string;
    lastActivity: string;
    webex: WebexInst;
    implode(): Promise<boolean>;
    say(format: string, msg?: string | object): Promise<Message>;
    say(options: {
        markdown: string;
    }): Promise<Message>;
    sayWithLocalFile(message: string | object, filename: string): Promise<Message>;
    reply(replyTo: string | object, message: string | object, format?: string): Promise<Message>;
    dm(person: string, format: string | object, ...rest: any): void;
    sendCard(cardJson: any, fallbackText: string): Promise<Message>;
    dmCard(person: string, cardJson: any, fallbackText: string): void;
    censor(messageId: string): Promise<Message>;
    uploadStream(stream: any): Promise<Message>;
    add(emails: string | string[], moderator: boolean): Promise<string[]>;
    remove(emails: string | string[]): Promise<string[]>;
    getModerators(): Promise<string[]>;
    newRoom(roomName: string, email: string[], isTeam: boolean): Promise<BotInst>;
    newTeamRoom(roomName: string, email: string[]): Promise<BotInst>;
    roomRename(title: string): Promise<Room>;
    exit(): Promise<boolean>;
    store<T = any>(key: string, val: any): Promise<T>;
    recall<T = any>(key?: string): Promise<T>;
    forget<T = any>(key: string): Promise<T>;
}
export interface ToMessage extends Partial<Message> {
    toPersonId?: string;
    toPersonEmail?: string;
    files?: string[] | any[];
}
export interface Message {
    id?: string;
    roomId?: string;
    roomType?: string;
    text?: string;
    personId?: string;
    personEmail?: string;
    markdown?: string;
    html?: string;
    created?: string;
    files: string[];
}
export interface Room {
    id: string;
    title: string;
    type: string;
    isLocked: boolean;
    lastActivity: string;
    creatorId: string;
    created?: string;
    ownerId: string;
    teamId?: string;
}
export interface PhoneNumber {
    type: string;
    value: string;
}
export interface Person {
    id: string;
    emails: string[];
    phoneNumbers: PhoneNumber[];
    displayName: string;
    nickName: string;
    firstName: string;
    lastName: string;
    avatar: string;
    orgId: string;
    created: string;
    lastModified: string;
    type: string;
}
export interface Trigger {
    type: 'message' | 'attachmentAction';
    id: string;
    text: string;
    args: string[];
    message: Message;
    person: Person;
    personId: string;
    phrase: string;
    attachmentAction?: any;
}
export interface WebexInst {
    rooms: {
        create(room: Room): Promise<Room>;
        get(room: (Room | string), options: Object): Promise<Room>;
        remove(room: (Room | string)): Promise<unknown>;
        update(room: Room): Promise<Room>;
        [key: string]: any;
    };
    messages: {
        /**
         *
         * @param message
         *
         * ```ts
         * {
         * "toPersonEmail":"joe@bongo.com",
         * "text": "Here is a message"
         * }
         * ```
         *
         */
        create(message: ToMessage): Promise<Message>;
        get(message: (Message | string)): Promise<Message>;
        list(options: {
            roomId: string;
            max?: number;
            parentId?: string;
        }): Promise<Message[]>;
        remove(message: (Message | string | number)): Promise<unknown>;
        [key: string]: any;
    };
    memberships: {
        create(membership: Membership): Promise<Membership>;
        get(membership: (Message | string | number)): Promise<Membership>;
        remove(membership: (Message | string | number)): Promise<unknown>;
        update(membership: (Message | string | number)): Promise<Membership>;
    };
    request(payload: any): Promise<any>;
    [key: string]: any;
}
export interface MessageRequest {
    roomId?: string;
    parentId?: string;
    toPersonId?: string;
    toPersonEmail?: string;
    text?: string;
    markdown?: string;
    files?: string[];
    attachments?: any[];
}
export interface Membership {
    id: string;
    roomId: string;
    personId: string;
    personEmail: string;
    isModerator: boolean;
    isMonitor: boolean;
    created: string;
}
export type keywords = string | RegExp;
export type Allowedkeywords = keywords | keywords[];
export type handlerFunc = (bot: BotInst, trigger: Trigger) => void;
/**
 *
 * @member {string | RegExp | (string | RegExp)[]} keyword is used for whatever reason

 * ```
 * keyword: string or regex, or a list of both. If regex it matches on entire message, if a string just on the 1st word
 * handler: handler function
 * helpText: help text
 * preference (optional) specify what should happen if multiple handlers overlap, lower number == higher match priority
 * ```
 */
export interface BotHandler {
    keyword: Allowedkeywords;
    handler: handlerFunc;
    helpText: string;
    preference?: number;
}
export type AlertFunc = (req: any, res: any) => void;
export type ValidMethods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
export interface WebhookHandler {
    keyword: '<@webhook>';
    route: string;
    handler: AlertFunc;
    method?: ValidMethods;
}
export declare const passThru: (bot: BotInst, trigger: Trigger) => void;
