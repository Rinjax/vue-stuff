window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.validateStatus = () => true;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });


/**
 * Load and setup the graph client. register globally so that its easy to reference from the vuex store as well as the
 * vue instance
 */
import graph from "grapql-js-client";
window.graph = graph;

console.log('bootstrap',graph);

//window.graph.setCredentials(true);
window.graph.url = (process.env.NODE_ENV === 'production') ? process.env.MIX_GRAPH_URL_PRO : process.env.MIX_GRAPH_URL_DEV;

