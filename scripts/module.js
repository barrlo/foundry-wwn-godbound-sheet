import {BarrloActorSheetCharacter} from './actor/character-sheet.js';
import {preloadHandlebarsTemplates} from './preloadTemplates.js';

Hooks.once('init', async function () {
    Actors.registerSheet('wwn', BarrloActorSheetCharacter, {
        types: ['character'],
        makeDefault: false,
        label: 'barrlo.SheetClassCharacter'
    });

    await preloadHandlebarsTemplates();

    Handlebars.registerHelper('select', function (value, options) {
        const $el = $('<select />').html(options.fn(this));
        $el.find('[value="' + value + '"]').attr({selected: 'selected'});
        return $el.html();
    });
});

Hooks.once('ready', async function () {});
