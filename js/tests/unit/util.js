$(function () {
  'use strict'

  QUnit.module('util')

  QUnit.test('Util.getSelectorFromElement should return the correct element', function (assert) {
    assert.expect(3)

    var $el = $('<div data-target="body"></div>').appendTo($('#qunit-fixture'))
    assert.strictEqual(Util.getSelectorFromElement($el[0]), 'body')

    // not found element
    var $el2 = $('<div data-target="#fakeDiv"></div>').appendTo($('#qunit-fixture'))
    assert.strictEqual(Util.getSelectorFromElement($el2[0]), null)

    // should escape ID and found the correct element
    var $el3 = $('<div data-target="#collapse:Example"></div>').appendTo($('#qunit-fixture'))
    $('<div id="collapse:Example"></div>').appendTo($('#qunit-fixture'))
    assert.strictEqual(Util.getSelectorFromElement($el3[0]), '#collapse\\:Example')
  })

  QUnit.test('Util.typeCheckConfig should thrown an error when a bad config is passed', function (assert) {
    assert.expect(1)
    var namePlugin = 'collapse'
    var defaultType = {
      toggle : 'boolean',
      parent : '(string|element)'
    }
    var config = {
      toggle: true,
      parent: 777
    }

    try {
      Util.typeCheckConfig(namePlugin, config, defaultType)
    } catch (e) {
      assert.strictEqual(e.message, 'COLLAPSE: Option "parent" provided type "number" but expected type "(string|element)".')
    }
  })

  QUnit.test('Util.isElement should check if we passed an element or not', function (assert) {
    assert.expect(3)
    var $div = $('<div id="test"></div>').appendTo($('#qunit-fixture'))

    assert.strictEqual(Util.isElement($div), 1)
    assert.strictEqual(Util.isElement($div[0]), 1)
    assert.strictEqual(typeof Util.isElement({}) === 'undefined', true)
  })

  QUnit.test('Util.getUID should generate a new id uniq', function (assert) {
    assert.expect(2)
    var id = Util.getUID('test')
    var id2 = Util.getUID('test')

    assert.ok(id !== id2, id + ' !== ' + id2)

    id = Util.getUID('test')
    $('<div id="' + id + '"></div>').appendTo($('#qunit-fixture'))

    id2 = Util.getUID('test')
    assert.ok(id !== id2, id + ' !== ' + id2)
  })
})
