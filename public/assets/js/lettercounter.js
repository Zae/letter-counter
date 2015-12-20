/**
 * Created by Ezra on 20/12/15.
 */

"use strict";

import Vue from 'vue';
import counter from './components/counter.vue';

(function () {

	// =========================================================== pre-init

	// =========================================================== modules
	Vue.config.debug = false;

	// =========================================================== main app

	new Vue({
		el: 'body',
		data: {

		},
		events: {

		},
		components: {
			counter: counter
		},
		'methods': {

		},
		compiled() {

		}
	});
}());