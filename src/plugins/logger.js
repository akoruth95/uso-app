import Vue from 'vue';
import VueLogger from 'vuejs-logger';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: !isProduction,
    logLevel : 'debug',
    stringifyArguments : true,
    showLogLevel : true,
    showMethodName : false,
    separator: '|',
    showConsoleColors: true
};
 
Vue.use(VueLogger, options);
