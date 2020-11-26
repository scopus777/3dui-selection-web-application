import React, { Component } from 'react';

/*
 * First step of the sorting view.
 */
export default class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: props.getStore().task,
            measurementType: props.getStore().measurementType
        };

        this.state.task = props.getStore().task === undefined ? "Selection" : props.getStore().task;
        this.state.measurementType = props.getStore().measurementType === undefined ? "Objective" : props.getStore().measurementType;

        this.props.updateStore({
            task: this.state.task,
            measurementType: this.state.measurementType
        });
    }

    changeTask = (event) => {
        this.setState({ task: event.target.value });
        this.props.updateStore({
            task: event.target.value
        });
    };

    changeMeasurementType = (event) => {
        this.setState({ measurementType: event.target.value });
        this.props.updateStore({
            measurementType: event.target.value
        });
    };

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className="step step1">
                <div className="row">
                    <form id="Form" className="form-horizontal">
                        <div className="form-group">
                            <label>Task</label>
                            <select onChange={this.changeTask}
                                ref="task"
                                autoComplete="off"
                                className="form-control"
                                defaultValue={this.state.task}>
                                <option value="Selection">Selection</option>
                                <option value="Manipulation">Manipulation</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Measurement Type</label>
                            <select onChange={this.changeMeasurementType}
                                ref="measurementType"
                                autoComplete="off"
                                className="form-control"
                                defaultValue={this.state.measurementType}>
                                <option value="Objective">Objective</option>
                                <option value="Subjective">Subjective</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}