/**
 * WARNING: Very much work-in-progress
 *
 * Concept: make zero-knowledge templates for adaptive cards w/
 * good default styling
 * ex.
 * SimpleCard
 * Card with chips (row of buttons)
 * Multiselect
 *
 */
export interface EasyCardPayload {
    title?: string;
    url: string;
    text?: string;
    buttonLabel?: string;
    image?: string;
    input?: {
        placeholder: string;
    };
    choices?: string[];
}
export interface EasyCardSpec {
    $schema: string;
    type: string;
    version: string;
    body: any;
    actions?: any;
}
export declare const easyCard: (easyCardPayload: any) => EasyCardSpec;
export interface ChipCardPayload {
    title?: string;
    options: string[];
}
export interface Chip {
    type: string;
    title: string;
    data: any;
}
export interface ChipCard {
    $schema: string;
    type: string;
    version: string;
    body: any;
    actions: Chip[];
}
export declare const easyChipCard: (config: ChipCardPayload) => ChipCard;
export interface EasyKeyValueCardPayload {
    options: string[][];
    title?: string;
}
export interface KeyValCard {
    $schema: string;
    type: string;
    version: string;
    body: any[];
    actions?: [];
}
export declare const easyKeyValCard: (config: EasyKeyValueCardPayload) => KeyValCard;
export declare const CardSample: {
    $schema: string;
    type: string;
    version: string;
    body: {
        type: string;
        columns: ({
            type: string;
            width: number;
            items: ({
                type: string;
                text: string;
                weight: string;
                size: string;
                isSubtle?: undefined;
                wrap?: undefined;
                id?: undefined;
                placeholder?: undefined;
                style?: undefined;
            } | {
                type: string;
                text: string;
                isSubtle: boolean;
                wrap: boolean;
                weight?: undefined;
                size?: undefined;
                id?: undefined;
                placeholder?: undefined;
                style?: undefined;
            } | {
                type: string;
                text: string;
                isSubtle: boolean;
                wrap: boolean;
                size: string;
                weight?: undefined;
                id?: undefined;
                placeholder?: undefined;
                style?: undefined;
            } | {
                type: string;
                text: string;
                wrap: boolean;
                weight?: undefined;
                size?: undefined;
                isSubtle?: undefined;
                id?: undefined;
                placeholder?: undefined;
                style?: undefined;
            } | {
                type: string;
                id: string;
                placeholder: string;
                text?: undefined;
                weight?: undefined;
                size?: undefined;
                isSubtle?: undefined;
                wrap?: undefined;
                style?: undefined;
            } | {
                type: string;
                id: string;
                placeholder: string;
                style: string;
                text?: undefined;
                weight?: undefined;
                size?: undefined;
                isSubtle?: undefined;
                wrap?: undefined;
            } | {
                type: string;
                text: string;
                weight?: undefined;
                size?: undefined;
                isSubtle?: undefined;
                wrap?: undefined;
                id?: undefined;
                placeholder?: undefined;
                style?: undefined;
            })[];
        } | {
            type: string;
            width: number;
            items: {
                type: string;
                url: string;
                size: string;
            }[];
        })[];
    }[];
    actions: {
        type: string;
        title: string;
        data: {
            cardType: string;
        };
    }[];
};
