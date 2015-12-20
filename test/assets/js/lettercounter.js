/**
 * Created by Ezra on 19/08/15.
 */

'use strict';

import letterCounter from '../../../public/assets/js/modules/lettercounter';
import QUnit from 'qunitjs';

QUnit.test( "alphabet", function( assert ) {
    var counted = letterCounter('abcdefghijklmnopqrstuvwxyz');

    assert.strictEqual( counted.vowels(), 5, "Passed!" );
    assert.strictEqual( counted.consonants(), 21, "Passed!" );
});

QUnit.test( "double-alphabet", function( assert ) {
    var counted = letterCounter('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');

    assert.strictEqual( counted.vowels(), 10, "Passed!" );
    assert.strictEqual( counted.consonants(), 42, "Passed!" );
});

QUnit.test( "multi-alphabet", function( assert ) {
    var counted = letterCounter('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');

    assert.strictEqual( counted.vowels(), 50, "Passed!" );
    assert.strictEqual( counted.consonants(), 210, "Passed!" );
});

QUnit.test( "CapiTalIZatioN", function( assert ) {
    var counted = letterCounter('aBcDEfGHiJkLmNOpqRsTuVWxYz');

    assert.strictEqual( counted.vowels(), 5, "Passed!" );
    assert.strictEqual( counted.consonants(), 21, "Passed!" );
});

QUnit.test( "Strange Characters", function( assert ) {
    var counted = letterCounter('aBc%DE!fGH%iJk^Lm*N%OpqR(sTu%^VW(xYz');

    assert.strictEqual( counted.vowels(), 5, "Passed!" );
    assert.strictEqual( counted.consonants(), 21, "Passed!" );
});

QUnit.test( "Top3", function( assert ) {
    var counted = letterCounter('eeeeeeeeeeuuuuuiiiooakkkkkkkkkkttttthhhqqz');

    assert.deepEqual( counted.vowelsTop3(), [{letter: 'e', occurrences: 10}, {letter: 'u', occurrences: 5}, {letter: 'i', occurrences: 3}], "Passed!" );
    assert.deepEqual( counted.consonantsTop3(), [{letter: 'k', occurrences: 10}, {letter: 't', occurrences: 5}, {letter: 'h', occurrences: 3}], "Passed!" );
});

QUnit.test( "Top3 - Strange Characters", function( assert ) {
    var counted = letterCounter('eeee*e)eee%eeuuuu^u$iiioo_akk#kkkk*kkkk!tttt+th(hhqqz');

    assert.deepEqual( counted.vowelsTop3(), [{letter: 'e', occurrences: 10}, {letter: 'u', occurrences: 5}, {letter: 'i', occurrences: 3}], "Passed!" );
    assert.deepEqual( counted.consonantsTop3(), [{letter: 'k', occurrences: 10}, {letter: 't', occurrences: 5}, {letter: 'h', occurrences: 3}], "Passed!" );
});