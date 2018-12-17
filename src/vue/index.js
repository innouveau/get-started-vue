import Vue from 'vue';
import store from './store';
import app from './app';

// google material for Vue
import VueMaterial from 'vue-material'
Vue.use(VueMaterial);

new Vue({
    el: '#app',
    store,
    components: {
        app
    },
    template: '<app/>'
});