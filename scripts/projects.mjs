export function onAddProjectClick(event, owner) {
    event.preventDefault();

    const projects = [...owner.system.projects, {
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
    owner.update({'system.projects': projects});
}

export function onDeleteProjectClick(event, owner) {
    event.preventDefault();

    const a = event.currentTarget;
    const li = a.closest('li');
    const projects = [...owner.system.projects];
    const index = projects.findIndex(proj => proj.id === li.dataset.projectId);

    projects.splice(index, 1);
    owner.update({'system.projects': projects});
}

export function onProjectInputChange(event, owner) {
    event.preventDefault();

    const input = event.currentTarget;
    const li = input.closest('li');
    const projects = [...owner.system.projects];
    const index = projects.findIndex(proj => proj.id === li.dataset.projectId);
    const updatedProject = {
        ...projects[index],
        [input.dataset.field]: input.value
    };

    projects.splice(index, 1, updatedProject);
    owner.update({'system.projects': projects});
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
