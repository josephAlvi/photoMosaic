# photoMosaic
photomosaic
---------------
Purpose:
The goal of this piece of code is to demonstrate the use of making a number of asynchronous calls to fetch data
and then perform actions once all the data is received from a particular sequence of asynchronous calls by taking care of ordering 
of the underlying asynchronous operations. This is done assuming ES5 i.e. without using ES6 promise.all feature which makes it quite 
easier. 

Client Side:
=> user uploads local image file
=> The app loads that image, divides the image into tiles, computes the average
   color of each tile, fetches a tile from the server for that color, and
   composites the results into a photomosaic of the original image.
=> The composited photomosaic is displayed according to the following
   constraints:
    - tiles are rendered a complete row at a time
    - the mosaic should be rendered from the top row to the bottom row.
=> The client makes effective use of parallelism and asynchrony.

Server Side:
=> it is a lightweight server node js server
=> it servers the client side with the tile images of the asked color (the average color)
=> The tile size is configurable in js/config.js.

To Run:
=> at root directory type npm start

Requires;
=> node js

Disclaimer:
=> This is NOT a production quality project 
=> The intention of this repository is to demonstrate the handling of data returned by a number of asynchronous calls in a way that 
we only render each tile on screen once all tile columns of the row have succesfully returned from asynchronous call. 
