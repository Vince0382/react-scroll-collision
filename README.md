# react-scroll-collision 

[![npm version](https://badge.fury.io/js/react-scroll-collision.svg)](https://badge.fury.io/js/react-scroll-collision)

A react component that provide a High Order Component to wrap fixed element that have to cross different color section.

## Getting Started

A new class will be added to the wrapped element when entering in specific section. You will be able that way to change text color, svg fill or stroke color or whatever you want by only set css paramters into the provided className.

To identify specific section, just put "data-clipthru=" followed by the class name you want to assign to the wrapped element. 

This project was inspired by https://github.com/salsita/jq-clipthru and is fully developped with React (PureComponent with state management).

No JQuery.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm install --save react-scroll-collision
```

## Usage

```
import ReactScrollCollision from 'react-scroll-collision'; // The import name is up to you 
```

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ScrollCollision from 'react-scroll-collision';

const App = () => (
    <div>
        <ScrollCollision className="Elem1">Test element fixed bottom left</ScrollCollision>
        <ScrollCollision className="Elem2">Top center</ScrollCollision>
        <ScrollCollision className="Elem3">Bottom Right</ScrollCollision>

        <div className="Block-White">
          
        </div>
        <div className="Block-Black" data-clippath="ColorWhite">
        
        </div>
        <div className="Block-White">
        
        </div>
        <div className="Block-Black" data-clippath="ColorGray">
        
        </div>
        <div className="Block-White">
        
        </div>
      </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

.Block-White,
.Block-Black {
  width: 100%;
  height: 50vh;
}

.Block-White {
  background: white;
}

.Block-Black {
  background: black;
}

.ColorWhite{
  color: white;
  fill: white;
}

.ColorGray{
  color: lightgray;
  fill:gray;
}

.Elem1 {
  position: fixed;
  top: 25%;
  left: 10%;
  height: 20px;
  width: 300px;
}

.Elem2 {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  height: 17px;
  width: 150px;
}

.Elem3 {
  position: fixed;
  top: 25%;
  right: 10%;
  height: 20px;
  width: 150px;
}

.ElemSVG {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
  width: 100px;
}

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
