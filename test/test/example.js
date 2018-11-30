import assert from 'assert'
import test from '../../src/example';

describe('test', function() {
    it('test', function(done) {
        assert.equal(JSON.stringify(test), "{}");
        done();
    });
});
