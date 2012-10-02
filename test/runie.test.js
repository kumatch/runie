var runie = require('../');
var $ = require('jquery');

describe('Runie', function () {
    var key = 'key_name';

    describe('creates a jquery tag by object value.', function () {
        var tag;
        var value = { foo: { bar: 123, baz: [ 'qux' ] } };

        before(function () {
            tag = runie.tag(key, value, true);
        });

        it('should be "var".', function () {
            tag.is('var').should.ok;
        });

        it('should have an attribute "data-runie-key", and equals key.', function () {
            tag.attr('data-runie-key').should.equal(key);
        });

        it('should have a text json value.', function () {
            tag.text().should.equal(JSON.stringify(value));
        });

        it('should have an attribute "style", and equals "display:none;"', function () {
            tag.css('display').should.equal('none');
        });
    });

    describe('creates a string tag by number 123.', function () {
        var tag;
        var value = 123;

        before(function () {
            tag = runie.tag(key, value);
        });

        it('should equals <var style="display: none;" data-runie-key="key_name">123</var>', function () {
            tag.should.equal('<var style="display: none;" data-runie-key="key_name">123</var>');
        });
    });

    describe('a body', function () {
        before(function () {
            $('body').html('');
        });

        after(function () {
            $('body').html('');
        });

        it('should not have any DOM element', function () {
            $('body').children().length.should.equal(0);
        });

        it('should not have a "var" tag', function () {
            $('body').find('var').length.should.equal(0);
        });

        describe('writes a stirng value "foo-bar-baz"', function () {
            var value = 'foo-bar-baz';

            before(function () {
                runie.write(key, value);
            });

            it('should have a DOM element', function () {
                $('body').children().length.should.equal(1);
            });

            it('should append a "var" tag to body', function () {
                var $tag = $('body').children().eq(0);

                $tag.is('var').should.ok;
                $tag.text().should.equal('"' + value + '"');
            });
        });
    });


    describe('reads a value by key', function () {
        var value;

        before(function () {
            $('body').html('');
            value = runie.read(key);
        });

        after(function () {
            $('body').html('');
        });

        it('should equal undefined.', function () {
            (value === undefined).should.ok;
        });

        describe('writes a number 12345, and reads a value by key again', function () {
            before(function () {
                runie.write(key, 12345);
                value = runie.read(key);
            });

            it('should equal 12345', function () {
                value.should.equal(12345);
            });
        });
    });

    describe('writes a number 12345, and reads with callback', function () {
        var value;

        before(function (done) {
            runie.write(key, 12345);
            runie.read(key, function (result) {
                value = result;
                done();
            });
        });

        it('should equal 12345', function () {
            value.should.equal(12345);
        });
    });


    describe('finds a values by key', function () {
        var values;

        before(function () {
            $('body').html('');
            values = runie.find(key);
        });

        after(function () {
            $('body').html('');
        });

        it('should equal []', function () {
            values.should.be.an.instanceOf(Array);
            values.length.should.equal(0);
        });

        describe('writes a number 123, and finds a values by key again', function () {
            before(function () {
                runie.write(key, 123);
                values = runie.find(key);
            });

            it('should equal [ 123 ]', function () {
                values.should.be.an.instanceOf(Array);
                values.length.should.equal(1);
                values[0].should.equal(123);
            });

            describe('writes a number 456, and finds a values by key again', function () {
                before(function () {
                    runie.write(key, 456);
                    values = runie.find(key);
                });

                it('should equal [ 123, 456 ]', function () {
                    values.should.be.an.instanceOf(Array);
                    values.length.should.equal(2);
                    values[0].should.equal(123);
                    values[1].should.equal(456);
                });
            });
        });
    });

    describe('writes numbers 123, 456, and finds with callback', function () {
        var values;

        before(function (done) {
            runie.write(key, 123);
            runie.write(key, 456);
            runie.find(key, function (results) {
                values = results;
                done();
            });
        });

        it('should equal [ 123, 456 ]', function () {
            values.should.be.an.instanceOf(Array);
            values.length.should.equal(2);
            values[0].should.equal(123);
            values[1].should.equal(456);
        });
    });
});