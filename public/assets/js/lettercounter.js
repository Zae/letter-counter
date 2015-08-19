/*! ======================================================================
 lettercounter
 Designed and developed by Ezra Pool
 http://www.tsdme.nl
 ====================================================================== */

(function () {

    'use strict';

    // ====================================================== dependencies

    var $ = require('jquery');

    // make dependencies global so modules can use them without having to
    // call require(x) all over the place (although that would be nicer)
    global.$ = global.jQuery = $;

    // =========================================================== pre-init

    $('html').removeClass('no-js');

    // =========================================================== modules

    var letterCounter = require('./modules/lettercounter');

    // ======================================================== initialization


    // ======================================================== after load

    jQuery(function($){
        var $textarea = $('[name="text"]'),
            $vowelscount = $('.vowels'),
            $consonantscount = $('.consonants'),
            $vowelstop = $('.vowelstop3'),
            $consonantstop = $('.consonantstop3');

        $textarea.on('change keyup keydown focus blur', function(){
            var $this = $(this),
                counted = letterCounter.text($this.val());

                $vowelscount.text(counted.vowels());
                $consonantscount.text(counted.consonants());

            $vowelstop.empty();
            $.each(counted.vowelstop3(), function(key, elem){
                $vowelstop.append($('<li>', {
                    text: elem.letter + ': '+ elem.occurrences
                }));
            });

            $consonantstop.empty();
            $.each(counted.consonantstop3(), function(key, elem){
                $consonantstop.append($('<li>', {
                    text: elem.letter + ': '+ elem.occurrences
                }));
            });
        });
    });

    // ===================================================================

}());