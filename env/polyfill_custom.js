/* eslint-disable no-undefined,no-global-assign,no-undef */
/* eslint prefer-template: "off" */
/* eslint-env es5 */
/* eslint semi: ["error", "always"] */
(function () {
	if (typeof navigator === 'undefined') {
		return;
	}

	// see: https://stackoverflow.com/a/16136040/5221762
	function isIE(v) {
		return RegExp('msie' + (!isNaN(v) ? '\\s' + v : ''), 'i').test(navigator.userAgent);
	}

	if (isIE(10)) {
		Uint8Array = undefined;
	}
})();
