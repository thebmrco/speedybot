export interface BaseConfig {
    title?: string;
    titleConfig?: Partial<TextBlock>;
    choices?: string[];
    buttons?: string[];
}
export interface BaseOpts {
    horizontalAlignment?: "Left" | "Center" | "Right";
    size?: "Small" | "Default" | "Medium" | "Large" | "ExtraLarge";
}
export interface ChoiceOption {
    title: string;
    value: string;
}
export interface ChoiceBlock {
    type?: string;
    id?: string;
    value?: string;
    isMultiSelect?: boolean;
    isVisible?: boolean;
    choices?: ChoiceOption[];
}
export interface TextBlock extends BaseOpts {
    type: "TextBlock";
    text: string;
    color?: "Default" | "Dark" | "Light" | "Accent" | "Good" | "Warning" | "Attention";
    fontType?: string;
    isSubtle?: boolean;
    weight: "Lighter" | "Default" | "Bolder";
    wrap?: boolean;
}
export interface ImageBlock extends BaseOpts {
    type: "Image";
    url: string;
}
export interface LinkButton {
    type: "Action.OpenUrl";
    title: string;
    url: string;
    style?: "positive" | "destructive";
}
export interface inputConfig {
    id: string;
    placeholder?: string;
}
export interface Fact {
    title: string;
    value: string;
}
export interface FactSet {
    type: 'FactSet';
    facts: Fact[];
}
export interface AttachmentData {
    [key: string]: any;
}
/**
 * SpeedyCard
 *  Work in progress
 * - zero-knowledge, easy declarative way to construct
 * "rich" (ie interactive adpative cards)
 *
 * - Chain methods together, kinda like SwiftUI's syntax: https://developer.apple.com/xcode/swiftui/
 *
 * ```ts
   import { SpeedyCard } from 'speedybot'

   const cardPayload = new SpeedyCard().setTitle('System is 👍')
    .setSubtitle('If you see this card, everything is working')
    .setImage('https://i.imgur.com/SW78JRd.jpg')
    .setInput(`What's on your mind?`)
    .setUrl(pickRandom(['https://www.youtube.com/watch?v=3GwjfUFyY6M', 'https://www.youtube.com/watch?v=d-diB65scQU']), 'Take a moment to celebrate')
    .setTable([[`Bot's Date`, new Date().toDateString()], ["Bot's Uptime", `${String(process.uptime()).substring(0, 25)}s`]])

    bot.sendCard(cardPayload.render(), 'Your client doesnt appear to support adaptive cards')
 * ```
 */
export interface SelectorPayload {
    id: string;
    type: string;
    label?: string;
}
export declare class SpeedyCard {
    title: string;
    subtitle: string;
    titleConfig: Partial<TextBlock>;
    subTitleConfig: Partial<TextBlock>;
    choices: ChoiceOption[];
    choiceConfig: Partial<ChoiceBlock>;
    image: string;
    imageConfig: BaseOpts;
    buttonLabel: string;
    inputPlaceholder: string;
    inputConfig: inputConfig;
    url: string;
    urlLabel: string;
    tableData: string[][];
    attachedData: AttachmentData;
    needsSubmit: boolean;
    dateData: Partial<SelectorPayload>;
    timeData: Partial<SelectorPayload>;
    json: EasyCardSpec;
    constructor();
    setTitle(title: string, config?: Partial<TextBlock>): this;
    setSubtitle(subtitle: string, config?: Partial<TextBlock>): this;
    setChoices(choices: string[], config?: ChoiceBlock): this;
    setImage(url: string, imageConfig?: any): this;
    setButtonLabel(label: string): this;
    setInput(placeholder: any, config?: any): this;
    setUrl(url: string, label?: string): this;
    setTable(input: string[][]): this;
    setData(payload: AttachmentData): this;
    setDate(id?: string, label?: string): this;
    setTime(id?: string, label?: string): this;
    setChips(chips: string[]): this;
    render(): EasyCardSpec;
    renderFull(): {
        roomId: string;
        markdown: string;
        attachments: EasyCardSpec[];
    };
}
export interface EasyCardSpec {
    $schema: string;
    type: string;
    version: string;
    body: any;
    actions?: any;
}
