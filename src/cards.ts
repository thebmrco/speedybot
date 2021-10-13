
export interface BaseConfig {
    title?: string;
    titleConfig?: Partial<TextBlock>;
    choices?: string[];
    buttons?: string[];
}

export interface BaseOpts {
    horizontalAlignment?:  "Left" | "Center" | "Right";
    size?: "Small" | "Default" | "Medium" | "Large" | "ExtraLarge";
}

export interface ChoiceOption {
    title: string;
    value: string;
}

export interface ChoiceBlock {
    type?: string; // "Input.ChoiceSet"
    id?: string;
    value?: string;
    isMultiSelect?: boolean;
    isVisible?: boolean;
    choices?: ChoiceOption[]
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
    type:"Image";
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
export class SpeedyCard {
    public title = ''
    public subtitle = ''
    public titleConfig: Partial<TextBlock> = {}
    public subTitleConfig: Partial<TextBlock> = {}
    public choices: ChoiceOption[] = []
    public choiceConfig: Partial<ChoiceBlock> = {}
    public image: string = '';
    public imageConfig: BaseOpts = {};
    public buttonLabel = 'Submit'
    public inputPlaceholder = ''
    public inputConfig: inputConfig = {
        id: 'inputData',
    }
    public url = ''
    public urlLabel = 'Go'
    public tableData: string[][] = []

    public json:EasyCardSpec = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": []      
    }

    constructor() {}

    setTitle(title:string, config?: Partial<TextBlock>) {
        this.title = title
        if (config) {
            this.titleConfig = config
        }
        return this
    }

    setSubtitle(subtitle: string, config?: Partial<TextBlock>) {
        this.subtitle = subtitle
        if (config) {
            this.subTitleConfig = config
        }
        return this
    }

    setChoices(choices: string[], config?:ChoiceBlock) {
        this.choices = choices.map((choice: string, idx) => {
			return {
				title: choice,
				value: String(idx)
			}
		})
        if (config) {
            this.choiceConfig = config
        }
        return this
    }

    setImage(url: string, imageConfig?) {
        this.image = url
        if (imageConfig) {
            this.imageConfig = imageConfig
        }
        return this
    }

    setButtonLabel(label: string) {
        this.buttonLabel = label
        return this
    }

    setInput(placeholder, config?) {
        this.inputPlaceholder = placeholder
        if (config) {
            this.inputConfig = config
        }
        return this
    }

    setUrl(url: string, label='Go') {
        this.urlLabel = label
        this.url = url
        return this
    }

    setTable(input: string[][]) {
        let core = input
        if (!Array.isArray(input) && typeof input === 'object') {
            core = Object.entries(input)
        }
        this.tableData = core
        return this
    }

    render() {
        let needsSubmit = false
        if (this.title) {
            const payload:TextBlock = {
                type: 'TextBlock',
                text: this.title,
                weight: 'Bolder',
                size: 'Large',
                wrap: true,
                ...this.titleConfig
            }
            this.json.body.push(payload)
        }

        if (this.subtitle) {
            const payload:TextBlock = {
                type: 'TextBlock',
                text: this.subtitle,
                size: "Small",
                isSubtle: true,
                wrap:true,
                weight: 'Lighter',
                ...this.subTitleConfig
            }
            this.json.body.push(payload)
        }

        if (this.tableData && this.tableData.length) {
            const payload = {
				"type": "ColumnSet",
				"columns": [],
				"spacing": "Padding",
				"horizontalAlignment": "Center"
			}

            const columnsData: { type: string, width: number, items: any[] }[] = [
                {
                    "type": "Column",
                    "width": 35,
                    "items": []
                },
                {
                    "type": "Column",
                    "width": 65,
                    "items": []
                }
            ]

            const buildLabel = (label: string) => {
                return {
                    "type": "TextBlock",
                    "text": label,
                    "weight": "Bolder",
                    "color": "Light",
                    "spacing": "Small"
                }
            }
            const buildValue = (value: string) => {
                return {
                    "type": "TextBlock",
                    "text": value,
                    "color": "Light",
                    "weight": "Lighter",
                    "spacing": "Small"
                }
            }

            this.tableData.forEach(([label, value], i) => {
                columnsData[0].items.push(buildLabel(label))
                columnsData[1].items.push(buildValue(value))
            })

            // @ts-ignore
            payload.columns = columnsData
            
            this.json.body.push(payload)
        }

        if (this.image) {
            const payload: ImageBlock = {
                type: "Image",
                url: this.image,
                horizontalAlignment: "Center",
                size: "Large",
                ...this.imageConfig
            }
            this.json.body.push(payload)
        }

        if (this.choices.length) {
            needsSubmit = true
            const payload: ChoiceBlock = {
                type: 'Input.ChoiceSet',
                id: 'choiceSelect',
                "value": "0", // Pick 1st one?
                "isMultiSelect": false,
                "isVisible": true,
                choices: this.choices,
                ...this.choiceConfig
            }
            this.json.body.push(payload)
        }

        if (this.inputPlaceholder) {
            needsSubmit = true
            const payload = {
                "type": "Input.Text",
                placeholder: this.inputPlaceholder,
                ...this.inputConfig,
            }
            this.json.body.push(payload)
        }


        if (needsSubmit) {
            const payload = {
                type: "Action.Submit",
                title: this.buttonLabel,
                "data": {
                    "cardType": "inputForm"
                }
            }
            this.json.actions = [payload]
        }

        if (this.url) {
            const payload: LinkButton = {
                type: "Action.OpenUrl",
                title: this.urlLabel,
                url: this.url,
            }
            if (this.json.actions) {
                this.json.actions.push(payload)
            } else {
                this.json.actions = [payload]
            }
        }
        return this.json
    }

    renderFull() {
        const cardData = this.render()
        const fullPayload = {
            "roomId": "__REPLACE__ME__",
            "markdown": "Fallback text **here**",
            "attachments": [cardData]
        }
        return fullPayload
    }
}

// todo: better types
export interface EasyCardSpec {
	$schema: string;
	type: string;
	version: string;
	body: any;
	actions?: any;
}