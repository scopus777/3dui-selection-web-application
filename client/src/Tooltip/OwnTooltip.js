import React, {Component} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Tooltip} from "react-bootstrap";

/*
* This Component displays a tooltip for the user.
* props:
*   - overlayKey : the key that should be used for the overlayTrigger
*   - text : The text on which the tooltip should be shown if the user hovers over it
*   - tooltipText : The text the tooltip should display
*   - placement : Where the tooltip should be placed relative to the text
* */
class OwnTooltip extends Component {

    render() {
        return (
            <OverlayTrigger
                key={this.props.overlayKey}
                placement={this.props.placement}
                overlay={
                    <Tooltip id={`tooltip-${this.props.overlayKey}`}>
                        {this.props.tooltipText}
                    </Tooltip>
                }
            >
                <u className="dotted">{this.props.text}</u>
            </OverlayTrigger>
        );
    }
}

export default OwnTooltip;
