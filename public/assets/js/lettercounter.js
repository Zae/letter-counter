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

    jQuery(function ($) {
        var $textarea = $('[name="text"]'),
            $vowelsCount = $('.vowels'),
            $consonantsCount = $('.consonants'),
            $vowelsTop = $('.vowelstop3'),
            $consonantsTop = $('.consonantstop3'),
            createList = function ($el, letters) {
                var html = '';
                $.each(letters, function (key, elem) {
                    html += '<li>' + elem.letter + ':' + elem.occurrences + '</li>';
                });
                $el.html(html);
            };

        $textarea.on('change keyup keydown focus blur', function () {
            var $this = $(this),
                counted = letterCounter.text($this.val());

            $vowelsCount.text(counted.vowels());
            $consonantsCount.text(counted.consonants());

            createList($vowelsTop, counted.vowelsTop3());
            createList($consonantsTop, counted.consonantsTop3());

        });
    });

    // ===================================================================

}());
