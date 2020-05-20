import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import Box from '@material-ui/core/Box';

const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
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
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();
            // Manage UI Controls
            // Values here
            this.state = {
                borderStlye: 'solid',
                text: "Sample text",
                color: "#000000",
                fontSize: 10,
                padding: 10,
                margin: 10,
                backgroundColor: "#ff0000",
                borderColor: "#11ff00",
                borderRadius: 10,
                borderWidth: 10,
                imageURL: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png",
                imageWidth: 200,
                imageHeight: 200,
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

    render() {
        let text, color, fontSize, padding, margin, backgroundColor, borderColor, borderRadius, borderWidth, imageURL, imageWidth, imageHeight
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                        padding: parseInt(padding.value), margin: parseInt(margin.value), backgroundColor: backgroundColor.value,
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                        imageURL: imageURL.value, imageWidth: parseInt(imageWidth.value), imageHeight: parseInt(imageHeight.value)} });
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
                                        }} placeholder={this.state.text} defaultValue={this.state.text} onChange={this.handleTextChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" defaultValue={this.state.color} onChange={this.handleColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder={this.state.fontSize} defaultValue={this.state.fontSize} onChange={this.handleFontSizeChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder={this.state.padding} defaultValue={this.state.padding} onChange={this.handlePaddingChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder={this.state.margin} defaultValue={this.state.margin} onChange={this.handleMarginChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" defaultValue={this.state.backgroundColor} onChange={this.handleBackgroundColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" defaultValue={this.state.borderColor} onChange={this.handleBorderColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder={this.state.borderRadius} defaultValue={this.state.borderRadius} onChange={this.handleBorderRadiusChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Thickness:</label>
                                        <input type="number" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder={this.state.borderWidth} defaultValue={this.state.borderWidth} onChange={this.handleBorderWidthChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageURL">Image URL:</label>
                                        <input type="text" className="form-control" name="imageURL" ref={node => {
                                            imageURL = node;
                                        }} placeholder="Image URL" defaultValue={this.state.imageURL} onChange={this.handleImageURLChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageWidth">Image Width:</label>
                                        <input type="text" className="form-control" name="imageWidth" ref={node => {
                                            imageWidth = node;
                                        }} placeholder="Image Width" defaultValue={this.state.imageWidth} onChange={this.handleImageWidthChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageHeight">Image Height:</label>
                                        <input type="text" className="form-control" name="imageHeight" ref={node => {
                                            imageHeight = node;
                                        }} placeholder="Image Height" defaultValue={this.state.imageHeight} onChange={this.handleImageHeightChange}/>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-success">Submit</button>

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
    }
}

export default CreateLogoScreen;