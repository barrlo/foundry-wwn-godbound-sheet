const calculateCost = project => {
    const difficultyValue = {
        plausible: 1,
        improbable: 2,
        impossible: 4
    };
    const scopeValue = {
        village: 1,
        city: 2,
        region: 4,
        nation: 8,
        realm: 16
    };
    // resistance = diff * res?
    const difficultyCost = difficultyValue[project.difficulty];
    const scopeCost = scopeValue[project.scope];

    return (difficultyCost * scopeCost) + (difficultyCost * project.resistance);
};

export function onAddProjectClick(event, owner) {
    event.preventDefault();

    const projects = [...owner.system.projects, {
        completed: false,
        cost: 0,
        description: '',
        difficulty: '',
        dominion: 0,
        id: `${owner.name}-project-${owner.system.projects.length + 1}`,
        influence: 0,
        name: '',
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

export function onProjectInputChange(event, owner, field) {
    event.preventDefault();

    const input = event.currentTarget;
    const li = input.closest('li');
    const projects = [...owner.system.projects];
    const index = projects.findIndex(proj => proj.id === li.dataset.projectId);
    const updatedProject = {
        ...projects[index],
        [field]: input.value
    };
    const cost = calculateCost(updatedProject);
    const remaining = cost - updatedProject.dominion - updatedProject.influence;

    projects.splice(index, 1, {
        ...updatedProject,
        cost,
        remaining
    });
    owner.update({'system.projects': projects});
}

// export function onProjectDifficultyChange(event, owner, field) {
//     event.preventDefault();
//
//     const input = event.currentTarget;
//     const li = input.closest('li');
//     const projects = [...owner.system.projects];
//     const index = projects.findIndex(proj => proj.id === li.dataset.projectId);
//     const updatedProject = {
//         ...projects[index],
//         [field]: input.value
//     };
//
//     projects.splice(index, 1, {
//         ...updatedProject,
//         cost: calculateCost(updatedProject)
//     });
//     owner.update({'system.projects': projects});
// }

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
