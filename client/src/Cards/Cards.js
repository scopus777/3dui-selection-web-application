import React, {Component} from 'react';
import Card from "./Card";
import CardGroup from "react-bootstrap/CardGroup";

/*
* This Component creates a list of cards.
* Props:
*   - techniques : All the techniques that should be displayed
* */
class Cards extends Component {

    render() {
        return (
            <CardGroup>
                {
                    //Go over every technique and create a Card component for that technique
                    this.props.techniques.map(technique =>
                        <Card key={technique.id} technique={technique}
                                       confidence={technique.confidence} confidence_metrics={technique.confidence_metrics} showMeasurement={this.props.showMeasurement}/>
                    )
                }
            </CardGroup>
        );
    }
}

export default Cards;

