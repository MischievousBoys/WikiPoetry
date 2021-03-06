jest.dontMock('../../constants/WikiConstants');
jest.dontMock('../../components/cartridge/Cartridge.react');
jest.dontMock('../WikiPoetryStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');


describe('WikiPoetryStore', function () {
  describe('TypeBox', function () {
    var WikiConstants = require('../../constants/WikiConstants');
    var WikiPoetryDispatcher;
    var WikiPoetryStore;
    var callback;

    var ActionTypes = WikiConstants.ActionTypes;

    // mock actions
    var actionWikiPickType = {
      actionType: ActionTypes.PICK_TYPE,
      type: 'test'
    };

    beforeEach(function() {
      WikiPoetryDispatcher = require('../../dispatcher/WikiPoetryDispatcher');
      WikiPoetryStore = require('../WikiPoetryStore');
      callback = WikiPoetryDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function () {
      expect(WikiPoetryDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should return the current Type', function () {
      var type = WikiPoetryStore.getType();
      expect(type).toEqual('keats');
      callback(actionWikiPickType);
      var type = WikiPoetryStore.getType();
      expect(type).toEqual('test');
    });

    // it('changes type after click', function () {

    //   var ReactDOM = require('react-dom');
    //   var React = require('react');
    //   var TestUtils = require('react-addons-test-utils');
    //   var Cartridge = require('../../components/cartridge/Cartridge.react');

    //   var typeBox = TestUtils.renderIntoDocument(
    //     <Cartridge />
    //   );

    //   var input = TestUtils.findRenderedDOMComponentWithTag(
    //     checkbox, 'input');
    //   TestUtils.Simulate.change(input, {  
    //     actionType: WikiConstants.PICK_TYPE,
    //     type: 'dylan'
    //   });
    //   var type = WikiPoetryStore.getType();
    //   expect(type).toEqual('dylan');
    // });
  });
});