import { BotCommand } from "grammy/out/types.node";

export enum CustomCommandNames {
    SCHEDULE = 'schedule',
    RESCHEDULE = 'reschedule',
    DELETE = 'delete',
};

const scheduleCommand: BotCommand = {
    command: CustomCommandNames.SCHEDULE,
    description: 'Запланируйте'
};

const commands: BotCommand[] = [
    scheduleCommand,
]

export default commands;