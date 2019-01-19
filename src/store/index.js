import Vue from 'vue';
import Vuex from 'vuex';

// Module imports
import { account } from './account.module';
import { alert } from './alert.module';
import { common } from './common.module';
import { events } from './events.module';
import { sessions } from './sessions.module';
import { materials } from './materials.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    alert,
    common,
    events,
    sessions,
    materials,
  },
  strict: process.env.NODE_ENV !== 'production' // prevents mutation of store directly, turned off in prod for performance
});
