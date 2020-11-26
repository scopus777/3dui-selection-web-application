import React, {Component} from "react";
import {withRouter} from "react-router-dom";

/*
 * Displays a text indicating the possibility to send new techniques.
 */
class Submit extends Component {
    render() {
        return (
            <div>
                <p style={{textAlign:"center", marginTop: "10px"}}>If you want to submit a new interaction technique, please send a mail to:</p>
                <p style={{textAlign:"center"}}><a href="mailto:matthias.weise@uni-potsdam.de?subject=Interaction%20Technique%20Submission">
                    matthias.weise@uni-potsdam.de
                </a></p>
                <p style={{textAlign:"center"}}>Please add a short explanation and literature where the technique is described and/or an application where the technique is used.</p>
            </div>
        );
    }
}

export default withRouter(Submit);