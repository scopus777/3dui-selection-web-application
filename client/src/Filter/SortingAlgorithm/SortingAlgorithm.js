import {convertToOrdinalDataSet} from "./util";
import {TechniqueStructure} from "../../Data/TechniqueStructure";

//Shows the maximum difference between the ordinal values
const MAX_DIFFERENCE = 2;

/*This is the function that gets called to filter, search and search through all techniques. The whole current state gets passed on*/
export const getResults = function(state){
    //First the filter is applied with all user input (this also takes care of the search)
    let results = filterTechniques(state.techniques, state.include, state.exclude, state.greater, state.less, state.search);

    //If there was no criteria set by the user then we do not need to show our confidence, this can either be that the object has no elements or all elements are empty
    if(Object.keys(state.criteria).length <= 0 || Object.keys(state.criteria).findIndex(key => state.criteria[key] !== "")  === -1){
        //Reset confidence values if they are set
        return results.reduce(function(a, e, i) {
            let newElement = {...e, confidence:undefined, confidence_metrics:undefined};
            a.push(newElement);
            return a;
        }, []);
    }

    //Sort results by performance criteria
    //Convert the criteria into ordinal numbers so it can be compared to our other data
    let criteria = convertToOrdinalDataSet([state.criteria])[0];

    //Generate a list of measurements for every type of measurement
    let typeLists = {};
    for(let j = 0; j < TechniqueStructure.performance_indicators.types.length; j++){
        let list = state[TechniqueStructure.performance_indicators.types[j]];
        //Set all weights to 1 for all measurements
        for (let i = 0; i < list.length; i++) {
            list[i] = {...list[i], weight:1.0};
        }
        //Then calculate all the weights for this type of measurement
        list = calculateWeight(criteria, list);
        //Put the just generated list in the class typeLists with the name of the type
        typeLists[TechniqueStructure.performance_indicators.types[j]] = list;
    }

    //Calculate the Performance Indicator for each result
    for (let i = 0; i < results.length; i++) {
        let value = 0;
        let performance_indicators = [];
        //Do this for every type of measurement
        for(let j = 0; j < TechniqueStructure.performance_indicators.types.length; j++){
            //Get the best weighted measurement (mean if multiple same weights)
            let normalized = getBestPerformanceIndicator(results[i]['id'], typeLists[TechniqueStructure.performance_indicators.types[j]]);
            //Normalize this indicator
            normalized.indicator = 1 - (normalized.indicator / getAbsoluteWorstPerformanceIndicator(typeLists[TechniqueStructure.performance_indicators.types[j]]));
            //Save this Information for the OwnTooltip to show how it was calculated (confidence_metrics)
            performance_indicators.push({name: TechniqueStructure.performance_indicators.types[j], value: normalized});
            //To calculate the value we multiply the indicator value with the weight
            value += normalized.indicator * normalized.weight;
        }

        //Save the calculated values in the result
        results[i]['confidence'] = value / TechniqueStructure.performance_indicators.types.length;
        results[i]['confidence_metrics'] = performance_indicators;
    }

    //Sort by their confidence with the built-in function of javascript
    results.sort((a, b) => b['confidence'] - a['confidence']);

    return results;
};

