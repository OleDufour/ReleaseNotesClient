import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';

import referenceStore from '../store/ReferenceStore';
import releaseNoteStore from '../store/ReleaseNoteStore';


import PagingTable from './PagingTable'
import { PagingSearch } from './PagingSearch'
import './Paging.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

@observer
export class PagingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,

        };
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
    }
    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    componentDidUpdate() {
    }

    setSearchTopStories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;
        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];
        const updatedHits = [
            ...oldHits,
            ...hits
        ];
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }
    onSearchChange(event) {
        alert(event.target.value)
        this.setState({ searchTerm: event.target.value });
    }

    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];
        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({
            results: {

                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }
    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }

    render() {
        const {
            searchTerm,
            results,
            searchKey
        } = this.state;
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;
        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits) || [];

        return (
            <div className="page">
                <div className="interactions">
                    <PagingSearch
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search

            </PagingSearch>

                    <button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </button>

                </div>

                <PagingTable
                    list={list}
                    onDismiss={this.onDismiss}
                />

            </div>
        );
    }
}



export default PagingComponent;