export function onManageProject(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest('li');
    const effect = li?.dataset?.effectId
        ? owner.system.projects.get(li.dataset.effectId)
        : null;
    switch (a.dataset.action) {
        case 'create':
            const addProject = [...owner.system.projects, {
                name: `new project ${owner.system.projects.length + 1}`,
                difficulty: '',
                scope: ''
            }];
            owner.update({"system.projects": addProject});
            break;
        case 'edit':
            return effect.sheet.render(true);
        case 'delete':
            // const deleteProject = [...owner.system.projects, {
            //     name: `new project ${owner.system.projects.length + 1}`,
            //     difficulty: '',
            //     scope: ''
            // }];
            // owner.update({"system.projects": deleteProject});
            break;
        case 'toggle':
            return effect.update({disabled: !effect.disabled});
    }
}
