import routes from "../config/routes";

export const PanelSidebar = [
    {
        id: '0', name: 'Pain Area', icon: 'fa-solid fa-house', subItem: {
            addItem: {
                name: "Add Pain Area",
                route: routes.panel.painArea
            },
            allItem: {
                name: "All Pain Area",
                route: routes.panel.painArea
            },
        }
    },
    {
        id: '0', name: 'Pain Definition', icon: 'fa-brands fa-rocketchat', subItem: {
            addItem: {
                name: "Add Pain Definition",
                route: routes.panel.painDefinition
            },
            allItem: {
                name: "All Pain Definition",
                route: routes.panel.painDefinition
            },
        }
    },
    {
        id: '0', name: 'Pain Behavior', icon: 'fa-solid fa-database', subItem: {
            addItem: {
                name: "Add Pain Behavior",
                route: routes.panel.painBehavior
            },
            allItem: {
                name: "All Pain Behavior",
                route: routes.panel.painBehavior
            },
        }
    },
    {
        id: '0', name: 'Question Definition', icon: 'fa-sharp fa-solid fa-gear', subItem: {
            addItem: {
                name: "Add Questions",
                route: routes.panel.painRelatedQuestion
            },
            allItem: {
                name: "All Questions",
                route: routes.panel.painRelatedQuestion
            },
        }
    },
    {
        id: '0', name: 'Diagnosis Definition', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            addItem: {
                name: "Add Diagnosis Definition",
                route: routes.panel.diagnosisDefinition
            },
            allItem: {
                name: "All Diagnosis Definition",
                route: routes.panel.diagnosisDefinition
            },
        }
    },
    {
        id: '0', name: 'Pain Behavior Question', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            addItem: {
                name: "Add Behavior Question",
                route: routes.panel.painBehaviorQuestion
            },
            allItem: {
                name: "All Behavior Question",
                route: routes.panel.painBehaviorQuestion
            },
        }
    },
    {
        id: '0', name: 'Possible Diagnosis', icon: 'fa-regular fa-solid fa-money-bill', route: routes.panel.possibleDiagnosis, subItem: {
            addItem: {
                name: "Add Possible Diagosis",
                route: routes.panel.possibleDiagnosis
            },
            allItem: {
                name: "All Possible Diagnosis ",
                route: routes.panel.painDefinition
            },
        }
    },
    {
        id: '0', name: ' probability', icon: 'fa-regular fa-solid fa-money-bill',  subItem: {
            addItem: {
                name: "Add Probability",
                route: routes.panel.probabilityDisease
            },
            allItem: {
                name: "All Probability",
                route: routes.panel.probabilityDisease
            },
        }
    },
    {
        id: '0', name: ' Result', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            addItem: {
                name: "Add Result",
                route: routes.panel.result
            },
            allItem: {
                name: "All result",
                route: routes.panel.result
            },
        }
    },

];
