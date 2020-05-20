import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import '../App.css';
import Draggable from 'react-draggable';
import Box from '@material-ui/core/Box';


const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            padding
            margin
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            imageURL
            imageWidth
            imageHeight
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $padding: Int!,
        $margin: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $imageURL: String!,
        $imageWidth: Int!,
        $imageHeight: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                padding: $padding,
                margin: $margin,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                imageURL: $imageURL,
                imageWidth: $imageWidth,
                imageHeight: $imageHeight) {
                    lastUpdate
                }
        }
`;



class EditLogoScreen extends Component {
    constructor() {
        super();
            // Manage UI Controls
            // Values here
            this.state = {
                borderStlye: 'solid',
                text: "",
                color: "",
                fontSize: "",
                padding: "",
                margin: "",
                backgroundColor: "",
                borderColor: "",
                borderRadius: "",
                borderWidth: "",
                imageURL: "",
                imageX: "",
                imageY: ""
            }
    }
    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    }
    handleColorChange = (event) => {
        this.setState({color: event.target.value});
    }
    handleFontSizeChange = (event) => {
        this.setState({fontSize: event.target.value});
    }
    handlePaddingChange = (event) => {
        this.setState({padding: event.target.value});
    }
    handleMarginChange = (event) => {
        this.setState({margin: event.target.value});
    }
    handleBackgroundColorChange = (event) => {
        this.setState({backgroundColor: event.target.value});
    }
    handleBorderColorChange = (event) => {
        this.setState({borderColor: event.target.value});
    }
    handleBorderRadiusChange = (event) => {
        this.setState({borderRadius: event.target.value});
    }
    handleBorderWidthChange = (event) => {
        this.setState({borderWidth: event.target.value});
    }
    handleImageURLChange = (event) => {
        this.setState({imageURL: event.target.value});
    }
    handleImageWidthChange = (event) => {
        this.setState({imageWidth: event.target.value});
    }
    handleImageHeightChange = (event) => {
        this.setState({imageHeight: event.target.value});
    }
    handleLogoXChange = (event) => {
        this.setState({logoX: event.target.value});
    }
    handleLogoHYChange = (event) => {
        this.setState({logoY: event.target.value});
    }

    render() {
        let text, color, fontSize, padding, margin, backgroundColor, borderColor, borderRadius, borderWidth, imageURL, imageWidth, imageHeight
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.text===""){
                        this.setState({
                            text: data.logo.text,
                            color: data.logo.color,
                            fontSize: data.logo.fontSize,
                            padding: data.logo.padding,
                            margin: data.logo.margin,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            imageURL: data.logo.imageURL,
                            imageWidth: data.logo.imageWidth,
                            imageHeight: data.logo.imageHeight
                            });
                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                padding: parseInt(padding.value), margin: parseInt(margin.value), backgroundColor: backgroundColor.value,
                                                borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                imageURL: imageURL.value, imageWidth: parseInt(imageWidth.value), imageHeight: parseInt(imageHeight.value) } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                                backgroundColor = "";
                                                borderColor = "";
                                                borderRadius = "";
                                                borderWidth = "";
                                                imageURL = "";
                                                imageWidth = "";
                                                imageHeight = "";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.handleTextChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.handleColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.handleFontSizeChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.handlePaddingChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="text" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} onChange={this.handleMarginChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor= node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.handleBackgroundColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.handleBorderColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.handleBorderRadiusChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Thickness:</label>
                                                    <input type="text" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Thickness" defaultValue={data.logo.borderWidth} onChange={this.handleBorderWidthChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imageURL">Image URL:</label>
                                                    <input type="text" className="form-control" name="imageURL" ref={node => {
                                                        imageURL = node;
                                                    }} placeholder="Image URL" defaultValue={data.logo.imageURL} onChange={this.handleImageURLChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imageWidth">Image Width:</label>
                                                    <input type="text" className="form-control" name="imageWidth" ref={node => {
                                                        imageWidth = node;
                                                    }} placeholder="Image Width" defaultValue={data.logo.imageWidth} onChange={this.handleImageWidthChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="imageHeight">Image Height:</label>
                                                    <input type="text" className="form-control" name="imageHeight" ref={node => {
                                                        imageHeight = node;
                                                    }} placeholder="Image Height" defaultValue={data.logo.imageHeight} onChange={this.handleImageHeightChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="logoX">Logo Width:</label>
                                                    <input type="text" className="form-control" name="logoWidth" ref={node => {
                                                    }} placeholder="Logo Width" defaultValue="1000" onChange={this.handleLogoXChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="logoY">Logo Height:</label>
                                                    <input type="text" className="form-control" name="logoY" ref={node => {
                                                    }} placeholder="Logo Height" defaultValue="750" onChange={this.handleLogoYChange}/>
                                                </div>
                                                <button type="submit" className="btn btn-warning">Submit</button>

                                                <Box style={{
                                                    borderStyle: 'solid',
                                                    borderColor: this.state.borderColor
                                                }}width={1000} height={750}>

                                                <Draggable>
                                                <div style={{
                                                    borderStyle: 'solid',
                                                    color: this.state.color,
                                                    fontSize: this.state.fontSize + "pt",
                                                    padding: this.state.padding + "pt",
                                                    margin: this.state.margin + "pt",
                                                    backgroundColor: this.state.backgroundColor,
                                                    borderColor: this.state.borderColor,
                                                    borderRadius: this.state.borderRadius + "pt",
                                                    borderWidth: this.state.borderWidth + "pt",
                                                }}>
                                                    {this.state.text}
                                                </div>
                                                </Draggable>

                                                <Draggable bounds="body">
                                                <div>
                                                {<img src={this.state.imageURL} alt="" width={this.state.imageWidth + "px"} height={this.state.imageHeight + "px"}></img>}
                                                </div>
                                                </Draggable>
                                                </Box>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;