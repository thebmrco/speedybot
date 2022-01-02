import { BotHandler } from './../src';
/**
 * Add a "handler" below to control your bot's responses to a user-- just add to the list
 *
 * At minimum a handler must have
 * keyword: a word, RegEx, or a list of words and/or regex's to trigger the handler
 * handler: a function with access to the bot instance and "trigger" data
 * helpText: Simple explanation for how to use (this gets displayed by default if the user tells your bot "help")
 *
 * If you can make it fit in this list, you can make it do whatever you want
 * Special keyword phrases:
 * 1) "<@submit>": will be triggered whenever the user subits data from a form
 * 2) "<@catchall>": will be triggered on every message received
 * 3) "<@help>": override the built-in help handler
 * 4) "<@fileupload>": Handle file-upload event
 *
 */
declare const handlers: BotHandler[];
export default handlers;
