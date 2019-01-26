console.log(JSON.stringify(assert))
import example from '../../../src/example'

describe('test', function () {
	it('test', function (done) {
		assert.strictEqual(JSON.stringify(example), '{}')
		done()
	})
})
