import Vue from 'vue';
import Vuex from 'vuex';

import test from './test.js';
import city from './city.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        test,
        city
    }
})