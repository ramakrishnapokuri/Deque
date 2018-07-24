class Helper {
    static arrayDatesort(dateArray) {
        dateArray.sort(function (d1, d2) {
            function parseDate(str) {
                var parts = str.split('-');
                return new Date(parts[0], parts[1], parts[2] - 1);
            }
            return parseDate(d1) - parseDate(d2);
        });
        return dateArray;
    }

    static isValidDate(date) {
        return date.match(/^(\d{4})([\/-])(\d{1,2})\2(\d{1,2})$/);
    }

    static getHighestOccurrenceValue(array) {
        let result,  
        best = -1,   
        lookup = {}; 
        // Loop to go through array and count elements
        for(let i = 0; i < array.length; i++){                       
           if (lookup[array[i]] == undefined){
              lookup[array[i]] = 0;
           } 
           lookup[array[i]]++;
           if(lookup[array[i]] > best){ // Greedy for best element
              best = lookup[array[i]];
              result = array[i]
           }
        }

        return result; 
    }
}
export default Helper;