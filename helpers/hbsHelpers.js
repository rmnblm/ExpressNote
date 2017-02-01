const hbs = require('express-hbs');
const moment = require('moment');

hbs.registerHelper('moment', text => new hbs.SafeString(moment(text).fromNow()));
