/*
* This structure contains all necessary Information to create all forms for techniques. It also contains Information about the fields from techniques
* */
export const TechniqueStructure = {
    TaskMap: {
        "Positioning":"Positioning",
        "Rotating":"Rotating",
        "Scaling":"Scaling",
        "PositioningRotating":"Positioning and Rotating",
        "PositioningRotatingScaling":"Positioning, Rotating and Scaling"
    },
    performance_indicators: {
        types: [
            "time",
            "precision"
        ],
        objective_manipulation:[
            {
                name: "Task Type",
                shortName: "Task Type",
                property: "task_type",
                type: "enum",
                options:[
                    'selection',
                    'manipulation',
                    'Long'
                ],
            },
            {
                name: "Distance",
                shortName: "Distance (m)",
                property: "distance",
                type: "enum",
                options:[
                    'Short',
                    'Medium',
                    'Long'
                ],
            },
            {
                name: "Manipulation Amount",
                shortName: "Manipulation Amount",
                property: "manipulation_amount",
                type:"enum",
                options:[
                    'Low',
                    'Medium',
                    'High'
                ],
            },
            {
                name: "Mean Time",
                shortName: "Mean Time (s)",
                property: "mean_time",
                type:"ignore"
            },
            {
                name: "Precision Position",
                shortName: "Precision Position (%)",
                property: "precision_position",
                type:"percentage"
            },
            {
                name: "Precision Rotation",
                shortName: "Precision Rotation (%)",
                property: "precision_rotation",
                type:"percentage"
            },
            {
                name: "Precision Scale",
                shortName: "Precision Scale (%)",
                property: "precision_scale",
                type:"percentage"
            }
        ],
        objective_selection:[
            {
                name: "Distance",
                shortName: "Distance (m)",
                property: "distance",
                type: "enum",
                options:[
                    'Short',
                    'Medium',
                    'Long'
                ],
            },
            {
                name: "Object Size",
                shortName: "Object Size (cm)",
                property: "object_size",
                type:"enum",
                options:[
                    'Small',
                    'Medium',
                    'Big'
                ],
            },
            {
                name: "Density",
                shortName: "Density (cm)",
                property: "density",
                type:"enum",
                options:[
                    'No',
                    'Medium',
                    'High'
                ],
            },
            {
                name: "Mean Time",
                shortName: "Mean Time (s)",
                property: "mean_time",
                type:"ignore"
            },
            {
                name: "Total Misses",
                shortName: "Total Misses",
                property: "misses",
                type:"int"
            }
        ],
        subjective:[
            {
                name: "Usability",
                shortName: "Usability",
                property: "usability",
                type:"ignore"
            },
            {
                name: "Naturalness",
                shortName: "Naturalness",
                property: "naturalness",
                type:"likert"
            },
            {
                name: "Fun",
                shortName: "Fun",
                property: "fun",
                type:"likert"
            },
            {
                name: "Precision",
                shortName: "Precision",
                property: "precision",
                type:"likert"
            },
            {
                name: "Speed",
                shortName: "Speed",
                property: "speed",
                type:"likert"
            },
            {
                name: "Motion Sickness",
                shortName: "Motion Sickness",
                property: "motion_sickness",
                type:"likert"
            },
            {
                name: "NASA Workload",
                shortName: "NASA Workload",
                property: "nasa_workload",
                type:"workload"
            },
            {
                name: "NASA Mental Demand",
                shortName: "NASA Mental Demand",
                property: "nasa_mental_demand",
                type:"workload"
            },
            {
                name: "NASA Physical Demand",
                shortName: "NASA Physical Demand",
                property: "nasa_physical_demand",
                type:"workload"
            },
            {
                name: "NASA Performance",
                shortName: "NASA Performance",
                property: "nasa_performance",
                type:"workload"
            },
            {
                name: "NASA Effort",
                shortName: "NASA Effort",
                property: "nasa_effort",
                type:"workload"
            },
            {
                name: "NASA Frustration",
                shortName: "NASA Frustration",
                property: "nasa_frustration",
                type:"workload"
            }
        ],
        properties:[
            {
                name: "Type",
                shortName: "Type",
                property: "type",
                type: "ignore",
            },
            {
                name: "Measurement",
                shortName: "Measurement",
                property: "measurement",
                type: "ignore",
            },
            {
                name: "Distance",
                shortName: "Distance",
                property: "distance",
                type:"enum",
                options:[
                    'near',
                    'medium',
                    'far'
                ],
            },
            {
                name: "Object Size",
                shortName: "Object Size",
                property: "object_size",
                type:"enum",
                options:[
                    'small',
                    'normal',
                    'large'
                ],
            },
            {
                name: "Goal Coverage",
                shortName: "Goal Coverage",
                property: "goal_coverage",
                type:"enum",
                options:[
                    'none',
                    'partial',
                    'complete'
                ],
            },
            {
                name: "Agility",
                shortName: "Agility",
                property: "agility",
                type:"enum",
                options:[
                    'none',
                    'slow',
                    'fast'
                ],
            },
            {
                name: "Object Density",
                shortName: "Object Density",
                property: "object_density",
                type:"enum",
                options:[
                    'none',
                    'near',
                    'very close to eachother'
                ],
            },
            {
                name: "Distance to Start and Goal",
                shortName: "Distance to Start and Goal",
                property: "distance_to_start_and_goal",
                type:"enum",
                options:[
                    'near',
                    'medium',
                    'far'
                ],
            },
            {
                name: "Degree of Change of Position",
                shortName: "Degree of Change of Position",
                property: "degree_of_change_of_position",
                type:"enum",
                options:[
                    'small',
                    'medium',
                    'large'
                ],
            },
            {
                name: "Rotation: Distance to Object",
                shortName: "Distance to Object",
                property: "distance_to_object",
                type:"enum",
                options:[
                    'near',
                    'medium',
                    'far'
                ],
            },
            {
                name: "Degree of Change of Rotation",
                shortName: "Degree of Change of Rotation",
                property: "degree_of_change_of_rotation",
                type:"enum",
                options:[
                    'small',
                    'medium',
                    'large'
                ],
            },
            {
                name: "Scale: Distance to Object",
                shortName: "Distance to Object",
                property: "distance_to_object_scale",
                type:"enum",
                options:[
                    'near',
                    'medium',
                    'far'
                ],
            },
            {
                name: "Degree of Change of Scale",
                shortName: "Degree of Change of Scale",
                property: "degree_of_change_of_scale",
                type:"enum",
                options:[
                    'small',
                    'medium',
                    'large'
                ],
            },
        ]
    }
};
