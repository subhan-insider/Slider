var debounce = function( func, delay ){

    if(typeof func !== 'function'){
        throw new Error('Invalid first paramater. Must be function');
    }
    if( isNaN(parseFloat(delay)) && !isFinite( delay ) ){
        throw new Error('Invalid second paramater. Must be a valid number');
    }

    var inDebounce;
    return function() {
        var self = this;
        clearTimeout(inDebounce);
        return inDebounce = setTimeout(function() {
            return func.apply(self, arguments);
        }, delay);
    };
}

