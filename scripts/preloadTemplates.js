export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/character-sheet.html',
        //Actor partials
        //Sheet tabs
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-header.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-attributes-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-spells-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-inventory-tab.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/actor-effects.html',
        'modules/foundry-wwn-godbound-sheet/scripts/templates/actors/partials/character-notes-tab.html'
    ];
    return loadTemplates(templatePaths);
};
