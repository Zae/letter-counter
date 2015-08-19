/**
 * Created by Ezra on 19/08/15.
 */

var _ = require('lodash');

module.exports = {
    'text': function(text){
        return counter(text);
    }
};

var counter = function(text) {
    var _consonants = [],
        _vowels = [],
        _vowelrgxp = /[euioa]/ig,
        _consonantrgxp = /[qwrtypsdfghjklzxcvbnm]/ig;

    (function(text){
        _.forEach(text.match(_vowelrgxp), function(elem){
            _vowels.push(elem);
        });

        _.forEach(text.match(_consonantrgxp), function(elem){
            _consonants.push(elem);
        });
    }(text.toLowerCase()));

    return {
        consonants: function(){
            return _consonants.length;
        },
        vowels: function(){
            return _vowels.length;
        },
        vowelstop3: function() {
            return _.chain(_vowels)
                .countBy()
                .map(function(num, key){
                    return {letter: key, occurrences: num}
                })
                .sortByOrder("occurrences", 'desc')
                .take(3)
                .value();
        },
        consonantstop3: function() {
            return _.chain(_consonants)
                .countBy()
                .map(function(num, key){
                    return {letter: key, occurrences: num}
                })
                .sortByOrder("occurrences", 'desc')
                .take(3)
                .value();
        }
    }
};
