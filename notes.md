1. Insert result is going to have ops property.  use [0] out of ops array

  ```js
  function(error, result) {
    res.json(result.ops[0])
  }
  ```
  if req.body is already valid document, just insert req.body.

  if handling errors in routes, pay attention to http error codes

  use jquery consistently if you are using it for DOM selection

  prevent default on form submit

  listen for submit event on form instead of the button

  make sure route resources match collections

  ALWAYS USE A LINTER

  Don't code ahead
