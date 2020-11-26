import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import TechniqueTable from "../Detail/TechniqueTable";
import {withRouter} from "react-router-dom";
import FilterUserInput, {ResetUserInput} from "./FilterUserInput";
import {getResults} from "./SortingAlgorithm/SortingAlgorithm";
import Cards from "../Cards/Cards";
import ReactStructuredQuerySearch from "react-structured-query-search";
import "react-structured-query-search/dist/index.css";
import { Toggle } from 'rsuite';

//Required to display icons from Fontawesome
const FontAwesome = require('react-fontawesome');

/*
* The Filter Component is the homepage of the Application and Shows the Search and Filter forms to the user, and displays the techniques with the correct component based on user input
* There must be no props send over as this Component can be reached without a parent component not from react router
* */
class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            techniques: [],
            results: [],
            include: FilterUserInput.include,
            exclude: FilterUserInput.exclude,
            greater: FilterUserInput.greater,
            less: FilterUserInput.less,
            criteria: FilterUserInput.criteria,
            search: FilterUserInput.search,
            list: FilterUserInput.list,
            tableKey: false,
            filterKey: false,
            expertMode: false,
            options: [],
            map: new Map([
                ["Metaphor", "metaphor"],
                ["Tasks", "tasks"],
                ["Constraints", "constraints"],
                ["Visual Feedback", "visual_feedback"],
                ["Reach", "reach"],
                ["Two-Handedness", "two_handedness"],
                ["Tracked Body Parts", "tracked_body_parts"],
                ["Minimum DoF", "minimum_dof_short"],
                ["Maximum DoF", "maximum_dof_short"],
                ["1D Input", "one_d_input_short"],
                ["Transformation Separation", "transformation_separation_short"],
                ["Selection Mapping", "selection_mapping_volume"],
                ["Position Mapping", "position_mapping"],
                ["Rotation Mapping", "rotation_mapping"],
                ["Scaling Mapping", "scaling_mapping"],
                ["Progressive Refinement", "progressive_refinement"],
                ["Disambiguation Mechanism", "disambiguation_mechanism"],
                ["Selection Indication", "selection_indication"],
                ["Release Indication", "release_indication"],
                ["Fidelity", "fidelity_overall"]
            ])
        };

        //We have to bind these functions to this context. So that the correct context is referenced
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.reloadResult = this.reloadResult.bind(this);
        this.resetUserInput = this.resetUserInput.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onToggleExpertMode = this.onToggleExpertMode.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    updateOptions() {
        let options = [];
        if (!this.state.expertMode) {
            options = [
                {
                    category: "Metaphor",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getMetaphorOptions
                },
                {
                    category: "Tasks",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTaskOptions
                },
                {
                    category: "Reach",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getReachOptions
                },
                {
                    category: "Two-Handedness",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getEasyTwoHandednessOptions
                },
                {
                    category: "Tracked Body Parts",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTrackedBodyPartsOptions
                },
                {
                    category: "1D Input",
                    type: "number",
                    operator: [">", "<", "==", "≠"]
                },
                {
                    category: "Fidelity",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    isAllowDuplicateCategories: false,
                    options: this.getFidelityOptions
                }
            ];
        } else {
            options = [
                {
                    category: "Metaphor",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getMetaphorOptions
                },
                {
                    category: "Tasks",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTaskOptions
                },
                {
                    category: "Constraints",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getConstraintOptions
                },
                {
                    category: "Visual Feedback",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getVisualFeedbackOptions
                },
                {
                    category: "Reach",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getReachOptions
                },
                {
                    category: "Two-Handedness",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTwoHandednessOptions
                },
                {
                    category: "Tracked Body Parts",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTrackedBodyPartsOptions
                },
                {
                    category: "Minimum DoF",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getMinDoFOptions
                },
                {
                    category: "Maximum DoF",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getMaxDoFOptions
                },
                {
                    category: "1D Input",
                    type: "number",
                    operator: [">", "<", "=", "≠"]
                },
                {
                    category: "Transformation Separation",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getTransformationSeparationOptions
                },
                {
                    category: "Selection Mapping",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getSelectionMappingOptions
                },
                {
                    category: "Position Mapping",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getPositionMappingOptions
                },
                {
                    category: "Rotation Mapping",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getRotationMappingOptions
                },
                {
                    category: "Scaling Mapping",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getScalingMappingOptions
                },
                {
                    category: "Progressive Refinement",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getProgressiveRefinementOptions
                },
                {
                    category: "Disambiguation Mechanism",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getDisambiguationMechanismOptions
                },
                {
                    category: "Selection Indication",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getSelectionIndicationOptions
                },
                {
                    category: "Release Indication",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getReleaseIndicationOptions
                },
                {
                    category: "Fidelity",
                    type: "textoptions",
                    operator: ["=", "≠"],
                    options: this.getFidelityOptions
                }
            ];
        }
        this.setState({options: options, filterKey: !this.state.filterKey});
    }

    //After the component mounts we fetch all the necessary data to display this component
    componentDidMount() {
        this.updateOptions();
        if(this.props.getAppStore().techniques !== undefined){
            this.setState({techniques: this.props.getAppStore().techniques}, this.reloadResult);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.techniques !== this.state.techniques)
            this.setState({techniques: prevState.techniques}, this.reloadResult);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.getAppStore().techniques !== undefined){
            return {techniques : nextProps.getAppStore().techniques};
        }
        else return null;
    }


    /*
    * If the input changed on one of the form inputs it will throw an event to this function
    * This will then save the change and reload the results
    * */
    handleInputChange(event, objectToChange) {
        //Fetch the target component of the event
        const target = event.target;
        //The name of the form element
        const name = target.name;

        //Get the object in the state that corresponds to the form this event stems from
        //This is required to only need one function for all forms
        var obj = this.state[objectToChange];

        if (target.type === "select-multiple") {
            //If the input is a select multiple, then get all the selected options
            var val = [];
            for (var i = 0, l = event.target.options.length; i < l; i++) {
                if (event.target.options[i].selected) {
                    val.push(event.target.options[i].value);
                }
            }
            //Save all those options under the object
            obj[name] = val;
        } else {
            //Save the changed value under the object
            obj[name] = target.value;
        }

        //In React a state can only be updated with setState, we replace the whole object that has the states of this forms values
        //After the state was changed, the result is reloaded
        this.setState({
            [objectToChange]: obj
        }, this.reloadResult);

        //We still have to update this object to reflect what the user selected should the user leave this page to the detail page
        FilterUserInput[objectToChange] = obj;
    }

    /*For the search field we have this function which sets the search value and also reloads the result*/
    handleSearchInputChange(event){
        this.setState({
            search: event.target.value
        }, this.reloadResult);
        FilterUserInput.search = event.target.value;
    }

    /*To reload the results we call the getResults function of the SortingAlgorithm then we set the results state variable*/
    reloadResult() {
        let results = getResults(this.state);
        //Update the state, we need to change the key so that the table updates
        this.setState({results: results, tableKey: !this.state.tableKey});
    }

    /*This gets called when the user presses the reset button*/
    resetUserInput(){
        /*First we have to reset the saved inputs*/
        ResetUserInput();
        /*Then we have to tell react to update to the new values and after that completed the results should be recalculated*/
        this.setState({
            include: FilterUserInput.include,
            exclude: FilterUserInput.exclude,
            greater: FilterUserInput.greater,
            less: FilterUserInput.less,
            criteria: FilterUserInput.criteria,
            search: FilterUserInput.search,
            list: FilterUserInput.list
        }, this.reloadResult);
    }

    getMetaphorOptions() {
        return [
            {name: "Grasping/Hand-based", id: 1},
            {name: "Grasping/Finger-based", id: 2},
            {name: "Pointing/Vector-based", id: 3},
            {name: "Pointing/Volume-based", id: 4},
            {name: "Hybrid", id: 5}
        ];
    }

    getTaskOptions() {
        return [
            {name: "Selection", id: 1},
            {name: "Positioning", id: 2},
            {name: "Rotation", id: 3},
            {name: "Scaling", id: 4}
        ];
    }

    getConstraintOptions() {
        return [
            {name: "None", id: 1},
            {name: "DoF reduction", id: 2},
            {name: "Snap to object", id: 3},
            {name: "Snap to position", id: 4}
        ];
    }

    getVisualFeedbackOptions() {
        return [
            {name: "3D cursor", id: 1},
            {name: "Target highlighting", id: 2},
            {name: "Additional cursor", id: 3},
            {name: "Adopting cursor", id: 4},
            {name: "Widget", id: 5},
            {name: "Proxy Object", id: 6}
        ];
    }

    getReachOptions() {
        return [
            {name: "Arm-length", id: 1},
            {name: "Scaled", id: 2},
            {name: "Infinite", id: 3}
        ];
    }

    getTwoHandednessOptions() {
        return [
            {name: "Single-handed", id: 1},
            {name: "Symmetric-synchron", id: 2},
            {name: "Asymmetric-synchron", id: 3},
            {name: "Symmetric-asynchron", id: 4},
            {name: "Asymmetric-asynchron", id: 5}
        ];
    }

    getEasyTwoHandednessOptions(){
        return [
            {name: "Single-handed", id: 1},
            {name: "Two-handed", id: 2}
        ];
    }

    getTrackedBodyPartsOptions() {
        return [
            {name: "Hand", id: 1},
            {name: "Forearm", id: 2},
            {name: "Upper arm", id: 3},
            {name: "Fingers", id: 4},
            {name: "Head", id: 5},
            {name: "Eyes", id: 6}
        ];
    }

    getMinDoFOptions() {
        return [
            {name: "Position", id: 1},
            {name: "Rotation", id: 2}
        ];
    }

    getMaxDoFOptions() {
        return [
            {name: "Position", id: 1},
            {name: "Rotation", id: 2}
        ];
    }

    getTransformationSeparationOptions() {
        return [
            {name: "None", id: 1},
            {name: "Partial", id: 2},
            {name: "Full", id: 3}
        ];
    }

    getSelectionMappingOptions() {
        return [
            {name: "Isomorph", id: 1},
            {name: "Velocity-oriented", id: 2},
            {name: "Area-oriented", id: 3},
            {name: "Target-oriented", id: 4},
            {name: "Remapped", id: 5}
        ];
    }

    getPositionMappingOptions() {
        return [
            {name: "Isomorph", id: 1},
            {name: "Velocity-oriented", id: 2},
            {name: "Area-oriented", id: 3},
            {name: "Target-oriented", id: 4},
            {name: "Remapped", id: 5}
        ];
    }

    getRotationMappingOptions() {
        return [
            {name: "Isomorph", id: 1},
            {name: "Velocity-oriented", id: 2},
            {name: "Area-oriented", id: 3},
            {name: "Target-oriented", id: 4},
            {name: "Remapped", id: 5}
        ];
    }

    getScalingMappingOptions() {
        return [
            {name: "Remapped", id: 1},
            {name: "Distance", id: 2}
        ];
    }

    getProgressiveRefinementOptions() {
        return [
            {name: "None", id: 1},
            {name: "Continuously", id: 2},
            {name: "Discrete/Multiple steps", id: 3},
            {name: "Discrete/Single step", id: 4}
        ];
    }

    getDisambiguationMechanismOptions() {
        return [
            {name: "None", id: 1},
            {name: "Behavioural", id: 2},
            {name: "Manual", id: 3},
            {name: "Heuristic", id: 4}
        ];
    }

    getSelectionIndicationOptions() {
        return [
            {name: "On Button Press", id: 1},
            {name: "On Button Release", id: 2},
            {name: "Dwell", id: 3},
            {name: "Gesture", id: 4}
        ];
    }

    getReleaseIndicationOptions() {
        return [
            {name: "On Button Press", id: 1},
            {name: "On Button Release", id: 2},
            {name: "Dwell", id: 3},
            {name: "Gesture", id: 4}
        ];
    }

    getFidelityOptions() {
        return [
            {name: "High", id: 1},
            {name: "Mid-high", id: 2},
            {name: "Moderate", id: 3},
            {name: "Mid-low", id: 4},
            {name: "Low", id: 5}
        ];
    }

    onKeyUp(input){
        FilterUserInput.include.name = [input.target.value];
        this.setState({
            include: FilterUserInput.include
        }, this.reloadResult);
    }

    onToggleExpertMode(){
        this.setState({
            expertMode : !this.state.expertMode
        },this.updateOptions);
    }

    filterWithCategories(categories){
        ResetUserInput();
        for (let i = 0, l = categories.length; i < l; i++) {
            if (categories[i].operator === "=")
                FilterUserInput.include[this.state.map.get(categories[i].category)].push( categories[i].value.name !== undefined ? categories[i].value.name : categories[i].value);
            else if (categories[i].operator === "≠")
                FilterUserInput.exclude[this.state.map.get(categories[i].category)].push( categories[i].value.name !== undefined ? categories[i].value.name : categories[i].value);
            else if (categories[i].operator === ">")
                FilterUserInput.greater[this.state.map.get(categories[i].category)].push(categories[i].value);
            else if (categories[i].operator === "<")
                FilterUserInput.less[this.state.map.get(categories[i].category)].push(categories[i].value);
        }
        this.setState({
            include: FilterUserInput.include
        }, this.reloadResult);
    }

    onItemClick(event) {
        console.log(event);
    }

    render() {
        let view = [];
        //Check if there are no results and if there are none tell that to the user
        if(this.state.results.length === 0){
            view.push(
                <Container key='2'>
                    <h3 className="text-center">No results were found based on your current search parameters</h3>
                </Container>
            )
        }else{
            //Check which view the user selected and put that into the view object
            if(this.state.list){
                view.push(<Cards key='3' techniques={this.state.results} showMeasurement={false}/>);
            }else{
                view.push(<TechniqueTable key={this.state.tableKey} techniques={this.state.results}/>);
            }
        }

        return (
            <div  tabIndex="0" >
                <div>
                <div className="filter-container" >
                    <div className="left" onKeyUp={this.onKeyUp} >
                        <ReactStructuredQuerySearch handleClickOutside ={this.onItemClick}
                            key={this.state.filterKey}
                            options={this.state.options}
                            isAllowOperator={true}
                            onTokenRemove={val => this.filterWithCategories(val)}
                            onTokenAdd={val => this.filterWithCategories(val)}
                            placeholder={"Filter"}
                            customClasses={{
                                input: "filter-tokenizer-text-input",
                                results: "filter-tokenizer-list-container",
                                listItem: "filter-tokenizer-list-item",
                                hover: "filter-tokenizer-hover"
                            }}
                            onOptionSelected={val => console.log(val)}
                        />
                    </div>
                    <div className="right" style={{paddingRight: "16px"}}>
                        <div style={{display: "table", border: "1px solid #ccc", borderRadius: "5px", "width": "120px"}}>
                            <div style={{display: "table-row"}}>
                            <div style={{display: "table-cell", width: "60px"}}>
                                <div style={{width: "40px", margin: "auto"}}>
                                    <span>Expert Mode</span>
                                </div>
                            </div>
                            <div style={{display: "table-cell", verticalAlign: "middle"}}><Toggle
                                defaultChecked={this.state.expertMode}
                                onChange={this.onToggleExpertMode} /></div>
                            </div>
                        </div>
                    </div>
                        {/*Icons for switch the view between list and table view (handled by setting a boolean value once pressed)*/}
                        <div className="right" style={{paddingRight: "10px"}}>
                            <div style={{display: "table", border: "1px solid #ccc", borderRadius: "5px", "width": "160px"}}>
                                <div style={{display: "table-row"}}>
                                    <div style={{display: "table-cell", width: "40px"}}>
                                        <div style={{width: "40px", margin: "auto"}}>
                                            <span>Layout</span>
                                        </div>
                                    </div>
                                    <div style={{display: "table-cell", width: "40px"}}>
                            <button
                                onClick={() => this.setState({list: true}, () => FilterUserInput.list = this.state.list)}
                                className={this.state.list ? "pr-4 btn btn-link switch-button" : "pr-4 btn btn-link secondary-color switch-button"} //Change the color of the icon if it is the active view
                                style={{cursor: 'pointer', marginLeft:"10px", "width":"40px"}}>
                                <FontAwesome
                                    name='th'
                                    size='2x'
                                />
                            </button>
                                    </div>
                                    <div style={{display: "table-cell", width: "40px"}}>
                            <button
                                onClick={() => this.setState({list: false}, () => FilterUserInput.list = this.state.list)}
                                className={this.state.list ? " btn btn-link secondary-color switch-button" : " btn btn-link switch-button"}
                                style={{cursor: 'pointer'}}>
                                <FontAwesome
                                    name='th-list'
                                    size='2x'
                                />
                            </button>
                                    </div>
                                </div>
                        </div>
                        </div>
                </div>
                </div>
                {
                    view
                }
            </div>
        );
    }
}

export default withRouter(Filter);
