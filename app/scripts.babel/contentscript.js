'use strict';

var link_url = null;

window.onmouseover = function(e) {
	if (isElementALinkWithUrl(e)) {
		link_url = e.target.href;
	}
};

document.onkeydown = function(e) {

	if (!isCmdCPressed(e)) {
		return;
	} 

	if (!link_url) {
		return;
	}

	var tmp_input_field = createTmpInputField();

	tmp_input_field.value = link_url;

	tmp_input_field.select();

	document.execCommand('copy');

	document.body.removeChild(tmp_input_field);
}

function createTmpInputField() {

	var dummy = document.createElement('input');

	document.body.appendChild(dummy);

	dummy.setAttribute('id', 'dummy_id');

	dummy.style.visibility = 'none';

	return dummy;

}

function isElementALinkWithUrl(event) {

	if (!event.target) {
		return;
	}

	if (event.target.href) {
		return true;
	}
}

function isCmdCPressed(event) {

	if (!event.metaKey) {
		return;
	} 

	if (event.keyCode !== 67) {
		return;
	}

	return true;
}