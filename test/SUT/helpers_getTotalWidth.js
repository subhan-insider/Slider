function getTotalWidth ( pages, marginLeft, marginRight ){
    if( !(pages instanceof jQuery) ){
        throw new Error('A valid jQuery element was not passed as the first parameter');
    }
    if( typeof marginLeft !== 'number' || typeof marginRight !== 'number' ) {
        throw new Error('Margin paramters are not valid');
    }
    var totalWidth = 0;
    pages.each(function (index, page) {
        totalWidth += $(page).width() + marginRight + marginLeft;
    });
    return totalWidth;

}
