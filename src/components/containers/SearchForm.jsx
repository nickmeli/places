import React, { Component } from 'react';
import { connect } from "react-redux";
import { getMarkers, setFilter } from '../../actions';
import { MapClass } from '../../helpers/MapClass';

class PlacesSearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_type: 'all',
            keyword: ''
        };
    }

    selectChanged = (event) => {
        this.setState({ selected_type: event.target.value }, () => {
            let type = [];
            if (this.state.selected_type !== 'all') {
                type.push(this.state.selected_type);
            }
            this.props.setFilter({
                type: type,
                name: this.state.keyword
            });
            this.props.getMarkers(MapClass.placesService);
        });
    }

    inputChanged = (event) => {
        this.setState({ keyword: event.target.value });
    }

    keyDown = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        let type = [];
        if (this.state.selected_type !== 'all') {
            type.push(this.state.selected_type);
        }
        this.props.setFilter({
            type: type,
            name: this.state.keyword
        });
        this.props.getMarkers(MapClass.placesService);
    }

    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <div className="alert alert-success" role="alert" style={{ marginBottom: '5px', marginTop: '5px' }}>
                    Press the 'Circle' on the google maps at the TOP CENTER of the map to select the area.
                                </div>
                <div className="form-group" style={{ marginBottom: '5px' }}>
                    <label>Places type</label>
                    <select value={this.state.selected_type} onChange={this.selectChanged} className="form-control">
                        <option value="all">All</option>
                        <option value="bank">Bank</option>
                        <option value="bar">Bar</option>
                        <option value="museum">Museum</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Search for</label>
                    <input type="text" className="form-control" id="search_for" value={this.state.keyword} onChange={this.inputChanged} onKeyDown={this.keyDown} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        center: state.center
    };
}

const SearchForm = connect(mapStateToProps, { getMarkers, setFilter }) (PlacesSearchForm);

export { SearchForm };