import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import defaultbook from './images/generic-book.png'
const Book = (props) => {
    const {
        book = {},
        index
    } = props;


    let authorList = _.has(book, 'volumeInfo.authors') ? book.volumeInfo.authors : null;
    let title = _.has(book, 'volumeInfo.title') ? book.volumeInfo.title : null;
    let description = _.has(book, 'volumeInfo.description') ? book.volumeInfo.description : null;
    let bookimage = _.has(book, 'volumeInfo.imageLinks.smallThumbnail') ? book.volumeInfo.imageLinks.smallThumbnail : null;
    bookimage = bookimage ? bookimage.replace(/^http:\/\//i, 'https://') : defaultbook;

    return (
        <React.Fragment>
            <div className="book-card imgback">
                <div className="book-header" style={{ backgroundImage: 'url("' + bookimage + '")', backgroundSize: 'cover', backgroundPosition: '80% 80%', backgroundRepeat: 'no-repeat' }}>
                </div>
                <div className="book-content">
                    <div className="book-content-header">
                        <a href="#" data-toggle="modal" href={`#myModal${index}`}>
                            <h3 className="book-title">
                                {title}
                            </h3>
                        </a>
                    </div>

                    {authorList ?
                        <div className="book-info">
                            <h5>Authors</h5>
                            <div className="info-section">
                                <ul>
                                    {authorList.map((author, startIndex) =>
                                        <li key={startIndex}>
                                            {author}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div> : 'No Authors'
                    }
                </div>




            </div>
            <div id={`myModal${index}`} className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Description</h4>
                        </div>
                        <div className="modal-body">
                            {description ? <p>{description}</p> : "No description provided."}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Book;