import Vue from 'vue';
import Vuex from 'vuex';

import ChatModule from './modules/ChatModule';

Vue.use(Vuex);

const store = {
  modules: {
    chat: ChatModule,
  },
};

export default new Vuex.Store(store);
