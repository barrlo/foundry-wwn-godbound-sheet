export function onManageProject(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest('li');
    const effect = li?.dataset?.effectId
        ? owner.system.projects.get(li.dataset.effectId)
        : null;
    switch (a.dataset.action) {
        case 'create':
            const updatedProjects = [...owner.system.projects, {
                name: `new project ${owner.system.projects.length + 1}`,
                difficulty: '',
                scope: ''
            }];
            owner.update({"system.projects": updatedProjects});
            break;
        case 'edit':
            return effect.sheet.render(true);
        case 'delete':
            return effect.delete();
        case 'toggle':
            return effect.update({disabled: !effect.disabled});
    }
}

// export function prepareProjects(projects) {
//     for (let project of projects) {
//         e.SourceName; // Trigger a lookup for the source name
//         if (e.disabled) categories.inactive.effects.push(e);
//         else if (e.isTemporary) categories.temporary.effects.push(e);
//         else categories.passive.effects.push(e);
//     }
//     return categories;
// }
