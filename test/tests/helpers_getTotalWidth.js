describe('Total Element Width', function() {

    it('Should accept first parameter as a jQuery/sQuery object', function() {
        expect(function(){
            getTotalWidth('body',1,1);
        }).to.throw('A valid jQuery element was not passed as the first parameter');
    });

    it('Should accept second and third parameters as numbers', function() {
        expect(function(){
            getTotalWidth($('body'),'asd','asd');
        }).to.throw('Margin paramters are not valid');
    });

    it('Should output a number', function() {
        var totalWidth = getTotalWidth($('body'),0,0);
        assert.isNumber( totalWidth);
       
    });

    it('Should output correct body width', function() {
        var body = $('body'),
            bodyWidth = body.width(),
            totalWidth = getTotalWidth(body,0,0);
        assert.equal(totalWidth, bodyWidth);
    });

});


