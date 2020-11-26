import React, { Component } from 'react';

/*
 * Second step of the sorting view.
 */
export default class Step2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: props.getStore().distance,
            objectSize: props.getStore().objectSize,
            density: props.getStore().density,
            subTask: props.getStore().subTask,
            manipulationAmount: props.getStore().manipulationAmount,
            measurement: props.getStore().measurement,
            questionnaireResults: props.getStore().questionnaireResults
        };

        this.state.distance = props.getStore().distance === undefined ? "0,6" : props.getStore().distance;
        this.state.objectSize = props.getStore().objectSize === undefined ? "15" : props.getStore().objectSize;
        this.state.density = props.getStore().density === undefined ? "No" : props.getStore().density;
        this.state.subTask = props.getStore().subTask === undefined ? "Positioning" : props.getStore().subTask;
        this.state.manipulationAmount = props.getStore().manipulationAmount === undefined ? "Low" : props.getStore().manipulationAmount;
        this.state.measurement = props.getStore().measurement === undefined ? "Time" : props.getStore().measurement;
        this.state.questionnaireResults = props.getStore().objectSize === undefined ? "Usability" : props.getStore().questionnaireResults;

        this.props.updateStore({
            distance: this.state.distance,
            objectSize: this.state.objectSize,
            density: this.state.density,
            subTask: this.state.subTask,
            manipulationAmount: this.state.manipulationAmount,
            measurement: this.state.measurement,
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

    changeMeasurement = (event) => {
        this.setState({ measurement: event.target.value });
        this.props.updateStore({
            measurement: event.target.value
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
        if (this.props.getStore().measurementType === "Objective") {
            if (this.props.getStore().task === "Selection") {
                return (
                    <div className="step step2">
                        <div className="row">
                            <form id="Form" className="form-horizontal">
                                <div className="form-group">
                                    <label>Measurement</label>
                                    <select onChange={this.changeMeasurement}
                                            ref="measurement"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.measurement}>
                                        <option value="Time">Time</option>
                                        <option value="Precision">Misses</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Distance</label>
                                    <select onChange={this.changeDistance}
                                            ref="distance"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.distance}>
                                        <option value="0,6">0.6 m</option>
                                        <option value="3">3 m</option>
                                        <option value="6">6 m</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Object Size</label>
                                    <select onChange={this.changeObjectSize}
                                            ref="objectSize"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.objectSize}>
                                        <option value="15">15 cm</option>
                                        <option value="10">10 cm</option>
                                        <option value="5">5 cm</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Density</label>
                                    <select onChange={this.changeDensity}
                                            ref="density"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.density}>
                                        <option value="No">Single Object</option>
                                        <option value="10">10 cm</option>
                                        <option value="5">5 cm</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="step step2">
                        <div className="row">
                            <form id="Form" className="form-horizontal">
                                <div className="form-group">
                                    <label>Measurement</label>
                                    <select onChange={this.changeMeasurement}
                                            ref="measurement"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.measurement}>
                                        <option value="Time">Time</option>
                                        <option value="Precision">Precision</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Sub Task</label>
                                    <select onChange={this.changeSubTask}
                                            ref="subTask"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.subTask}>
                                        <option value="Positioning">Positioning</option>
                                        <option value="Rotating">Rotating</option>
                                        <option value="Scaling">Scaling</option>
                                        <option value="PositioningRotating">Positioning and Rotating</option>
                                        <option value="PositioningRotatingScaling">Positioning, Rotating and Scaling</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Distance</label>
                                    <select onChange={this.changeDistance}
                                            ref="distance"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.distance}>
                                        <option value="0,6">0.6 m</option>
                                        <option value="3">3 m</option>
                                        <option value="6">6 m</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Manipulation Amount</label>
                                    <select onChange={this.changeManipulationAmount}
                                            ref="manipulationAmount"
                                            autoComplete="off"
                                            className="form-control"
                                            defaultValue={this.state.manipulationAmount}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="step step2">
                    <div className="row">
                        <form id="Form" className="form-horizontal">
                            <div className="form-group">
                                <label>Questionnaire Result</label>
                                <select onChange={this.changeQuestionnaireResults}
                                        ref="questionnaireResult"
                                        autoComplete="off"
                                        className="form-control"
                                        defaultValue={this.state.questionnaireResults}>
                                    <option value="Usability">Usability</option>
                                    <option value="Naturalness">Naturalness</option>
                                    <option value="Fun">Fun</option>
                                    <option value="Precision">Precision</option>
                                    <option value="Speed">Speed</option>
                                    <option value="MotionSickness">Motion Sickness</option>
                                    <option value="OverallWorkload">Overall Workload</option>
                                    <option value="MentalDemand">Mental Demand</option>
                                    <option value="PhysicalDemand">Physical Demand</option>
                                    <option value="Performance">Performance (Failure)</option>
                                    <option value="Effort">Effort</option>
                                    <option value="Frustration">Frustration</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

    }
}