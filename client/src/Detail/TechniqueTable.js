import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

/*
* This component generates a table with all techniques passed to it.
* It generates a Header with the information stored in the TechniqueStructure file. It also generates all columns for every entry in techniques.
* Props:
*   - techniques : the techniques that will be displayed in the table
* */
class TechniqueTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            techniques: this.props.techniques,
            has_confidence: this.calculateHasConfidence() //We do this so we do not have to calculate this multiple times so we save the result into a state variable.
        };

        this.onSortTechniques = this.onSortTechniques.bind(this);
    }

    /*When the component updates we check if the techniques object has changed, if it has then we recalculate if we should display the confidence*/
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.techniques !== prevProps) {
            if (this.calculateHasConfidence() !== prevState.has_confidence) {
                this.setState({has_confidence: this.calculateHasConfidence()});
            }
        }
    }

    /*Calculates if there is a confidence value in one of the techniques, if there is we should display a confidence column*/
    calculateHasConfidence(){
        return this.props.techniques.find(r => r.confidence !== undefined) !== undefined;
    }

    /*This is called when the user requests a sort operation*/
    onSortTechniques(e, attribute) {
        let newTechniques = this.state.techniques;
        newTechniques.sort((a, b) => {
            if (typeof a[attribute] === "string") {
                //If it is a string we compare the strings
                return a[attribute].localeCompare(b[attribute]);
            } else {
                //Else it should be a number then we sort by number
                return a[attribute] - b[attribute];
            }
        });
        this.setState({techniques: newTechniques})
    }

    render() {
        return (
            //striped, bordered and hover are stylistic choices. responsive makes it so the table gains a scrollbar if it is to large
            <div className="filter-table">
            <Table striped bordered hove size="sm" className="sortable" style={{border: "none"}}>
                <thead>
                    <tr>
                        <th rowSpan="3">Interaction Technique</th>
                        <th rowSpan="3">Metaphor</th>
                        <th rowSpan="3">Tasks</th>
                        <th rowSpan="3">Constraints</th>
                        <th rowSpan="3">Visual Feedback</th>
                        <th rowSpan="3">Reach</th>
                        <th rowSpan="3">Two-Handedness</th>
                        <th colSpan="4">Input Device</th>
                        <th rowSpan="3">Transformation Separation</th>
                        <th colSpan="4">Mapping</th>
                        <th colSpan="2">Disambiguation</th>
                        <th colSpan="2">Interaction Termination</th>
                        <th colSpan="15">Interaction Fidelity</th>
                    </tr>
                    <tr>
                        <th rowSpan="2">Tracked Body Parts </th>
                        <th colSpan="2">Degree of Freedom</th>
                        <th rowSpan="2">1D Input</th>
                        <th rowSpan="2">Selection</th>
                        <th rowSpan="2">Manipulation</th>
                        <th rowSpan="2">Rotation</th>
                        <th rowSpan="2">Scaling</th>
                        <th rowSpan="2">Progressive Refinement</th>
                        <th rowSpan="2">Disambiguation Mechanism</th>
                        <th rowSpan="2">Selection Indication</th>
                        <th rowSpan="2">Release Indication</th>
                        <th rowSpan="2">Comparing Metaphor</th>
                        <th colSpan="6">Biomechanical Symmetry</th>
                        <th colSpan="6">Control Symmetry</th>
                        <th rowSpan="2" colSpan="2">Overall</th>
                    </tr>
                <tr>
                    <th>Min</th>
                    <th>Max</th>
                    <th colSpan="2">Kinematic</th>
                    <th colSpan="2">Kinetic</th>
                    <th colSpan="2">Anthropometric</th>
                    <th colSpan="2">Dimensional</th>
                    <th colSpan="2">Transfer</th>
                    <th colSpan="2">Termination</th>
                </tr>
                </thead>
                <tbody>
                {/*Generate a column with actual data from every technique in techniques*/}
                {this.state.techniques.map(technique =>
                    //If clicked on a row then head to that detail page
                    <tr onClick={(e) => this.handleClickOnTableRow(technique, e)}>
                        <td>{technique.name}</td>
                        <td>{technique.metaphor}</td>
                        <td>{technique.tasks}</td>
                        <td>{technique.constraints}</td>
                        <td>{technique.visual_feedback}</td>
                        <td>{technique.reach}</td>
                        <td>{technique.two_handedness}</td>
                        <td>{technique.tracked_body_parts}</td>
                        <td>{technique.minimum_dof}</td>
                        <td>{technique.maximum_dof}</td>
                        <td>{technique.one_d_input}</td>
                        <td>{technique.transformation_separation}</td>
                        <td>{technique.selection_mapping}</td>
                        <td>{technique.position_mapping}</td>
                        <td>{technique.rotation_mapping}</td>
                        <td>{technique.scaling_mapping}</td>
                        <td>{technique.progressive_refinement}</td>
                        <td>{technique.disambiguation_mechanism}</td>
                        <td>{technique.selection_indication}</td>
                        <td>{technique.release_indication}</td>
                        <td>{technique.fidelity_comparing_metaphor}</td>
                        <td>{technique.fidelity_kinematic}</td>
                        <td>{technique.fidelity_kinematic_short}</td>
                        <td>{technique.fidelity_kinetic}</td>
                        <td>{technique.fidelity_kinetic_short}</td>
                        <td>{technique.fidelity_anthropometric}</td>
                        <td>{technique.fidelity_anthropometric_short}</td>
                        <td>{technique.fidelity_dimensional}</td>
                        <td>{technique.fidelity_dimensional_short}</td>
                        <td>{technique.fidelity_transfer}</td>
                        <td>{technique.fidelity_transfer_short}</td>
                        <td>{technique.fidelity_termination}</td>
                        <td>{technique.fidelity_termination_short}</td>
                        <td>{technique.fidelity_overall}</td>
                        <td>{Number(technique.fidelity_overall_short).toFixed(2)}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            </div>
        );
    }

    /*This function handles a click of the user on a table entry*/
    handleClickOnTableRow = function (technique, e) {
        //by pushing a link on the history of the browser, the browser will go to that page.
        this.props.history.push('/detail/' + technique.id)
    }
}

//This has to be wrapped in a React-Router Component to add values needed for the browser. (e.g. having a history)
export default withRouter(TechniqueTable);
