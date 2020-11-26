import React, {Component} from 'react';
import {TechniqueStructure} from "../Data/TechniqueStructure";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {Link} from "react-router-dom";

/*
* Creates a table which displays the aggregated results of the selection and manipulation study.
* This contains the objective measurements and the answers of teh questionnaires.
* */
class StudyResultsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            measurements_objective_manipulation: [],
            measurements_objective_selection: [],
            measurements_subjective_manipulation: [],
            measurements_subjective_selection: []
        };
    }

    //Fetch the required data for that specific technique
    componentDidMount() {
        this.fetchData();
    }

    /*After a prop has changed this function is called*/
    componentDidUpdate(prevProps) {
        //Check to see if it was the technique id prop that was changed
        //This has the reason that otherwise the image data would not be fetched if the technique is set later
        if (this.props.id !== prevProps.id) {
            this.fetchData();
        }
    }

    /*This function fetches the urls from the server fore the study results*/
    fetchData() {
        fetch('/techniques/' + this.props.id + "/objective_manipulation")
            .then(res => res.json())
            .then(data => this.setState({measurements_objective_manipulation: data}));

        fetch('/techniques/' + this.props.id + "/objective_selection")
            .then(res => res.json())
            .then(data => this.setState({measurements_objective_selection: data}));

        fetch('/techniques/' + this.props.id + "/subjective/manipulation")
            .then(res => res.json())
            .then(data => this.setState({measurements_subjective_manipulation: data}));

        fetch('/techniques/' + this.props.id + "/subjective/selection")
            .then(res => res.json())
            .then(data => this.setState({measurements_subjective_selection: data}));
    }

    render() {
        if (this.state.measurements_objective_manipulation.length <= 0 && this.state.measurements_objective_selection.length <= 0)
            return null;

        let header_objective_manipulation = [];
        for (let i = 0; i < TechniqueStructure.performance_indicators.objective_manipulation.length; i++) {
            let prop = TechniqueStructure.performance_indicators.objective_manipulation[i];
            header_objective_manipulation.push(<th key={i}>{prop.shortName}</th>);
        }

        let body_objective_manipulation = [];
        for (let i = 0; i < this.state.measurements_objective_manipulation.length; i++) {
            let fields = [];
            for (let j = 0; j < TechniqueStructure.performance_indicators.objective_manipulation.length; j++) {
                if (TechniqueStructure.performance_indicators.objective_manipulation[j].property === "task_type")
                    fields.push(
                        <td key={i + "_" + j}>{TechniqueStructure.TaskMap[this.state.measurements_objective_manipulation[i][TechniqueStructure.performance_indicators.objective_manipulation[j].property]]}</td>)
                else {
                    let type = TechniqueStructure.performance_indicators.objective_manipulation[j].type;
                    let val = Number(this.state.measurements_objective_manipulation[i][TechniqueStructure.performance_indicators.objective_manipulation[j].property]);
                    if (type === "percentage")
                        val = val * 100;
                    val = val.toFixed(2);
                    fields.push(<td key={i + "_" + j}>{type === "enum" ? this.state.measurements_objective_manipulation[i][TechniqueStructure.performance_indicators.objective_manipulation[j].property] : val}</td>)
                }
            }
            body_objective_manipulation.push(<tr key={i}>{fields}</tr>);
        }

        let header_objective_selection = [];
        for (let i = 0; i < TechniqueStructure.performance_indicators.objective_selection.length; i++) {
            let prop = TechniqueStructure.performance_indicators.objective_selection[i];
            header_objective_selection.push(<th key={i}>{prop.shortName}</th>);
        }

        let body_objective_selection = [];
        for (let i = 0; i < this.state.measurements_objective_selection.length; i++) {
            let fields = [];
            for (let j = 0; j < TechniqueStructure.performance_indicators.objective_selection.length; j++) {
                fields.push(
                    <td key={i + "_" + j}>{(TechniqueStructure.performance_indicators.objective_selection[j].type === 'ignore') ?
                        Number(this.state.measurements_objective_selection[i][TechniqueStructure.performance_indicators.objective_selection[j].property]).toFixed(2) :
                        this.state.measurements_objective_selection[i][TechniqueStructure.performance_indicators.objective_selection[j].property]}</td>)
            }
            body_objective_selection.push(<tr key={i}>{fields}</tr>);
        }

        let header_subjective_manipulation = [];
        for (let i = 0; i < TechniqueStructure.performance_indicators.subjective.length; i++) {
            let prop = TechniqueStructure.performance_indicators.subjective[i];
            header_subjective_manipulation.push(<th key={i}>{prop.shortName + " (%)"}</th>);
        }

        let body_subjective_manipulation = [];
        for (let i = 0; i < this.state.measurements_subjective_manipulation.length; i++) {
            let fields = [];
            for (let j = 0; j < TechniqueStructure.performance_indicators.subjective.length; j++) {
                let type = TechniqueStructure.performance_indicators.subjective[j].type;
                let val = Number(this.state.measurements_subjective_manipulation[i][TechniqueStructure.performance_indicators.subjective[j].property]);
                if (type === "likert")
                    val = ((val - 1) / 4) * 100;
                else if (type === "workload")
                    val = ((val - 1) / 19) * 100;
                val = val.toFixed(2);
                fields.push(
                    <td key={i + "_" + j}>{val}</td>)
            }
            body_subjective_manipulation.push(<tr key={i}>{fields}</tr>);
        }

        let header_subjective_selection = [];
        for (let i = 0; i < TechniqueStructure.performance_indicators.subjective.length; i++) {
            let prop = TechniqueStructure.performance_indicators.subjective[i];
            header_subjective_selection.push(<th key={i}>{prop.shortName + " (%)"}</th>);
        }

        let body_subjective_selection = [];
        for (let i = 0; i < this.state.measurements_subjective_selection.length; i++) {
            let fields = [];
            for (let j = 0; j < TechniqueStructure.performance_indicators.subjective.length; j++) {
                let type = TechniqueStructure.performance_indicators.subjective[j].type;
                let val = Number(this.state.measurements_subjective_selection[i][TechniqueStructure.performance_indicators.subjective[j].property]);
                if (type === "likert")
                    val = ((val - 1) / 4) * 100;
                else if (type === "workload")
                    val = ((val - 1) / 19) * 100;
                val = val.toFixed(2);
                fields.push(
                    <td key={i + "_" + j}>{val}</td>)
            }
            body_subjective_selection.push(<tr key={i}>{fields}</tr>);
        }

        return (
            <div className="text-center">
                <h4><u>Results from studies</u></h4>
                <p>The following table shows the result of two studies where multiple interaction techniques were compared for a selection and a manipulation task. The needed time and accomplished accuracy were measured as well as usability and user experience factors. Details on the conducted study can be found on the <Link to="/help/" className="active">help page</Link>.</p>
                <p><b>Implementation details of the technique: </b>{this.props.description}</p>
                <div className="study-results-tabs">
                    <Tabs id="controlled-tab"  transition={false} defaultActiveKey={this.state.measurements_objective_manipulation.length <= 0 ? "objective_selection" : "objective_manipulation"}>
                        <Tab eventKey="objective_manipulation" title="Manipulation Objective" disabled={this.state.measurements_objective_manipulation.length <= 0}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                <tr>
                                    {header_objective_manipulation}
                                </tr>
                                </thead>
                                <tbody>
                                {body_objective_manipulation}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="objective_selection" title="Selection Objective" disabled={this.state.measurements_objective_selection.length <= 0}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                <tr>
                                    {header_objective_selection}
                                </tr>
                                </thead>
                                <tbody>
                                {body_objective_selection}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="subjective_manipulation" title="Manipulation Subjective" disabled={this.state.measurements_subjective_manipulation <= 0}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                <tr>
                                    {header_subjective_manipulation}
                                </tr>
                                </thead>
                                <tbody>
                                {body_subjective_manipulation}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="subjective_selection" title="Selection Subjective" disabled={this.state.measurements_subjective_selection.length <= 0}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                <tr>
                                    {header_subjective_selection}
                                </tr>
                                </thead>
                                <tbody>
                                {body_subjective_selection}
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default StudyResultsTable;