/*Filters through all the techniques with the users included property values and excluded property values*/
function filterTechniques(techniques, include, exclude, greater, less, search) {
    let results = [];
    let anyFilters = false;
    //For every technique check if it needs to be filtered out
    for (let i = 0; i < techniques.length; i++) {
        //If this is true the technique should not be displayed
        let isFiltered = false;
        //Get the converted value of the techniques values, because the lists are in string format from the server - CHANGE: removed conversion
        let converted = techniques[i];
        //Check every property in the include object if there are restrictions on it
        for (let propertyName in include) {
            //Check if the value is a string or an object
            if (typeof include[propertyName] === "object") {
                //Check if the object is an array
                if(Array.isArray(include[propertyName])){
                    //Go through each element that was selected
                    for (let j = 0; j < include[propertyName].length; j++) {
                        //if the selected element isn't included we can safely filter it
                        if (!isNaN(converted[propertyName])){
                            if (converted[propertyName] !== include[propertyName][j]) {
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (propertyName === "fidelity_overall"){
                            if (converted[propertyName].toLowerCase() !== include[propertyName][j].toLowerCase()){
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (propertyName === "two_handedness" && include[propertyName][j] === "Two-handed"){
                            if (converted[propertyName] === "Single-handed") {
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (!converted[propertyName].toLowerCase().includes(include[propertyName][j].toLowerCase())) {
                            isFiltered = true;
                            break;
                        }
                    }
                    //Do the same for excluded property but inverted
                    for (let j = 0; j < exclude[propertyName].length; j++) {
                        if (!isNaN(converted[propertyName])){
                            if (converted[propertyName] === include[propertyName][j])
                            {
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (propertyName === "fidelity_overall"){
                            if (converted[propertyName].toLowerCase() === exclude[propertyName][j].toLowerCase()){
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (propertyName === "two_handedness" && exclude[propertyName][j] === "Two-handed"){
                            if (converted[propertyName] !== "Single-handed") {
                                isFiltered = true;
                                break;
                            }
                        }
                        else if (converted[propertyName].toLowerCase().includes(exclude[propertyName][j].toLowerCase())) {
                            isFiltered = true;
                            break;
                        }
                    }
                    if (greater[propertyName] !== undefined) {
                        for (let j = 0; j < greater[propertyName].length; j++) {
                            if (converted[propertyName] <= greater[propertyName][j]) {
                                isFiltered = true;
                                break;
                            }
                        }
                    }
                    if (less[propertyName] !== undefined) {
                        for (let j = 0; j < less[propertyName].length; j++) {
                            if (converted[propertyName] >= less[propertyName][j]) {
                                isFiltered = true;
                                break;
                            }
                        }
                    }
                }
            //If it isn't an object then it can only be a string. First we check if it has a prefix that indicates its type
            } else if (propertyName.startsWith("pre_min_")) {
                //If the string is empty then the property should be ignored
                if (include[propertyName] !== "") {
                    //If the string has the min prefix remove it
                    let realPropertyName = propertyName.substring(8);
                    if (techniques[i][realPropertyName] < include[propertyName]) {
                        //If the value is smaller than the selected value then filter out this technique
                        isFiltered = true;
                        break;
                    }
                }
                //We can ignore the exclude tab, because this field is not shown there

                //It could also start with a max prefix
            } else if (propertyName.startsWith("pre_max_")) {
                //If the string is empty then the property should be ignored
                if (include[propertyName] !== "") {
                    //If the string has the max prefix remove it
                    let realPropertyName = propertyName.substring(8);
                    if (converted[realPropertyName] > include[propertyName]) {
                        //If the value is larger than the selected value then filter out this technique
                        isFiltered = true;
                        break;
                    }
                }
                //We can ignore the exclude tab, because this field is not shown there

            //If not then we treat it as a normal selection
            } else {
                //If the string is empty then the property should be ignored
                if (include[propertyName] !== "") {
                    //In the case of a string a simple equality check is enough
                    if (include[propertyName] !== converted[propertyName]) {
                        isFiltered = true;
                        break;
                    }
                }
                //Do the same for excluded property but inverted
                if (exclude[propertyName] !== "") {
                    //In the case of a string a simple equality check is enough
                    if (exclude[propertyName] === converted[propertyName]) {
                        //If it isn't equal we can safely filter out the technique
                        isFiltered = true;
                        break;
                    }
                }
            }
        }

        //If there is a search term then filter out the technique if it does not fit the name attribute
        if(search !== ""){
            if (!techniques[i].name.toUpperCase().includes(search.toUpperCase())) {
                isFiltered = true;
            }
        }

        //If we should filter out the technique, then skip this technique and do not add it to the result list
        if (isFiltered) {
            anyFilters = true;
            continue;
        }

        results.push(techniques[i]);
    }

    //If there aren't any filters then include all techniques as results
    if (anyFilters === false) {
        results = [];
        results = results.concat(techniques);
    }

    return results;
}

/*Calculate the weight of all the measurements of the given list, based on the criteria from the user*/
function calculateWeight(criteria, list) {
    //Go through each criteria that is set and edit the weightings based on the current selected value
    for (let propertyName in criteria) {
        //If the property selected by the user is defined and not empty
        if (criteria[propertyName] !== undefined && criteria[propertyName] !== "") {
            //Go over every measurement in the list and change the weighting for this property
            for (let i = 0; i < list.length; i++) {
                //If the property is not the same in the measurement we have to adjust the weighting
                if (list[i][propertyName] !== criteria[propertyName]) {
                    //Calculate the difference between the two values
                    let diff = Math.abs(list[i][propertyName] - criteria[propertyName]);
                    //Formula for adjusting the weight based on how different it is to the expected
                    list[i]["weight"] = list[i]["weight"] * 1-(1/(Object.keys(criteria).length+MAX_DIFFERENCE) * diff);
                }
            }
        }
    }
    return list;
}

/*Finds the absolute worst measurement value in that list*/
function getAbsoluteWorstPerformanceIndicator (list) {
    var worstIndicator = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i]["measurement"] > worstIndicator) {
            worstIndicator = list[i]["measurement"];
        }
    }
    return worstIndicator;
}

/*Find the best indicator from the list for the passed on technique. This is based on the weight*/
function getBestPerformanceIndicator (technique_id, list) {
    var bestIndicator = [];
    var bestWeight = -1.0;
    // Go through all the measurements only do something if the technique_id equals the technique_id passed on
    for (let i = 0; i < list.length; i++) {
        //If the weight is equal to the best Weight we found add it to the list of indicators found
        if(list[i]['technique_id'] === technique_id && list[i]["weight"] === bestWeight){
            bestIndicator.push(list[i]["measurement"])
        }
        //If the weight is better then the weight we currently saved, then replace it and reset the list of indicators found
        else if (list[i]['technique_id'] === technique_id && list[i]["weight"] > bestWeight) {
            bestWeight = list[i]["weight"];
            bestIndicator = [list[i]["measurement"]];
        }
    }

    //return the average of the bestIndicator (If there is only one the average is the single element)
    return {"indicator": average(bestIndicator), "weight": bestWeight};
}

/*Function to calculate the average
* From: https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array#10624256
* */
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
