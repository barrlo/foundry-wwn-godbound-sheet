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

    return difficultyCost * scopeCost + difficultyCost * project.resistance;
};

export const onAddProjectClick = (event, owner) => {
    event.preventDefault();

    const projects = [
        ...owner.system.godbound.projects,
        {
            cost: 0,
            description: '',
            difficulty: '',
            dominion: 0,
            id: `${owner.name}-project-${owner.system.godbound.projects.length + 1}`,
            influence: 0,
            isComplete: false,
            isEditMode: false,
            name: '',
            remaining: 0,
            resistance: 0,
            scope: ''
        }
    ];
    owner.update({'system.godbound.projects': projects});
};

export const onDeleteProjectClick = (event, owner) => {
    event.preventDefault();

    const a = event.currentTarget;
    const li = a.closest('li');
    const projects = [...owner.system.godbound.projects];
    const index = projects.findIndex(proj => proj.id === li.dataset.projectId);

    projects.splice(index, 1);
    owner.update({'system.godbound.projects': projects});
};

export const onEditProjectClick = (event, owner) => {
    event.preventDefault();

    const input = event.currentTarget;
    const li = input.closest('li');
    const projects = [...owner.system.godbound.projects];
    const index = projects.findIndex(proj => proj.id === li.dataset.projectId);
    const updatedProject = {
        ...projects[index],
        isEditMode: !projects[index].isEditMode
    };

    projects.splice(index, 1, updatedProject);
    owner.update({'system.godbound.projects': projects});
};

export const onProjectInputChange = (event, owner, field) => {
    event.preventDefault();

    const input = event.currentTarget;
    const li = input.closest('li');
    const projects = [...owner.system.godbound.projects];
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
    owner.update({'system.godbound.projects': projects});
};
