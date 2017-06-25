# Slider
A simple slider for desktop, mobile and tablet. Tested on chrome, firefox, safari, internet explorer, android browser and mobile safari.

## Getting Started

Add this code to free js if you are using this in multiple places.

### Prerequisites

You are going to have to create the following HTML structure:

```
<div class="slider">
    <div class="conent">
        <div class="pages"> SLIDE </div>
        <div class="pages"> SLIDE </div>
         <div class="pages"> SLIDE </div>
    </div>
</div>
```
The class names are arbitrary and can be named as you wish.

You are going to have to add some CSS for your classes. *These are required*
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
The class names in the above css sample corresponds with the class names in the HTML sample above. So make sure to match the class names in your code. 


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
End with an example of getting some data out of the system or using it for a little demo

## Options

Here is a list of the options you can use to customize your slider

```
activeSlidesCount: 5  /*Active slides visible to the user  (default= fills the available width)*/
slideCount:3 / *Number of slides to slide at a time (default=activeSlidesCount) */
sensitivity:20 /*Sensitivity of the slide (default=5)*/
offsetWidth:0/*offset width */
debounceTime:500 /*debouce delay for the next and prev buttons (default = 400ms)*/ 
slideTime:200 /*time of slide (ms) */
nextClass: ‘ins-next-arrow’ /*next arrow class*/
prevClass: ‘prev-next-arrow’ /*previous arrow class*/
destroyOnInit: true   /* unbind all touch, mouse, key events before initing the slider. Don’t use if using multiple sliders on the same page */
```


## Built With

* JavaScript
* jQuery ( sQuery )

## Contributing

All contributions welcome. Open a pull request to do so.

## Authors

* **Subhan Naeem** 

## License

This project is licensed under the MIT License 
