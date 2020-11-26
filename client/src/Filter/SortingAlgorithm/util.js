/*Convert the strings into a dataset with ordinal numbers*/
export const convertToOrdinalDataSet = function (list) {
    var newList = [];
    //Setup a dictionary that converts the value into an ordinal number
    var dict = {
        "near": 1,
        "medium": 2,
        "far": 3,
        "small": 1,
        "normal": 2,
        "large": 3,
        "none": 1,
        "partial": 2,
        "complete": 3,
        "fast": 2,
        "slow": 3,
        "very close to eachother": 3,
    };

    //Go over every element in the list
    for (let i = 0; i < list.length; i++) {
        var element = {};
        //Check every property in that element
        for (var propertyName in list[i]) {
            //If the property is not the type and it is a string convert it to a number
            if (propertyName !== "type" && typeof list[i][propertyName] === "string") {
                //This property needs to be converted and then saved into the new element
                element[propertyName] = dict[list[i][propertyName]];
                continue;
            }
            element[propertyName] = list[i][propertyName];
        }
        newList.push(element)
    }

    //Return the converted list
    return newList;
};
