describe('Total Element Width', function() {

    it('Should give error for non-jQuery objects as the first parameter', function() {
        expect(function(){
            getTotalWidth('body',1,1);
        }).to.throw('A valid jQuery element was not passed as the first parameter');
    });

    it('Should give error for non-Number second and third parameters', function() {
        expect(function(){
            getTotalWidth($('body'),'asd','asd');
        }).to.throw('Margin paramters are not valid');
    });

    it('Should give correct body width', function() {
        var test = true;
        bodyWidth = $('body').width();
        var totalWidth = getTotalWidth($('body'),0,0);
        assert.equal(totalWidth, totalWidth);
    });

});


