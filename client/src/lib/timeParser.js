import 'moment-timezone';
import moment from 'moment';

const timezone = 'America/Los_Angeles';

const timeParser = (timestamp) => {
  return moment(timestamp).tz(timezone).format('MM/DD/YYYY hh:mm:ss A z');
}

export default timeParser;