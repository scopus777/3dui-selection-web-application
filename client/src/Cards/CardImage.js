import React, {Component} from "react";

/*
* This Component is used to display an image in a card environment.
* Props:
*   - image : The url where the image is located
*   - technique : The technique this image stems from
* */
class CardImage extends Component {
    render() {
        return (
            <img className="card-img-top card-image-cover"
                 src={this.props.image.image}
                 alt={this.props.technique.name + " example image."}/>
        )
    }
}

export default CardImage;
