import routes from "../config/routes";

export const PanelSidebar = [
    {
        id: 'Pain Area', name: 'Pain Area', icon: 'fa-solid fa-house', subItem: {
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
        id: 'Pain Definition', name: 'Pain Definition', icon: 'fa-brands fa-rocketchat', subItem: {
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
        id: 'Pain Bheavior', name: 'Pain Behavior', icon: 'fa-solid fa-database', subItem: {
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
        id: 'Question', name: 'Question Definition', icon: 'fa-sharp fa-solid fa-gear', subItem: {
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
        id: 'Diagnosis', name: 'Diagnosis Definition', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
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
        id: 'Pain behavior Qquestion', name: 'Pain Behavior Question', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
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
        id: 'Possible diagnosis', name: 'Possible Diagnosis', icon: 'fa-regular fa-solid fa-money-bill', route: routes.panel.possibleDiagnosis, subItem: {
            allItem: {
                name: "All Possible Diagnosis ",
                route: routes.panel.getPossibleDiagnosis
            },
            addItem: {
                name: "Add Possible Diagosis",
                route: routes.panel.possibleDiagnosis
            },
           
        }
    },
    // {
    //     id: '0', name: ' probability', icon: 'fa-regular fa-solid fa-money-bill',  subItem: {
    //         allItem: {
    //             name: "All Probability",
    //             route: routes.panel.probabilityDisease
    //         },
    //         addItem: {
    //             name: "Add Probability",
    //             route: routes.panel.probabilityDisease
    //         },
            
    //     }
    // },
    {
        id: 'result', name: ' Result', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            allItem: {
                name: "All result",
                route: routes.panel.getResult
            },
            addItem: {
                name: "Add Result",
                route: routes.panel.result
            },
          
        }
    },
    {
        id: 'treatment', name: ' Treatment', icon: 'fa-regular fa-solid fa-money-bill', subItem: {
            allItem: {
                name: "All Treatment",
                route: routes.panel.getTreatment
            },
            addItem: {
                name: "Add Treatment",
                route: routes.panel.treatment
            },
          
        }
    },

];
