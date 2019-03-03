const preactCompat = require('preact-compat');
const createContext = require('preact-context');

preactCompat.createContext = createContext.createContext;

module.exports = preactCompat;
