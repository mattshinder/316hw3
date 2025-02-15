import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Draggable from 'react-draggable';
import Box from '@material-ui/core/Box';
import html2canvas from 'html2canvas';

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
            lastUpdate
            imageURL
            imageWidth
            imageHeight
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    screenshot(){
        html2canvas(document.getElementById('container')).then(function(canvas) {
         document.body.appendChild(canvas);
        });
       }


    /*html2canvas(document.getElementById('box')).then(function(canvas) {
        document.getElementById("image").src= canvas.toDataURL();
       });


    html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
    }); */

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text}</dd>
                                        <dt>Color:</dt>
                                        <dd style={{color: data.logo.color}}>{data.logo.color}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Background Color:</dt>
                                        <dd style={{color: data.logo.backgroundColor}}>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd style={{color: data.logo.borderColor}}>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Thickness:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                        <dt>Image URL:</dt>
                                        <dd>{data.logo.imageURL}</dd>
                                        <dt>Image Width:</dt>
                                        <dd>{data.logo.imageWidth}</dd>
                                        <dt>Image Height:</dt>
                                        <dd>{data.logo.imageHeight}</dd>
                                        <dt>Logo Width:</dt>
                                        <dd>1000</dd>
                                        <dt>Logo Height:</dt>
                                        <dd>750</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    <button className="btn btn-warning" onClick={this.screenshot}>Download</button>
                                </div>
                                    <Box id='container' style={{
                                                    borderStyle: 'solid',
                                                    borderColor: data.logo.borderColor
                                                }}width={1000} height={750}>
                                    <Draggable>
                                    <div style={{
                                        borderStyle: 'solid',
                                        color: data.logo.color,
                                        fontSize: data.logo.fontSize + "pt",
                                        padding: data.logo.padding + "pt",
                                        margin: data.logo.margin + "pt",
                                        backgroundColor: data.logo.backgroundColor,
                                        borderColor: data.logo.borderColor,
                                        borderRadius: data.logo.borderRadius + "pt",
                                        borderWidth: data.logo.borderWidth + "pt",
                                    }}>
                                        {data.logo.text}
                                    </div>
                                    </Draggable>
                                    <Draggable>
                                    <div>
                                        {<img src={data.logo.imageURL} alt="" width={data.logo.imageWidth + "px"} height={data.logo.imageHeight + "px"}></img>}
                                    </div>
                                    </Draggable>
                                    </Box>
                                
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;