/*! ======================================================================
 lettercounter
 Designed and developed by Ezra Pool
 http://www.tsdme.nl
 ====================================================================== */

/*globals require, global */
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

    $(function ($) {
        var $textarea = $('[name="text"]'),
            $vowelsCount = $('.vowels'),
            $consonantsCount = $('.consonants'),
            $vowelsTop = $('.vowelstop3'),
            $consonantsTop = $('.consonantstop3'),

            updateList = function ($el, letters) {
                $el.empty()
                    .append(
                        $.map(letters, function (elem) {
                            return $('<li>', {
                                text: elem.letter + ': ' + elem.occurrences
                            });
                        })
                    );
            };

        $textarea.on('change keyup keydown focus blur cut copy paste', function () {
            var $this = $(this),
                counted = letterCounter.text($this.val());

            $vowelsCount.text(counted.vowels());
            $consonantsCount.text(counted.consonants());

            updateList($vowelsTop, counted.vowelsTop3());
            updateList($consonantsTop, counted.consonantsTop3());
        });
    });

    // ===================================================================

}());