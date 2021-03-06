# Slider
A simple slider for desktop, mobile and tablet. Tested on chrome, firefox, safari, internet explorer, android browser and mobile safari.
The slider can be used with arrow keys, mouse drags and next/prev buttons.

## Getting Started

Add src/Slider.js to free js if you are using this in multiple places.

### Prerequisites

You are going to have to create the following HTML structure:
(The class names are arbitrary and can be named as you wish)
```
<div class="slider">
    <div class="conent">
        <div class="pages"> SLIDE </div>
        <div class="pages"> SLIDE </div>
         <div class="pages"> SLIDE </div>
    </div>
</div>
```

You are going to have to add some CSS for your classes. *These are required* :
(The class names in the following css sample corresponds with the class names in the HTML sample above. So make sure to match the class names in your code)
```
.content {
    position: relative;
}

.pages {
    width: 100px; /*fixed width of your choosing*/
    float: left;
}

.slider {
    overflow: hidden;
}
```
If you wish to add next/prev buttons to the slider, you can add them as so:
( If you are using different class names for the buttons, pass them into the options object, which is mentioned below )
```
<div class="slider">
    <div class="ins-next"> > </div> /*can be floated right*/
    <div class="ins-prev"> < </div> /*can be floated left*/
    <div class="conent">
        <div class="pages"> SLIDE </div>
        <div class="pages"> SLIDE </div>
         <div class="pages"> SLIDE </div>
    </div>
</div>
```
### Installing

Initializing the slider is simple:
```
sQuery( ‘.slider’ ).slider( );
```

Options can be passed into the slider function:
```
sQuery( ‘.slider’ ).slider({
  sensitivity: 10,
  destroyOnInit: true
});
```

## Options

Here is a list of the options you can use to customize your slider:
(They are entirely optional. The options that are critical have default values)
```
activeSlidesCount: 5  /*Active slides visible to the user  (default= fills the available width)*/
slideCount:3 / *Number of slides to slide at a time (default=activeSlidesCount) */
sensitivity:20 /*Sensitivity of the slide (default=5)*/
offsetWidth:0/*offset width */
debounceTime:500 /*debouce delay for the next and prev buttons (default = 400ms)*/ 
slideTime:200 /*time of slide (ms) */
nextClass: ‘ins-next-arrow’ /*next arrow class*/
prevClass: ‘prev-next-arrow’ /*previous arrow class*/
disableClass: 'ins-disabled-this' /* disbale arrow class (default = ins-arrow-disabled) */
destroyOnInit: true   /* unbind all touch, mouse, key events before initing the slider. Don’t use if using multiple sliders on the same page */
```

## Extras

* Every active slide gets the class of 'active'
* The arrow buttons gets 'ins-arrow-disabled' class by default (can be changed with options) when the start or the end of slider is reached
* If you wish to reinit the slider more than once on the same page then make sure that *destroyOnInit* option is true

## Built With

* JavaScript
* jQuery ( sQuery )

## Contributing

All contributions welcome. Open a pull request to do so.

## Future

I'm writing unit tests as i get time

## Authors

* **Subhan Naeem** 

## License

This project is licensed under the MIT License 
