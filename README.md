# codetaito

## Overview

Ever wanted a unique piece of abstract art? Or maybe your over people being able to see your room over zoom? codetaito allows you to download your own unique piece of abstract art.

## Learnt

I created this to learn react and canvas. I've enjoyed learning things like:

- Working with React Router
- React hooks (useState, useEffect, useLayoutEffect, useRef) and custom hooks (useDropdown)
- Had a lot of fun experimenting with canvas and seeing the impact of a state dependency on the canvas rendering

## Link

https://nimisaya.github.io/codetaito/

_Note: The microphone once started will continue to run. This is a known issue. Suggest looking at the microphone sketch last and closing the tab when done with it._

## Tech

- React, JS, CSS and HTML

## Features

- Select from multiple artworks
- Personalise your art by selecting from a range of colours or speaking into a microphone.


### Screenshots

Make a unique image by changing the colour / position of the items on the canvas using the color picker

<img src="https://raw.githubusercontent.com/nimisaya/codetaito/main/screenshots/codetaito_c.png" width="50%" alt="Wreath sketch">


Save your image as png

<img src="https://raw.githubusercontent.com/nimisaya/codetaito/main/screenshots/codetaito_saveImg.png" width="50%" alt="Save image">

Voice controlled (amplitude)

<img src="https://raw.githubusercontent.com/nimisaya/codetaito/main/screenshots/codetaito_mikehack.png" width="50%" alt="Voice controlled (amplitude)">



### Future features

- Set resolution suitable for printing
- Multiple format options
- Landing page for first time visitors (prior visits stored in localstorage)
- Explore graphic libraries e.g. p5.js and three.js
- Responsiveness
- Sketches are on their own canvas (with their own link) instead of being rendered to the same canvas. Began this work but decided to play with the microphone instead.
- Offset colours so control multiple colours on a sketch
- UI Controls for the microphone that enable the user to alter how the amplitude impacts the circle. 
- MORE sketches exploring the canvas more, re-learning more math
- Potentially seeing the math used to create a sketch in the UI

## Known bugs

- Non-responsive
- Needs DRYing
- Once you start the microphone there is no 'stop listening' enabled
- SetInterval needs to be changed to RequestAnimationFrame to improve performance and ensure when you aren't on that tab the animation is stopped
