var getTotalWidth = function( pages, marginLeft, marginRight ){
    var totalWidth = 0;
    pages.each(function (index, page) {
        totalWidth += $(page).width() + marginRight + marginLeft;
    });
    return totalWidth;
}
