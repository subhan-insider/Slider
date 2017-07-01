describe('Debounce', function() {

    before(function(){
        $('.fixture').remove();
    });
    after(function(){
        $('.fixture').remove();
    });

    it('Should have first parameter of type function', function() {
        expect(function(){
            debounce(1,1);
        }).to.throw('Invalid first paramater. Must be function');
    });

    it('Should give error for non-Number second and third parameters', function() {
        expect(function(){
            debounce(function(){},{});
        }).to.throw('Invalid second paramater. Must be a valid number');
    });

    it('debounce works successfully', function(done){
        function clickHandler(){
            done();
        }
        $('body').append('<div class="fixture" style="display:none"></div>');
        $('.fixture').click( debounce( clickHandler, 1000 ) );
        $('.fixture').click();
    }); 
});



