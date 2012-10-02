
describe('Runie AMD', function () {
    it('load by AMD', function (done) {
        if (typeof define !== 'function') { var define = require('amdefine')(module); }

        define(['../'], function (runie) {
            runie.should.a('object');
            runie.tag.should.a('function');
            runie.write.should.a('function');
            runie.read.should.a('function');
            runie.find.should.a('function');

            done();
        });
    });
});