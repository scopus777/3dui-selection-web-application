import React, {Component} from 'react';
import './App.css';
import Menubar from "./Menu/Menubar";
import Detail from "./Detail/Detail";
import TechniqueTable from "./Detail/TechniqueTable";
import Filter from "./Filter/Filter";
import Submit from "./Submit/Submit";

import {BrowserRouter as Router, Route} from "react-router-dom";
import Help from "./Help/Help";
import Sort from "./Sort/Sort";

class App extends Component {
    constructor(props) {
        super(props);
        this.appStore = {};
        this.state = {
            techniques:[]
        }
    }

    getAppStore() {
        return this.appStore;
    }

    componentDidMount() {
        // Fetch the data to all techniques if done then reload the result calculation
        fetch('/techniques')
            .then(res => res.json())
            .then(data => this.setState({techniques: data}, () => this.fetchSortData()))
            .then(() => this.updateAppStore({
                techniques: this.state.techniques
            }));}

    componentWillUnmount() {}

    updateAppStore(update) {
        this.appStore = {
            ...this.appStore,
            ...update
        };
    }

    fetchSortData(){
        this.fetchObjectiveSelection();
        this.fetchObjectiveManipulation();
        this.fetchSubjectiveManipulation();
        this.fetchSubjectiveSelection();
    }

    fetchObjectiveSelection(){
        fetch("/techniques/objective_selection")
            .then(res => res.json())
            .then(data => this.generateObjectiveSelectionList(this.state.techniques, data));
    }

    generateObjectiveSelectionList(techniques, objective_selection) {
        for (let i = 0; i < objective_selection.length; i++) {
            for (let j = 0; j < techniques.length; j++) {
                if (objective_selection[i].technique_id === techniques[j].id) {
                    objective_selection[i].technique = techniques[j];
                }
            }
        }
        this.setState({objective_selection: objective_selection});
        this.updateAppStore({objective_selection: objective_selection});
    }

    fetchObjectiveManipulation(){
        fetch("/techniques/objective_manipulation")
            .then(res => res.json())
            .then(data => this.generateObjectiveManipulationList(this.state.techniques, data));
    }

    generateObjectiveManipulationList(techniques, objective_manipulation) {
        for (let i = 0; i < objective_manipulation.length; i++) {
            for (let j = 0; j < techniques.length; j++) {
                if (objective_manipulation[i].technique_id === techniques[j].id) {
                    objective_manipulation[i].technique = techniques[j];
                }
            }
        }
        this.setState({objective_manipulation: objective_manipulation});
        this.updateAppStore({objective_manipulation: objective_manipulation});
    }

    fetchSubjectiveManipulation(){
        fetch("/techniques/subjective/manipulation")
            .then(res => res.json())
            .then(data => this.generateSubjectiveManipulationList(this.state.techniques, data));
    }

    generateSubjectiveManipulationList(techniques, subjective_manipulation) {
        for (let i = 0; i < subjective_manipulation.length; i++) {
            for (let j = 0; j < techniques.length; j++) {
                if (subjective_manipulation[i].technique_id === techniques[j].id) {
                    subjective_manipulation[i].technique = techniques[j];
                }
            }
        }
        this.setState({subjective_manipulation: subjective_manipulation});
        this.updateAppStore({subjective_manipulation: subjective_manipulation});
    }

    fetchSubjectiveSelection(){
        fetch("/techniques/subjective/selection")
            .then(res => res.json())
            .then(data => this.generateSubjectiveSelectionList(this.state.techniques, data));
    }


    generateSubjectiveSelectionList(techniques, subjective_selection) {
        for (let i = 0; i < subjective_selection.length; i++) {
            for (let j = 0; j < techniques.length; j++) {
                if (subjective_selection[i].technique_id === techniques[j].id) {
                    subjective_selection[i].technique = techniques[j];
                }
            }
        }
        this.setState({subjective_selection: subjective_selection});
        this.updateAppStore({subjective_selection: subjective_selection});
    }

    render() {
        return (
            <Router>
                <div style={{height:"100%"}}>
                    <Menubar/>

                    <Route exact path="/" render={(props)=><Filter {...props} getAppStore={() => (this.getAppStore())} updateAppStore={(u) => {this.updateAppStore(u)}} techniques={this.state.techniques}/>}/>
                    <Route exact path="/sort/" render={(props)=><Sort {...props} getAppStore={() => (this.getAppStore())} updateAppStore={(u) => {this.updateAppStore(u)}}/>}/>
                    <Route exact path="/help/" component={Help}/>
                    <Route exact path="/submit/" component={Submit}/>
                    <Route exact path="/detail/" component={TechniqueTable}/>
                    <Route path="/detail/:id" component={Detail}/>
                </div>
            </Router>
        );
    }
}

export default App;
