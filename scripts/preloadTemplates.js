export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/character-sheet.html',
        //Actor partials
        //Sheet tabs
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-header.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-attributes-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-gifts-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-inventory-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-projects-tab.hbs',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-notes-tab.html',

        'modules/foundry-wwn-godbound-sheet/scripts/templates/items/partials/item-effects.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/items/partials/description.html'
    ];
    return loadTemplates(templatePaths);
};
