import {Carousel} from "react-bootstrap";
import React, {Component} from "react";
import CardImage from "./CardImage";

/* Required to load in a FontAwesome Icon in React*/
const FontAwesome = require('react-fontawesome');

/* This Component creates a Carousel component with all the images. To do this it needs to know which images belong to the passed over technique. Therefore it connects to the server first
* Props:
*   - technique: The technique which images should be displayed
* */
class CardImageCarousel extends Component {

    /*Initialize that we will be using a list for the images in the State object*/
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    /*After the component mounts we fetch the data*/
    componentDidMount() {
        this.fetchData();
    }

    /*After a prop has changed this function is called*/
    componentDidUpdate(prevProps) {
        //Check to see if it was the technique id prop that was changed
        //This has the reason that otherwise the image data would not be fetched if the technique is set later
        if (this.props.technique.id !== prevProps.technique.id) {
            this.fetchData();
        }
    }

    /*This function fetches the urls from the server for the images*/
    fetchData(){
        fetch('/techniques/' + this.props.technique.id + '/images')
            .then(res => res.json())
            .then(data => this.setState({images: data}));
    }

    render() {
        let imageCarousel = "";
        //If we have more then 1 image then we have to display a Carousel to go through the different images.
        if (this.state.images.length > 1) {
            //We have to change the icons for previous and next, so that they work on dark and bright backgrounds
            imageCarousel =
                <Carousel prevIcon={<FontAwesome name='angle-left' size='2x'/>} nextIcon={<FontAwesome name='angle-right' size='2x'/>} interval={10000}>
                    {
                        this.state.images.map(
                            image =>
                                <Carousel.Item key={image.id}>
                                    <CardImage key={image.id} image={image} technique={this.props.technique}/>
                                </Carousel.Item>
                        )
                    }
                </Carousel>
        } else if (this.state.images.length === 1) { //Otherwise we can just display the image
            imageCarousel = <CardImage image={this.state.images[0]} technique={this.props.technique}/>
        }
        else {
            let image = {image: "/images/no_image.png"};
            imageCarousel = <CardImage image={image} technique={this.props.technique}/>
        }

        return (imageCarousel)
    };
}


export default CardImageCarousel;
