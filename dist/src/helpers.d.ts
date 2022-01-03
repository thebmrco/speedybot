/// <reference types="node" />
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BotInst, Trigger, ToMessage, Message } from './framework';
import { EasyCardSpec } from "./cards";
/**
* @param list
* Pick an item from the list
**/
export declare const pickRandom: (list: any) => any;
/**
 * Make sure webhookUrl exists and has an ending path
 * @param webhookUrl
 *
 *
 * @returns boolean | throws
 */
export declare const ValidatewebhookUrl: (webhookUrl: string) => boolean;
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
export declare const fillTemplate: (utterances: string | string[], template: {
    [key: string]: any;
}) => string;
export declare const snippet: (data: string | object, dataType?: string) => string;
export declare const htmlSnippet: (data: string | object) => string;
export declare class Storage {
    static get(bot: any, key: string): Promise<null>;
    static save(bot: any, key: string, val: any): Promise<any>;
    static delete(bot: any, key: any): Promise<any>;
}
export declare class Locker<T> {
    state: T;
    constructor(state?: T);
    save(trigger: Trigger, key: string, value: unknown): void;
    get(trigger: Trigger, key: string): any;
    delete(trigger: Trigger, key: string): void;
    snapShot(): any;
}
export interface SpeedyFileData<T = any> {
    data: T;
    extension: string;
    fileName: string;
    type: string;
    markdownSnippet: string;
}
export declare const extractFileData: (contentDisposition: string) => {
    fileName: string;
    extension: string;
};
export declare class $Botutils {
    token: string;
    botRef: BotInst;
    request: (payload: any) => Promise<any>;
    ContextKey: string;
    supportedExtensions: string[];
    private API;
    constructor(botRef: BotInst | any);
    snippet(ref: (string | object)): string;
    htmlSnippet(ref: (string | object), dataType?: string): string;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: any, config?: AxiosRequestConfig): Promise<T>;
    getFile<T = any>(fileUrl: string, opts?: AxiosRequestConfig): Promise<SpeedyFileData<T>>;
    send(payload: ToMessage): Promise<Message>;
    genContextName(key: string): string;
    degenContextName(key: string): string;
    saveContext<T = any>(key: string, data?: T): Promise<void>;
    getContext<T = any>(key: string): Promise<T | null>;
    contextActive(key: string): Promise<boolean>;
    deleteContext<T = any>(key: string): Promise<void>;
    getAllContexts(): Promise<string[]>;
    sendURL(url: string, title?: string): Promise<void>;
    saveData<T = any>(key: string, data: any): Promise<T>;
    deleteData<T = any>(key: string): Promise<T | null>;
    /**
 *
 * Storage aliases
 * getData: bot.recall
 * deleteData: bot.forget don't throw, resolve to null
 *
 */
    getData<T = any>(key: string): Promise<T | null>;
    resolveFilePath(...filePieces: string[]): string;
    prepareLocalFile(...filePieces: string[]): import("fs").ReadStream;
    sendFile(...filePieces: string[]): void;
    sendDataAsFile<T = any>(data: T, extensionOrFileName: string, fallbackText?: string, roomId?: string, personEmail?: string, parentId?: string): Promise<AxiosResponse<any, any>>;
    _FSsendDataAsFile<T = any>(data: T, extensionOrFileName: string, config?: FileConfig, fallbackText?: string): Promise<void>;
    killFile(path: string): Promise<unknown>;
    sendDataFromUrl(resourceUrl: string, fallbackText?: string): Promise<Message>;
    sendSnippet(data: string | object, label?: string, dataType?: string, fallbackText?: string): Promise<Message>;
    handleExt(input: string): string;
    generateFileName(): string;
    rando(): string;
    sendTemplate(utterances: string | string[], template: {
        [key: string]: any;
    }): Promise<Message>;
    sendRandom(utterances: string[]): Promise<Message>;
    log(...payload: any[]): void;
    checkMatch(candidate: any, list: (RegExp | string)[]): boolean;
    sendChips(chipPayload: ChipPayload, title?: string): Promise<Message>;
    getChipPayload(chipPayload: ChipPayload, title?: string): Promise<EasyCardSpec>;
    setChipsConfig(config: ChipConfig): Promise<any>;
    $trigger(text: string, trigger: Trigger): Promise<void>;
    _auth(fn: Function): any;
}
export interface FileConfig {
    type?: 'json' | 'buffer' | 'text';
}
export declare const $: (botRef: BotInst | any) => $Botutils;
export interface Chip {
    label: string;
    handler?: (bot: BotInst, trigger: Trigger) => void;
}
export declare type ChipPayload = string[] | Chip[] | (string | Chip)[];
export interface ChipConfig {
    disappearOnTap?: boolean;
}
