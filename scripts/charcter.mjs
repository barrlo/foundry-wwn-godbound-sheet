import {BarrloDice} from './dice.js';

export const rollFrayDice = async (owner) => {
    const rollParts = [owner.system.godbound.frayDice];
    const data = {
        actor: this,
        roll: {
            type: 'fraydice'
        }
    };

    return await BarrloDice.Roll({
        parts: rollParts,
        data: data,
        skipDialog: true,
        speaker: ChatMessage.getSpeaker({actor: this}),
        flavor: 'Fray Dice',
        title: 'Fray Dice'
    });
};
