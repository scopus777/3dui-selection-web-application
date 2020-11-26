import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card as CardBootstrap} from 'react-bootstrap';
import CardImageCarousel from "./CardImageCarousel";

/*
* This Component displays a bootstrap Card Component with all the values of a specific technique
* These values are passed over via props
* */
class Card extends Component {

    render() {
        let view = [];
        let addInfo = [];
        // show metrics if the card is used in the sort view
        if (this.props.showMeasurement) {
            if (this.props.technique.addInfo !== undefined)
                addInfo = this.props.technique.addInfo.split(";");
            for (let i = 0; i < addInfo.length; i++) {
                if (addInfo[i].startsWith("<b>")) {
                    view.push(
                        <p key={"card_" + i} className="card-text mb-1">
                            <small className="text-muted">
                                <b>{addInfo[i].replace("<b>", "")} </b>
                            </small>
                        </p>
                    )
                } else {
                    view.push(
                        <p key={"card_" + i} className="card-text mb-1">
                            <small className="text-muted">
                                {addInfo[i]}
                            </small>
                        </p>
                    )

                }
            }
        }

        return (
            //These Bootstrap classes define 4 columns on large screens, 3 columns on medium screens, 2 columns on small screens, 1 column on very small screens
            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2 p-2">
                {/*Generate a Bootstrap Card with a shadow, the text centered and with the same height as the other cards*/}
                <CardBootstrap className="shadow-sm bg-light text-center  h-100">
                    {/*The card has an image on top, which is handled by the CardImageCarousel Component*/}
                    <CardImageCarousel technique={this.props.technique}/>
                    {/*The card's body has a title and a short description*/}
                    <CardBootstrap.Body className="d-flex flex-column">
                        <CardBootstrap.Title><b>{this.props.technique.name}</b></CardBootstrap.Title>
                        <CardBootstrap.Text>{this.props.technique.description_short}</CardBootstrap.Text>
                        <div className="mt-auto">
                            {/*Because we are using react-router we have to use the Link component instead of an <a>*/}
                            <Link to={"/detail/" + this.props.technique.id} className="btn btn-primary">
                                Details
                            </Link>
                        </div>
                    </CardBootstrap.Body>
                    {/*In the lower portion the metrics of the technique is displayed*/}
                    {
                        view
                    }
                </CardBootstrap>
            </div>
        );
    }
}

export default Card;
