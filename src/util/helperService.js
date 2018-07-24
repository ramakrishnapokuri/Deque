
class HelperService {
    static get(url) {
        return window.fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw `Error searching for books with term: ${searchKey}`;
                }
            })
            .then((response) => {
                return response.items || [];
            });
    }

}

export default HelperService;