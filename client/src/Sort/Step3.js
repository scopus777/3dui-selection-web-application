import React, { Component } from 'react';
import {TechniqueStructure} from "../Data/TechniqueStructure";

/*
 * Third step of the sorting view.
 */
export default class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: props.getStore().distance,
            objectSize: props.getStore().objectSize,
            density: props.getStore().density,
            subTask: props.getStore().subTask,
            manipulationAmount: props.getStore().manipulationAmount,
            questionnaireResults: props.getStore().questionnaireResults
        };

        this.state.distance = props.getStore().distance === undefined ? "0,6" : props.getStore().distance;
        this.state.objectSize = props.getStore().objectSize === undefined ? "15" : props.getStore().objectSize;
        this.state.density = props.getStore().density === undefined ? "No" : props.getStore().density;
        this.state.subTask = props.getStore().subTask === undefined ? "Positioning" : props.getStore().subTask;
        this.state.manipulationAmount = props.getStore().manipulationAmount === undefined ? "Low" : props.getStore().manipulationAmount;
        this.state.questionnaireResults = props.getStore().objectSize === undefined ? "Usability" : props.getStore().questionnaireResults;

        this.props.updateStore({
            distance: this.state.distance,
            objectSize: this.state.objectSize,
            density: this.state.density,
            subTask: this.state.subTask,
            manipulationAmount: this.state.manipulationAmount,
            questionnaireResults: this.state.questionnaireResults
        });
    }

    changeDistance = (event) => {
        this.setState({ distance: event.target.value });
        this.props.updateStore({
            distance: event.target.value
        });
    };

    changeObjectSize = (event) => {
        this.setState({ objectSize: event.target.value });
        this.props.updateStore({
            objectSize: event.target.value
        });
    };

    changeDensity = (event) => {
        this.setState({ density: event.target.value });
        this.props.updateStore({
            density: event.target.value
        });
    };

    changeSubTask = (event) => {
        this.setState({ subTask: event.target.value });
        this.props.updateStore({
            subTask: event.target.value
        });
    };

    changeManipulationAmount = (event) => {
        this.setState({ manipulationAmount: event.target.value });
        this.props.updateStore({
            manipulationAmount: event.target.value
        });
    };

    changeQuestionnaireResults = (event) => {
        this.setState({ questionnaireResults: event.target.value });
        this.props.updateStore({
            questionnaireResults: event.target.value
        });
    };

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className="step step3">
                <div className="row">
                    <form id="Form" className="form-horizontal">
                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-6">Task:</label>
                            <label className="control-label col-md-6">{this.props.getStore().task}</label>
                        </div>
                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-6">Measurement Type:</label>
                            <label className="control-label col-md-6">{this.props.getStore().measurementType}</label>
                        </div>
                        {this.props.getStore().measurementType === "Objective" && this.props.getStore().task === "Selection" &&
                            <div>
                                <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-6">Measurement:</label>
                                    <label className="control-label col-md-6">{this.props.getStore().measurement}</label>
                                </div>
                                <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-6">Distance:</label>
                                    <label className="control-label col-md-6">{this.props.getStore().distance + " m"}</label>
                                </div>
                                <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-6">Object Size:</label>
                                    <label className="control-label col-md-6">{this.props.getStore().objectSize + " cm"}</label>
                                </div>
                                <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-6">Density:</label>
                                    <label className="control-label col-md-6">{this.props.getStore().density === "No" ? "Single Object" : this.props.getStore().density +" cm"}</label>
                                </div>
                            </div>
                        }
                        {this.props.getStore().measurementType === "Objective" && this.props.getStore().task === "Manipulation" &&
                        <div>
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-6">Measurement:</label>
                                <label className="control-label col-md-6">{this.props.getStore().measurement}</label>
                            </div>
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-6">Sub Task:</label>
                                <label className="control-label col-md-6">{TechniqueStructure.TaskMap[this.props.getStore().subTask]}</label>
                            </div>
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-6">Distance:</label>
                                <label className="control-label col-md-6">{this.props.getStore().distance + " m"}</label>
                            </div>
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-6">Manipulation Amount:</label>
                                <label className="control-label col-md-6">{this.props.getStore().manipulationAmount}</label>
                            </div>
                        </div>
                        }
                        {this.props.getStore().measurementType === "Subjective" &&
                        <div>
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-6">Questionnaire Results:</label>
                                <label className="control-label col-md-6">{this.props.getStore().questionnaireResults}</label>
                            </div>
                        </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}