import {BarrloActorSheetCharacter} from './actor/character-sheet.js';
import {BarrloActor} from './actor/entity.js';
import {BarrloItemSheet} from './item/item-sheet.js';
import {BarrloItem} from './item/entity.js';
import {preloadHandlebarsTemplates} from './preloadTemplates.js';
import {registerSettings} from './settings.js';

Hooks.once('init', async function () {
    // Register custom system settings
    registerSettings();

    CONFIG.Actor.documentClass = BarrloActor;
    CONFIG.Item.documentClass = BarrloItem;

    Actors.registerSheet('wwn', BarrloActorSheetCharacter, {
        types: ['character'],
        makeDefault: false,
        label: 'barrlo.GodboundCharacterSheet'
    });
    Items.registerSheet('wwn', BarrloItemSheet, {
        makeDefault: true,
        label: 'barrlo.GodboundItemSheet'
    });

    await preloadHandlebarsTemplates();

    Handlebars.registerHelper('select', function (value, options) {
        const $el = $('<select />').html(options.fn(this));
        $el.find('[value="' + value + '"]').attr({selected: 'selected'});
        return $el.html();
    });
});

Hooks.once('ready', async function () {});
