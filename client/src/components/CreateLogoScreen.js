import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

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
        $borderWidth: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            padding: $padding,
            margin: $margin,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth) {
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
                borderWidth: 10
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

    render() {
        let text, color, fontSize, padding, margin, backgroundColor, borderColor, borderRadius, borderWidth;
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
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value) } });
                                        text.value = "";
                                        color.value = "";
                                        fontSize.value = "";
                                        padding.value = "";
                                        margin.value = "";
                                        backgroundColor = "";
                                        borderColor = "";
                                        borderRadius = "";
                                        borderWidth = "";
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