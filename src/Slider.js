//Slider
(function( $ ){

    "use strict";
    var helpers = function(){

        var debounce = function( func, delay ){
            var inDebounce;
            inDebounce = undefined;
            return function() {
                var args, context;
                clearTimeout(inDebounce);
                context = this;
                args = arguments;
                return inDebounce = setTimeout(function() {
                    return func.apply(context, arguments);
                }, delay);
            };
        }

        var getClientX = function( event ){
            return (event.originalEvent.changedTouches && event.originalEvent.changedTouches[0].clientX) || event.originalEvent.pageX || event.clientX;
        }

        var getTotalWidth = function( pages, marginLeft, marginRight ){
            var totalWidth = 0;
            pages.each(function (index, page) {
                totalWidth += $(page).width() + marginRight + marginLeft;
            });
            return totalWidth;
        }

        return {
            debounce: debounce,
            getClientX: getClientX,
            getTotalWidth: getTotalWidth
        }
    }()

    //STARTOF -- SLIDER
    var PagesSlider = function (slider, options) {  
        options = options || {};


        this.slider = slider;
        this.content = slider.children().first();
        this.currentIndex = 0;
        //TODO: Add exception classes (via options) eg. this.content.children(':not(.clearfix)')
        this.pages = this.content.children();

        var firstSlide = this.pages.first(),
            offsetWidth = options.offsetWidth || 0, //OPTIONS
            marginRight = parseFloat(firstSlide.css('margin-right')) || 0,
            marginLeft = parseFloat(firstSlide.css('margin-left')) || 0,
            totalWidth = helpers.getTotalWidth( this.pages, marginLeft, marginRight ),
            effectiveSlideWidth = firstSlide.width() + marginRight + marginLeft;

        this.content.width(totalWidth  + offsetWidth);
        this.activeSlidesCount = options.activeSlidesCount || Math.ceil(this.slider.width() / effectiveSlideWidth ); //OPTIONS
        this.slider.width( effectiveSlideWidth * this.activeSlidesCount );

        //options
        this.slideCount = options.slideCount || this.activeSlidesCount; 
        this.sensitivity = options.sensitivity || 5;
        this.nextClass = options.nextClass || 'ins-next';
        this.prevClass = options.prevClass || 'ins-prev';
        this.debounceTime = options.debounceTime || 0;
        this.slideTime = options.slideTime || 400;
        this.disableClass = options.disableClass || 'ins-arrow-disabled';
        this.destroyOnInit = options.destroyOnInit || false;

        
        this.bindEvents();
        this.slideActive();

    };
    
    $.extend(PagesSlider.prototype, {

        bindEvents: function () {

            this._removeTransition = $.proxy(this.removeTransition, this);
            this._startDrag = $.proxy(this.startDrag, this);
            this._doDrag = $.proxy(this.doDrag, this);
            this._endDrag = $.proxy(this.endDrag, this);
            this._keyHandler = $.proxy(this.keyHandler, this);

            var _next = $.proxy(this.next, this);
            var _prev = $.proxy(this.prev, this);
            var _destroy = $.proxy(this.destroy, this);
            var _debounce = $.proxy( helpers.debounce, this );
            
            this.destroyOnInit ? _destroy() : false;

            $('.' + this.nextClass).on('click',_debounce(_next,this.debounceTime));

            $('.' + this.prevClass).on('click', _debounce(_prev,this.debounceTime));

            this.content
                .on('mousedown.insider touchstart.insider', this._startDrag)
                .on('transitionend', this._removeTransition)
            $('body')
                .on('mousemove.insider touchmove.insider', this._doDrag)
                .on('mouseup.insider touchend.insider', this._endDrag)
                .on('keydown.insider',this._keyHandler);

        },
        
        destroy: function () {
            $('.' + this.nextClass).off('click');
            $('.' + this.prevClass).off('click');
            this.content
                .off('mousedown.insider touchstart.insider', this._startDrag)
                .off('transitionend', this._removeTransition);
            $('body')
                .off('mousemove.insider touchmove.insider', this._doDrag)
                .off('mouseup.insider touchend.insider', this._endDrag)
                .off('keydown.insider',this._keyHandler);
        },


        startDrag: function (event) {
            this.enableDrag = true;
            this.dragStartX = helpers.getClientX( event );
        },

        doDrag: function (event) {
            if (this.enableDrag) {
                var position = this.pages.eq(this.currentIndex).position();
                if( !position ){
                    return;
                }
                var delta = helpers.getClientX( event ) - this.dragStartX;

                this.content.css('transform', 'translate3d(' + (delta - position.left) + 'px, 0, 0)');
                event.preventDefault();
            }
        },

        endDrag: function (event) {
            if (this.enableDrag) {
                this.enableDrag = false;

                var delta = helpers.getClientX( event ) - this.dragStartX;
                if (Math.abs(delta) > this.slider.width() / this.sensitivity) {
                    if (delta < 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                } else {
                    this.current();
                }
            }
        },

        removeTransition: function() {
            this.content.css('transition', 'none');
        },

        goToIndex: function (index) {
            var position = this.pages.eq(index).position();
            if( !position ){
                return;
            }
            this.content
                .css('transition', 'all '+this.slideTime +'ms ease')
                .css('transform', 'translate3d(' + (-1 * (position.left)) + 'px, 0, 0)');

            this.currentIndex = index;
            this.slideActive( index, index + this.activeSlidesCount );
        },

        current: function () {
            this.goToIndex(this.currentIndex);
        },

        next: function () {
            var nextIndex = this.currentIndex + this.slideCount;
            var remainingSlides = this.getActiveSlides().last().nextAll().length;

            if (this.currentIndex >= this.pages.length - 1 || this.pages.last().hasClass('active')) {
                // TODO: Make options config to support continuously lopping slider
                // this.goToIndex(0)
                this.current();
            } else {
                
                if( remainingSlides <= this.slideCount ){
                    nextIndex = this.currentIndex + remainingSlides;
                    $('.' + this.nextClass).addClass( this.disableClass );
                }else{
                   this.removeDisable();
                }
                this.goToIndex( nextIndex );
            }
            
        },

        prev: function () {
            var prevIndex = this.currentIndex - this.slideCount;
            var remainingSlides = this.getActiveSlides().first().prevAll().length;

            if (this.currentIndex <= 0) {
                this.current();
            } else {
                if( remainingSlides <= this.slideCount ){
                    prevIndex = this.currentIndex - remainingSlides;
                    $('.' + this.prevClass).addClass( this.disableClass );
                }else{
                    this.removeDisable();
                }
                this.goToIndex( prevIndex );
            }
        },

        slideActive: function( start, end ){
            start = start || 0;
            end = end || this.activeSlidesCount;
            this.pages.removeClass('active');
            for( var i = start; i < end; i++ ){
                this.pages.eq(i).addClass('active');
            }
        },

        keyHandler: function( e ){
            e = e || window.event;
            if (e.keyCode == '37') {
                // left arrow
                this.prev();
            }
            else if (e.keyCode == '39') {
                // right arrow
                this.next();
            }
        },

        getActiveSlides: function(){
            return this.pages.filter(function(i,e){ return $(e).hasClass('active')})
        },

        removeDisable: function(){
            $('.' + this.prevClass + ',' + '.' + this.nextClass).removeClass( this.disableClass );
        }
    });
    (function($) {
        $.fn.slider = function(options) {
            this.each(function(index, slider) {
                var $this = $(slider);
                var pagesSlider = new PagesSlider($this,options);
                $this.data('pagesSlider', pagesSlider);
            });
            return this;
        };
    })($);
    //ENDOF -- SLIDER


}( sQuery ));
