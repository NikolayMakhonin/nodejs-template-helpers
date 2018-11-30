import assert from 'assert'
import test from '../../src/test';

describe('test', function() {
    it('test', function(done) {
        assert.equal(JSON.stringify(test), "{}");
        done();
    });
});
