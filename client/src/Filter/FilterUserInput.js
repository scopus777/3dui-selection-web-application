/*This is used to save what the user has selected even if the user visits another view.
* This does however not save between sessions so a reload would clear this.
* */
let FilterUserInput = {
    include: {
        name: [],
        metaphor: [],
        tasks: [],
        constraints: [],
        visual_feedback: [],
        reach: [],
        two_handedness: [],
        tracked_body_parts: [],
        minimum_dof_short: [],
        maximum_dof_short: [],
        one_d_input_short: [],
        transformation_separation_short: [],
        selection_mapping_volume: [],
        position_mapping: [],
        rotation_mapping: [],
        scaling_mapping: [],
        progressive_refinement: [],
        disambiguation_mechanism: [],
        selection_indication: [],
        release_indication: [],
        fidelity_overall: []
    },
    exclude: {
        name: [],
        metaphor: [],
        tasks: [],
        constraints: [],
        visual_feedback: [],
        reach: [],
        two_handedness: [],
        tracked_body_parts: [],
        minimum_dof_short: [],
        maximum_dof_short: [],
        one_d_input_short: [],
        transformation_separation_short: [],
        selection_mapping_volume: [],
        position_mapping: [],
        rotation_mapping: [],
        scaling_mapping: [],
        progressive_refinement: [],
        disambiguation_mechanism: [],
        selection_indication: [],
        release_indication: [],
        fidelity_overall: []
    },
    greater: {
        one_d_input_short: []
    },
    less: {
        one_d_input_short: []
    },
    criteria: {
    },
    search:"",
    list: true
};

/*This function resets the User Input to it's initial state*/
export const ResetUserInput = function(){
    FilterUserInput.include = ResetValuesFromObject(FilterUserInput.include);
    FilterUserInput.exclude = ResetValuesFromObject(FilterUserInput.exclude);
    FilterUserInput.criteria = ResetValuesFromObject(FilterUserInput.criteria);
    FilterUserInput.greater = ResetValuesFromObject(FilterUserInput.greater);
    FilterUserInput.less = ResetValuesFromObject(FilterUserInput.less);
    FilterUserInput.search = "";
    //We deliberately do not set the list value as we do not want to switch the current view of the application
};

/*Resets all values in a specific object*/
const ResetValuesFromObject = function(obj){
    //Go through each property of the object
    for(let key in Object.keys(obj)) {
        //The key object is a number at which position the key name is stored, so fetch that name
        let propName = Object.keys(obj)[key];
        //If the value of the property is an array then set the array as empty
        if(Array.isArray(obj[propName])){
            obj[propName] = [];
        //If the value of the property is a string then set it as an empty string
        }else if(typeof obj[propName] === "string"){
            obj[propName] = "";
        }
    }

    return obj;
};

export default FilterUserInput;
