import React, {Component} from 'react';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import StepZilla from "react-stepzilla";

import 'react-stepzilla/src/css/main.css';
import Cards from "../Cards/Cards";
import {getResults} from "../Filter/SortingAlgorithm/SortingAlgorithm";
import Alert from 'react-bootstrap/Alert';
import {Link} from "react-router-dom";


/*
* This component allows the user to sort the techniques regarding their results in the study.
* The techniques are sorted on base of dependent and independent variables which are selected by the user.
* The user selects the variables in multiple steps.
* */
export default class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            results: []
        };

        this.sampleStore = {
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        this.sampleStore = {
            ...this.sampleStore,
            ...update
        };
    }

    onStepChange(step) {
        window.sessionStorage.setItem("step", step);
        this.setState({
            step: step
        });
        if (step === 2)
            this.setResults();
        else
            this.setState({results: []});
    }

    reloadResult() {
        let results = getResults(this.state);
        //Update the state, we need to change the key so that the table updates
        this.setState({results: results});
    }

    addToSubjectiveToResultDsc(results_tmp, results, measurement, property, callback){
        results_tmp.sort((a, b) => (a[property] < b[property]) ? 1 : -1);
        for (let i = 0; i < results_tmp.length; i++) {
            results_tmp[i].technique.addInfo = measurement + ": " + Number(callback(results_tmp[i][property])).toFixed(2) + " %";
            results.push(results_tmp[i].technique);
        }
    }
    addToSubjectiveToResultAsc(results_tmp, results, measurement, property, callback){
        results_tmp.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
        for (let i = 0; i < results_tmp.length; i++) {
            results_tmp[i].technique.addInfo = measurement + ": " + Number(callback(results_tmp[i][property])).toFixed(2) + " %";
            results.push(results_tmp[i].technique);
        }
    }

    toPercentage1(val){
       return ((val-1)/4)*100;
    }

    toPercentage2(val){
        return val*5;
    }

    setResults(){
        let results_tmp = [];
        let results = [];
        if (this.sampleStore.measurementType === "Objective" && this.sampleStore.task === "Selection") {
            for (let i = 0; i < this.props.getAppStore().objective_selection.length; i++) {
                let objective_selection = this.props.getAppStore().objective_selection[i];
                if (objective_selection.distance === this.sampleStore.distance &&
                    objective_selection.object_size === this.sampleStore.objectSize &&
                    objective_selection.density === this.sampleStore.density) {
                    results_tmp.push(objective_selection);
                }
            }
            if (this.sampleStore.measurement === "Time") {
                results_tmp.sort((a, b) => (a.mean_time > b.mean_time) ? 1 : -1);
                for (let i = 0; i < results_tmp.length; i++) {
                    results_tmp[i].technique.addInfo = "Mean Time: " + Number(results_tmp[i].mean_time).toFixed(2) + " Seconds";
                    results.push(results_tmp[i].technique);
                }
            }
            else {
                results_tmp.sort((a, b) => (a.misses > b.misses) ? 1 : -1);
                for (let i = 0; i < results_tmp.length; i++) {
                    results_tmp[i].technique.addInfo = "Total Misses: " + results_tmp[i].misses;
                    results.push(results_tmp[i].technique);
                }
            }
        }
        else if (this.sampleStore.measurementType === "Objective" && this.sampleStore.task === "Manipulation") {
            for (let i = 0; i < this.props.getAppStore().objective_manipulation.length; i++) {
                let objective_manipulation = this.props.getAppStore().objective_manipulation[i];
                if (objective_manipulation.task_type === this.sampleStore.subTask &&
                    objective_manipulation.distance === this.sampleStore.distance &&
                    objective_manipulation.manipulation_amount === this.sampleStore.manipulationAmount) {
                    results_tmp.push(objective_manipulation);
                }
            }
            if (this.sampleStore.measurement === "Time") {
                results_tmp.sort((a, b) => (a.mean_time > b.mean_time) ? 1 : -1);
                for (let i = 0; i < results_tmp.length; i++) {
                    results_tmp[i].technique.addInfo = "Mean Time: " + Number(results_tmp[i].mean_time).toFixed(2) + " Seconds";
                    results.push(results_tmp[i].technique);
                }
            }
            else {
                if (this.sampleStore.subTask === "Positioning") {
                    results_tmp.sort((a, b) => (a.precision_position < b.precision_position) ? 1 : -1);
                    for (let i = 0; i < results_tmp.length; i++) {
                        results_tmp[i].technique.addInfo = "<b>Positioning Precision: " + (Number(results_tmp[i].precision_position) * 100).toFixed(2) + " %"
                            + ";Rotation Precision: " + (Number(results_tmp[i].precision_rotation) * 100).toFixed(2) + " %"
                            + ";Scaling Precision: " + (Number(results_tmp[i].precision_scale) * 100).toFixed(2) + " %";
                        results.push(results_tmp[i].technique);
                    }
                }
                else if (this.sampleStore.subTask === "Rotating") {
                    results_tmp.sort((a, b) => (a.precision_rotation < b.precision_rotation) ? 1 : -1);
                    for (let i = 0; i < results_tmp.length; i++) {
                        results_tmp[i].technique.addInfo = "Positioning Precision: " + (Number(results_tmp[i].precision_position) * 100).toFixed(2) + " %"
                            + ";<b>Rotation Precision: " + (Number(results_tmp[i].precision_rotation) * 100).toFixed(2) + " %"
                            + ";Scaling Precision: " + (Number(results_tmp[i].precision_scale) * 100).toFixed(2) + " %";
                        results.push(results_tmp[i].technique);
                    }
                }
                else if (this.sampleStore.subTask === "Scaling") {
                    results_tmp.sort((a, b) => (a.precision_scale < b.precision_scale) ? 1 : -1);
                    for (let i = 0; i < results_tmp.length; i++) {
                        results_tmp[i].technique.addInfo = "Positioning Precision: " + (Number(results_tmp[i].precision_position) * 100).toFixed(2) + " %"
                            + ";Rotation Precision: " + (Number(results_tmp[i].precision_rotation) * 100).toFixed(2) + " %"
                            + ";<b>Scaling Precision: " + (Number(results_tmp[i].precision_scale) * 100).toFixed(2) + " %";
                        results.push(results_tmp[i].technique);
                    }
                }
                else if (this.sampleStore.subTask === "PositioningRotating") {
                    results_tmp.sort((a, b) => (a.precision_position + a.precision_rotation < b.precision_position + b.precision_rotation) ? 1 : -1);
                    for (let i = 0; i < results_tmp.length; i++) {
                        results_tmp[i].technique.addInfo = "<b>Positioning Precision: " + (Number(results_tmp[i].precision_position) * 100).toFixed(2) + " %"
                            + ";<b>Rotation Precision: " + (Number(results_tmp[i].precision_rotation) * 100).toFixed(2) + " %"
                            + ";Scaling Precision: " + (Number(results_tmp[i].precision_scale) * 100).toFixed(2) + " %";
                        results.push(results_tmp[i].technique);
                    }
                }
                else {
                    results_tmp.sort((a, b) => (a.precision_position + a.precision_rotation  + a.precision_scale< b.precision_position + b.precision_rotation + b.precision_scale) ? 1 : -1);
                    for (let i = 0; i < results_tmp.length; i++) {
                        results_tmp[i].technique.addInfo = "<b>Positioning Precision: " + (Number(results_tmp[i].precision_position) * 100).toFixed(2) + " %"
                            + ";<b>Rotation Precision: " + (Number(results_tmp[i].precision_rotation) * 100).toFixed(2) + " %"
                            + ";<b>Scaling Precision: " + (Number(results_tmp[i].precision_scale) * 100).toFixed(2) + " %";
                        results.push(results_tmp[i].technique);
                    }
                }
            }
        }
        else {
            if (this.sampleStore.task === "Manipulation"){
                for (let i = 0; i < this.props.getAppStore().subjective_manipulation.length; i++) {
                        results_tmp.push(this.props.getAppStore().subjective_manipulation[i]);
                }
            }
            else {
                for (let i = 0; i < this.props.getAppStore().subjective_selection.length; i++) {
                    results_tmp.push(this.props.getAppStore().subjective_selection[i]);
                }
            }

            if (this.sampleStore.questionnaireResults === "Usability")
                this.addToSubjectiveToResultDsc(results_tmp,results,"Usability","usability", (x) => x);
            else if (this.sampleStore.questionnaireResults === "Naturalness")
                this.addToSubjectiveToResultDsc(results_tmp,results,"Naturalness","naturalness", this.toPercentage1);
            else if (this.sampleStore.questionnaireResults === "Fun")
                this.addToSubjectiveToResultDsc(results_tmp,results,"Fun","fun", this.toPercentage1);
            else if (this.sampleStore.questionnaireResults === "Precision")
                this.addToSubjectiveToResultDsc(results_tmp,results,"Precision","precision", this.toPercentage1);
            else if (this.sampleStore.questionnaireResults === "Speed")
                this.addToSubjectiveToResultDsc(results_tmp,results,"Speed","speed", this.toPercentage1);
            else if (this.sampleStore.questionnaireResults === "MotionSickness")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Motion Sickness","motion_sickness", this.toPercentage1);
            else if (this.sampleStore.questionnaireResults === "OverallWorkload")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Overall Workload","nasa_workload", this.toPercentage2);
            else if (this.sampleStore.questionnaireResults === "MentalDemand")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Mental Demand","nasa_mental_demand", this.toPercentage2);
            else if (this.sampleStore.questionnaireResults === "PhysicalDemand")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Physical Demand","nasa_physical_demand", this.toPercentage2);
            else if (this.sampleStore.questionnaireResults === "Performance")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Performance (Failure)","nasa_performance", this.toPercentage2);
            else if (this.sampleStore.questionnaireResults === "Effort")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Effort","nasa_effort", this.toPercentage2);
            else if (this.sampleStore.questionnaireResults === "Frustration")
                this.addToSubjectiveToResultAsc(results_tmp,results,"Frustration","nasa_frustration", this.toPercentage2);
        }
        this.setState({results: results});
    }

    render() {
        let view = "";
        if(this.state.results.length !== 0)
            view = <Cards techniques={this.state.results} showMeasurement={true}/>;

        const steps =
            [
                {name: 'Step 1', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: 'Step 2', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: 'Result', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
            ];

        return (
            <div tabIndex="0">
                <div className="sort-main">
                    <div className="sort filter-container">
                        <Alert variant="info" style={{opacity: 100, borderLeft: 0}}>
                            The ranking is based on the results of an exploratory user study. More information on the study can be found on the <Link to="/help/" className="active">help page</Link>.
                        </Alert>
                        <StepZilla
                            steps={steps}
                            preventEnterSubmission={true}
                            nextTextOnFinalActionStep={"Show Results"}
                            hocValidationAppliedTo={[3]}
                            backButtonCls={"btn btn-next btn-primary btn-lg"}
                            onStepChange={step => this.onStepChange(step)}
                        />
                    </div>
                </div>
                <div className="sort-cards">
                    {view}
                </div>
            </div>
        );
    }
}
