export function onAddProjectClick(event, owner) {
    event.preventDefault();

    const addProject = [...owner.system.projects, {
        completed: false,
        cost: 0,
        difficulty: '',
        dominion: 0,
        id: `${owner.name}-project-${owner.system.projects.length + 1}`,
        influence: 0,
        name: 'new project',
        remaining: 0,
        resistance: 0,
        scope: ''
    }];
    owner.update({'system.projects': addProject});
}

export function onDeleteProjectClick(event, owner) {
    event.preventDefault();

    const a = event.currentTarget;
    const li = a.closest('li');
    const deleteProject = [...owner.system.projects];
    const deleteIndex = deleteProject.findIndex(proj => proj.id === li.dataset.projectId);

    deleteProject.splice(deleteIndex, 1);
    owner.update({'system.projects': deleteProject});
}

// export function onEditProjectClick(event, owner) {
//     event.preventDefault();
//     const a = event.currentTarget;
//     const li = a.closest('li');
//
//     switch (a.dataset.action) {
//         case 'edit':
//             // return project.sheet.render(true);
//             break;
//         case 'toggle':
//             // return project.update({disabled: !project.disabled});
//             break;
//     }
// }
