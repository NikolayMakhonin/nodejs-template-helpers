/* eslint-disable no-new-func */

it('isNode', function () {
	// see: https://stackoverflow.com/a/31090240/5221762
	const isNode = new Function('try {return this===global;}catch(e){ return false;}')
	const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')
	console.log(`isNode = ${isNode()}; isBrowser = ${isBrowser()};`)
	assert.strictEqual(isBrowser(), false)
	assert.strictEqual(isNode(), true)
})
