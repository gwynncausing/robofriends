/* Helper methods in handling datetime (duration)
/* References:
*  [1] https://momentjs.com/docs/
*
*  Note: 
*  [1] in order for this to work, npm install moment
*/

import moment from 'moment';

class DateTimeParser {
    // convert a valid date string into whatever format you like
    // params:
    //   datetime -> valid datetime string
    //   format -> format you like to return
    // 
    // datetime -> 2020-12-31T17:00:00Z
    // format -> MMM. DD, YYYY
    // return Dec. 31, 2020
    parse(datetime, format){
        return moment(datetime).format(format)
    }
    // convert date/datetime into ISOString so that it will be accepted in backend for duration
    // params:
    //   datetime -> valid date/datetime
    convertToISOString(datetime){
        return moment(datetime).toISOString()
    }
}

export default new DateTimeParser()