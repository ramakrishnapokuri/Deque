
import HelperService from '../util/helperService';

const baseUrl = 'https://www.googleapis.com/books/v1';

export function SearchBooks(searchKey) {
    const encodedSearchTerm = encodeURIComponent(searchKey);
    let url = `${baseUrl}/volumes?q=${encodedSearchTerm}&maxResults=40&projection=lite`;
    return HelperService.get(url);
}