import { SpeedybotConfig } from './index';
import { BotHandler, FrameworkInst } from './';
export declare function boot(config: SpeedybotConfig, handlers: BotHandler[]): Promise<FrameworkInst>;
