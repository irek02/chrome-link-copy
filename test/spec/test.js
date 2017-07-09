'use strict';

var windowMock;
var ltc;

describe('Link to clipboard', function () {

  beforeEach(function () {

    windowMock = jasmine.createSpyObj('windowMock', ['onmouseover', 'onkeydown', 'onmouseout']);

    ltc = new LinkToClipboard(windowMock);

    spyOn(ltc, 'captureLink').and.callThrough();
    spyOn(ltc, 'copyToClipboard').and.callThrough();

    ltc.init();

  });

  it('should copy the URL to the clipboard', function () {

    // Simulate a link hover event.
    var event = {
      target: {
        href: "http://foo.com"
      }
    };

    windowMock.onmouseover(event);

    // Simulate CMD+C keystroke.
    event = {
      metaKey: true,
      keyCode: 67
    };

    windowMock.onkeydown(event);

    expect(ltc.copyToClipboard).toHaveBeenCalledWith("http://foo.com");

  });

  it('should not copy the URL when not hovering over a link', function() {
    // Steps to reproduce
    // 1. Navigate to a link and hit copy
    // 2. Navigate away from the link and hit copy
    // 3. The script still copies the link even when not in hover.
    // It shouldn't copy to clipboard when not hovering over a link.


    // Simulate a link hover event.
    var event = {
      target: {
        href: "http://foo.com"
      }
    };

    windowMock.onmouseover(event);

    // Simulate CMD+C keystroke.
    event = {
      metaKey: true,
      keyCode: 67
    };

    windowMock.onkeydown(event);

    expect(ltc.copyToClipboard.calls.count()).toBe(1);

    windowMock.onmouseout();

    // Simulate CMD+C keystroke.
    event = {
      metaKey: true,
      keyCode: 67
    };

    windowMock.onkeydown(event);

    expect(ltc.copyToClipboard.calls.count()).toBe(1);

  });

});


















