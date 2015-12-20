/**
 * Created by Ezra on 19/08/15.
 */

"use strict";

import _ from 'lodash';

export default function text(text) {
    let  _vowelRgxp = /[euioa]/ig,
        _consonantRgxp = /[qwrtypsdfghjklzxcvbnm]/ig,

        _vowels = text.match(_vowelRgxp) || [],
        _consonants = text.match(_consonantRgxp) || [],

        _top3Counter = function (values) {
            return _.chain(values)
                .countBy()
                .map(function (num, key) {
                    return {letter: key, occurrences: num};
                })
                .sortByOrder("occurrences", 'desc')
                .take(3)
                .value();
        };

    return {
        consonants: function () {
            return _consonants.length;
        },

        vowels: function () {
            return _vowels.length;
        },

        vowelsTop3: function () {
            return _top3Counter(_vowels);
        },

        consonantsTop3: function () {
            return _top3Counter(_consonants);
        }
    };
};