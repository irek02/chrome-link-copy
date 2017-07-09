/**
 * LinkToClipboard
 *
 * @param {object} window
 */
function LinkToClipboard(window) {
  this._window = window;
  this._linkUrl = null;
  this._isHovering = false;
}

LinkToClipboard.prototype._linkUrl = null;
LinkToClipboard.prototype._isHovering = false;

LinkToClipboard.prototype.init = function() {
  var that = this;

  this._window.onmouseover = function(event) {
    if (that.isElementALinkWithUrl(event)) {
      that._linkUrl = event.target.href;
    }
    that._isHovering = true;
  };

  this._window.onmouseout = function() {
    that._isHovering = false;
    console.log("out");
    console.log(that);
  };

  this._window.onkeydown = function(event) {
    console.log(that.isCmdCPressed(event));
    console.log(that._isHovering);
    console.log(that._linkUrl);
    if (!that.isCmdCPressed(event)) {
      return;
    }

    if (!that._isHovering) {
      return;
    }

    if (!that._linkUrl) {
      return;
    }

    that.copyToClipboard(that._linkUrl);
  };
};

LinkToClipboard.prototype.copyToClipboard = function(url) {
  var tmpInputField = this.createTmpInputField();

  tmpInputField.value = url;

  tmpInputField.select();

  document.execCommand('copy');

  document.body.removeChild(tmpInputField);
  console.log("COpied");
};

LinkToClipboard.prototype.createTmpInputField = function() {
  var dummy = document.createElement('input');

  document.body.appendChild(dummy);

  dummy.setAttribute('id', 'dummy_id');

  dummy.style.visibility = 'none';

  return dummy;
};


LinkToClipboard.prototype.captureLink = function(event) {
  if (this.isElementALinkWithUrl(event)) {
    this._linkUrl = event.target.href;
  }
};

LinkToClipboard.prototype.isElementALinkWithUrl = function(event) {
  if (!event.target) {
    return;
  }

  if (event.target.href) {
    return true;
  }
};


LinkToClipboard.prototype.isCmdCPressed = function(event) {
  if (!event.metaKey) {
    return;
  }

  if (event.keyCode !== 67) {
    return;
  }

  return true;
};


if (typeof module !== 'undefined' && module.exports != null) {
  module.exports = LinkToClipboard;
}

