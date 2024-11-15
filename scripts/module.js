import {BarrloActorSheetCharacter} from './actor/character-sheet.js';
import {preloadHandlebarsTemplates} from './preloadTemplates.js';

Hooks.once('init', async function () {
    Actors.registerSheet('wwn', BarrloActorSheetCharacter, {
        types: ['character'],
        makeDefault: false,
        label: 'barrlo.SheetClassCharacter'
    });

    await preloadHandlebarsTemplates();
});

Hooks.once('ready', async function () {});
