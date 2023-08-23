import routes from "../config/routes";

export const PanelSidebar = [
    {
        id: '0', name: 'Pain Area', icon: 'fa-solid fa-house', subItem: {
            allItem: {
                name: "All Pain Area",
                route: routes.panel.getPainArea
            },
            addItem: {
                name: "Add Pain Area",
                route: routes.panel.painArea
            },
         
        }
    },
    {
        id: '0', name: 'Pain Definition', icon: 'fa-brands fa-rocketchat', subItem: {
            allItem: {
                name: "All Pain Definition",
                route: routes.panel.getPainDefinition
            },
            addItem: {
                name: "Add Pain Definition",
                route: routes.panel.painDefinition
            },
        
        }
    },
    {
        id: '0', name: 'Pain Behavior', icon: 'fa-solid fa-database', subItem: {
            allItem: {
                name: "All Pain Behavior",
                route: routes.panel.getPainBehavior
            },
            addItem: {
                name: "Add Pain Behavior",
                route: routes.panel.painBehavior
            },
         
        }
    },
    {
        id: '0', name: 'Question Definition', icon: 'fa-sharp fa-solid fa-gear', subItem: {
            allItem: {
                name: "All Questions",
                route: routes.panel.getQuestions
            },
            addItem: {
                name: "Add Questions",
                route: routes.panel.painRelatedQuestion
            },
           
        }
    },
    {
        id: '0', name: 'Diagnosis Definition', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            allItem: {
                name: "All Diagnosis Definition",
                route: routes.panel.getDiagnosisDefinition
            },
            addItem: {
                name: "Add Diagnosis Definition",
                route: routes.panel.diagnosisDefinition
            },
           
        }
    },
    {
        id: '0', name: 'Pain Behavior Question', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            allItem: {
                name: "All Behavior Question",
                route: routes.panel.getPainBehaviorQuestion
            },
            addItem: {
                name: "Add Behavior Question",
                route: routes.panel.painBehaviorQuestion
            },
            
        }
    },
    {
        id: '0', name: 'Possible Diagnosis', icon: 'fa-regular fa-solid fa-money-bill', route: routes.panel.possibleDiagnosis, subItem: {
            allItem: {
                name: "All Possible Diagnosis ",
                route: routes.panel.painDefinition
            },
            addItem: {
                name: "Add Possible Diagosis",
                route: routes.panel.possibleDiagnosis
            },
           
        }
    },
    {
        id: '0', name: ' probability', icon: 'fa-regular fa-solid fa-money-bill',  subItem: {
            allItem: {
                name: "All Probability",
                route: routes.panel.probabilityDisease
            },
            addItem: {
                name: "Add Probability",
                route: routes.panel.probabilityDisease
            },
            
        }
    },
    {
        id: '0', name: ' Result', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            allItem: {
                name: "All result",
                route: routes.panel.result
            },
            addItem: {
                name: "Add Result",
                route: routes.panel.result
            },
          
        }
    },

];
