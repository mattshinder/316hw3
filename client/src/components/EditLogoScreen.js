import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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
        $imageURL: String!) {
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
                imageURL: $imageURL) {
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

    render() {
        let text, color, fontSize, padding, margin, backgroundColor, borderColor, borderRadius, borderWidth, imageURL;
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
                            imageURL: data.logo.imageURL
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
                                                imageURL: imageURL.value } });
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
                                                <button type="submit" className="btn btn-success">Submit</button>
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
                                                <div>
                                                    {<img src={this.state.imageURL} alt=""></img>}
                                                </div>
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