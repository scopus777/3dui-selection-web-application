import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import DetailLinks from "./DetailLinks";
import StudyResultsTable from "./StudyResultsTable";
import CardImageCarousel from "../Cards/CardImageCarousel";

/*
* The Detail Component can be accessed under /detail/{id}
* It creates the Detailed view for one technique that is specified by the id in the url.
* This component must not require any props because it can be accessed without any parent Components that are not from React-Router
* */
class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            technique: [],
            images: [],
            id: props.match.params.id //<-- automatically send via prop from react router in the url
        };
    }

    //Fetch the required data for that specific technique
    componentDidMount() {
        fetch('/techniques/' + this.state.id)
            .then(res => res.json())
            .then(data => {
                    //Fetch the ID so it can be used to fetch the images
                    let id = data[0].id;
                    if(id !== undefined){
                        fetch('/techniques/' + id + '/images')
                            .then(res => res.json())
                            .then(data => this.setState({images: data}));
                    }
                    //Set the technique object asynchronously
                    this.setState({technique: data[0]});
                });
    }

    render() {
        return (
            <div className="container">
                {/*Name, Images and Description*/}
                <div className="col-sm-12 text-center">
                    <div className="row">
                        <div className="col-12 details-technique-name">
                            <h1>{this.state.technique.name}</h1>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <CardImageCarousel technique={this.state.technique}/>
                        </div>
                        <div className="col-sm-12 col-md-6 ">
                            <div className="text-justify">
                                {this.state.technique.description}
                            </div>
                        </div>
                    </div>
                </div>
                {/*Properties - Display the properties of this technique previously calculated*/}
                <div className="text-center pt-3">
                    <table className="table table-hover table-bordered table-striped">
                        <tbody>
                            <tr>
                                <th colSpan="3">Property</th>
                                <th colSpan="2">Value</th>
                            </tr>

                            <tr>
                                <td className="firstColumn white" colSpan="3">Metaphor</td>
                                <td className="white" colSpan="2">{this.state.technique.metaphor}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn grey" colSpan="3">Tasks</td>
                                <td className="grey" colSpan="2">{this.state.technique.tasks}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn white" colSpan="3">Constraints</td>
                                <td className="white" colSpan="2">{this.state.technique.constraints}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn grey" colSpan="3">Visual Feedback</td>
                                <td className="grey" colSpan="2">{this.state.technique.visual_feedback}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn white" colSpan="3">Reach</td>
                                <td className="white" colSpan="2">{this.state.technique.reach}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn white" colSpan="3">Two-Handedness</td>
                                <td className="white" colSpan="2">{this.state.technique.two_handedness}</td>
                            </tr>

                            <tr>
                                <td className="grey" rowSpan="4">Input Device</td>
                                <td className="grey" colSpan="2">Tracked Body Parts</td>
                                <td className="grey" colSpan="2">{this.state.technique.tracked_body_parts}</td>
                            </tr>
                            <tr>
                                <td className="grey" rowSpan="2">Degree of Freedom</td>
                                <td className="grey">Minimum DoF</td>
                                <td className="grey" colSpan="2">{this.state.technique.minimum_dof}</td>
                            </tr>
                            <tr>
                                <td className="grey">Maximum DoF</td>
                                <td className="grey" colSpan="2">{this.state.technique.maximum_dof}</td>
                            </tr>
                            <tr>
                                <td className="grey" colSpan="2">1D Input</td>
                                <td className="grey" colSpan="2">{this.state.technique.one_d_input}</td>
                            </tr>

                            <tr>
                                <td className="firstColumn white" colSpan="3">Transformation Separation</td>
                                <td className="white" colSpan="2">{this.state.technique.transformation_separation}</td>
                            </tr>

                            <tr>
                                <td className="grey" rowSpan="4">Mapping</td>
                                <td className="grey" colSpan="2">Selection</td>
                                <td className="grey" colSpan="2">{this.state.technique.selection_mapping}</td>
                            </tr>
                            <tr>
                                <td className="grey" colSpan="2">Positioning</td>
                                <td className="grey" colSpan="2">{this.state.technique.position_mapping}</td>
                            </tr>
                            <tr>
                                <td className="grey" colSpan="2">Rotation</td>
                                <td className="grey" colSpan="2">{this.state.technique.rotation_mapping}</td>
                            </tr>
                            <tr>
                                <td className="grey" colSpan="2">Scaling</td>
                                <td className="grey" colSpan="2">{this.state.technique.scaling_mapping}</td>
                            </tr>

                            <tr>
                                <td className="white" rowSpan="2">Disambiguation</td>
                                <td className="white" colSpan="2">Progressive Refinement</td>
                                <td className="white" colSpan="2">{this.state.technique.progressive_refinement}</td>
                            </tr>
                            <tr>
                                <td className="white" colSpan="2">Disambiguation Mechanism</td>
                                <td className="white" colSpan="2">{this.state.technique.disambiguation_mechanism}</td>
                            </tr>

                            <tr>
                                <td className="grey" rowSpan="2">Interaction Termination</td>
                                <td className="grey" colSpan="2">Selection Indication</td>
                                <td className="grey" colSpan="2">{this.state.technique.selection_indication}</td>
                            </tr>
                            <tr>
                                <td className="grey" colSpan="2">Release Indication</td>
                                <td className="grey" colSpan="2">{this.state.technique.release_indication}</td>
                            </tr>

                            <tr>
                                <td className="white" rowSpan="7">Mapping</td>
                                <td className="white" rowSpan="3">Biomechanical Symmetry</td>
                                <td className="white">Kinematic</td>
                                <td className="white">{this.state.technique.fidelity_kinematic}</td>
                                <td className="white">{this.state.technique.fidelity_kinematic_short}</td>
                            </tr>
                            <tr>
                                <td className="white">Kinetic</td>
                                <td className="white">{this.state.technique.fidelity_kinetic}</td>
                                <td className="white">{this.state.technique.fidelity_kinetic_short}</td>
                            </tr>
                            <tr>
                                <td className="white">Anthropometric</td>
                                <td className="white">{this.state.technique.fidelity_anthropometric}</td>
                                <td className="white">{this.state.technique.fidelity_anthropometric_short}</td>
                            </tr>
                            <tr>
                                <td className="white" rowSpan="3">Control Symmetry</td>
                                <td className="white">Dimensional</td>
                                <td className="white">{this.state.technique.fidelity_dimensional}</td>
                                <td className="white">{this.state.technique.fidelity_dimensional_short}</td>
                            </tr>
                            <tr>
                                <td className="white">Transfer</td>
                                <td className="white">{this.state.technique.fidelity_transfer}</td>
                                <td className="white">{this.state.technique.fidelity_transfer_short}</td>
                            </tr>
                            <tr>
                                <td className="white">Termination</td>
                                <td className="white">{this.state.technique.fidelity_termination}</td>
                                <td className="white">{this.state.technique.fidelity_termination_short}</td>
                            </tr>
                            <tr>
                                <td className="white" colSpan="2">Fidelity Overall</td>
                                <td className="white" >{this.state.technique.fidelity_overall}</td>
                                <td className="white" >{Number(this.state.technique.fidelity_overall_short).toFixed(2)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                {/*End Properties*/}
                <div>
                    <StudyResultsTable id={this.state.technique.id} description={this.state.technique.description_study}/>
                </div>
                {/*Display the applications and sources associated with this technique*/}
                <DetailLinks id={this.state.technique.id} name="Sources" location="sources/"/>
                <div className="text-center back-button">
                    {/*We can use the history prop to go back to were we came from. This pops the top item in the history of the browser*/}
                    <button className="btn btn-primary mb-3" onClick={() => this.props.history.goBack()}>Go Back
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Detail);
