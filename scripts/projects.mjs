export function onManageProject(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest('li');

    switch (a.dataset.action) {
        case 'create':
            const addProject = [...owner.system.projects, {
                id: `${owner.name}-project-${owner.system.projects.length + 1}`,
                name: `new project ${owner.system.projects.length + 1}`,
                difficulty: '',
                scope: ''
            }];

            owner.update({'system.projects': addProject});
            break;
        case 'edit':
            // return project.sheet.render(true);
            break;
        case 'delete':
            const deleteProject = [...owner.system.projects];
            const deleteIndex = deleteProject.findIndex(proj => proj.id === li.dataset.projectId);

            deleteProject.splice(deleteIndex, 1);

            owner.update({'system.projects': deleteProject});
            break;
        case 'toggle':
            // return project.update({disabled: !project.disabled});
            break;
    }
}
