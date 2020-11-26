import React, {Component} from 'react';

/*
* The Detail Link Component generates a list of links that each have a description.
* It fetches the required data from the server and displays them to the user
* Props:
*   - id: The id of the technique which sources should be displayed
*   - location: The location on the server where this info can be found
*   - name: How this component should be named for the user (displayed as h4)
* */
class DetailLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [],
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

    /*This function fetches the data from the server*/
    fetchData() {
        fetch('/techniques/' + this.props.id + "/" + this.props.location)
            .then(res => res.json())
            .then(data => this.setState({links: data}));
    }

    render() {

        return (
            <div className="text-center">
                <h4><u>{this.props.name}</u></h4>
                {
                    //Go through each source and generate a link with a description
                    this.state.links.map(
                        link => {
                            //If the source has no link then do not generate a link and only generate the description
                            if (link.url === "#") return <span key={link.id}>{link.description}<br/></span>;
                            else return <span key={link.id}><a href={link.url}>{link.description}</a><br/></span>;
                        }
                    )}
            </div>
        );
    }
}

export default DetailLinks;
