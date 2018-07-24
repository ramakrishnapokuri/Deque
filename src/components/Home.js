import React from 'react';
import Book from './Book';
import * as bookActions from '../actions/BookSearchAction';
import _ from 'lodash';
import Helper from '../util/helper';

const pageSize = 10;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: false,
            responseTime: null,
            earliestDate: null,
            recentDate: null,
            mostFrequentAuthor: null,
            books: []
        };
        this.books = [];
        this.handleChange = this.handleChange.bind(this);
        this.servicesValue = _.debounce(this.servicesValue, 1000);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        this.servicesValue(e.target.value);
    }

    servicesValue(value) {
        this.handleSearchBooks(value);
    };

    handleSearchBooks(searchKey) {
        if (searchKey === '') {
            this.setState({ books: [], isLoading: false });
            return;
        }
        this.setState({ isLoading: true });
        let sendDate = (new Date()).getTime()
        bookActions.SearchBooks(searchKey).then((books) => {
            this.books = books;
            console.log(books);
            let receiveDate = (new Date()).getTime();
            let responseTimeMs = receiveDate - sendDate;
            let pagedBooks = this.books.slice(0, pageSize);
            this.handleEarliestRecentPublishdate(books);
            this.handleHighestauthorPublishedBooks(books);
            this.setState({ books: pagedBooks, responseTime: responseTimeMs });
            this.setState({ isLoading: false });
        });
    }

    handleEarliestRecentPublishdate(books) {
        let pubLishedDates = books.map(book => {
            let date = _.has(book, "volumeInfo.publishedDate") ? book.volumeInfo.publishedDate : null
            if (date != null && Helper.isValidDate(date)) {
                return date;
            }
        })

        pubLishedDates = pubLishedDates.filter(date => date != undefined);

        let sortedDates = Helper.arrayDatesort(pubLishedDates);

        if (sortedDates != null && sortedDates.length > 0) {
            let earliestDate = sortedDates[0];
            let recentDate = sortedDates[sortedDates.length - 1];
            this.setState({ earliestDate: earliestDate, recentDate: recentDate });
        }
    }

    handleHighestauthorPublishedBooks(books) {
        let authors = [];
        books.forEach(book => {
            if (_.has(book, 'volumeInfo.authors')) {
                authors.push(...book.volumeInfo.authors);
            }
        });

        console.log(authors);
        let mostFrequentAuthor = Helper.getHighestOccurrenceValue(authors);
        this.setState({ mostFrequentAuthor: mostFrequentAuthor });
    }



    handlePageClick(e) {
        let pageNr = e.target.id;
        let startIndex = pageNr - 1;
        let pagedBooks = this.books.slice(startIndex * pageSize, pageNr * pageSize);
        this.setState({ books: pagedBooks });
    }

    render() {
        let pages = this.books.length / pageSize;
        let that = this;
        var indents = [];
        if (pages > 0) {
            for (let i = 1; i <= pages; i++) {
                indents.push(<li className="page-item" key={i}><a className="page-link" id={i} onClick={(e) => that.handlePageClick(e)} href="#">{i}</a></li>);
            }
        }

        return (
            <React.Fragment>
                <div className="content-wrapper content-full">
                    <div className="homeContainer">
                        <input type="text" disabled={this.state.isLoading} onChange={this.handleChange} className="form-control searchTextbox"
                            id="search" placeholder="Enter book name to search" />
                        <br />
                        <div className="loader" style={{ display: this.state.isLoading == true ? 'block' : 'none' }}></div>
                        {this.state.books.length > 0 ?
                            <div>
                                <h3>Statistics :</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Highest Occurrence Author : {this.state.mostFrequentAuthor} </h4>
                                        <h4>Earliest Publish date : {this.state.earliestDate} </h4>
                                        <h4>Recent Publish date : {this.state.recentDate} </h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Total Number of books : {this.books.length}</h4>
                                        <h4>Search Response Time : {this.state.responseTime} ms</h4>
                                    </div>
                                </div>
                                <h3>Result :</h3>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {indents}
                                    </ul>
                                </nav>
                                <div className="books-container">
                                    {
                                        this.state.books.map((book, index) =>
                                            <Book key={index} index={index} book={book} />
                                        )

                                    }
                                </div>

                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {indents}
                                    </ul>
                                </nav>
                            </div>
                            : null}
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default Home;