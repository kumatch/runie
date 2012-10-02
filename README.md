runie.js
===========

runie.js - deliver variables to front-end scripts by DOM base.


Usage
-----

###Browser with Jam (AMD support)

    $ jam install runie

```
<script src="jam/require.js"></script>
<script>
require(['runie'], function (runie) {
    var user = runie.read('user');
});
</script>
```


###Browser plain

```
<script type="text/javascript" src="runie-x.x.x.min.js"></script>
<script>
var user = runie.read('user');
</script>
```


###Node

    $ npm install runie

```javascript
var runie = require('runie');
```

And write a tag in your HTML contents. (ex. uses in Jade template)

```
h1= title

div
  p ...

!{runie.tag('user', user)}
```


License
--------

runie.js is licensed under the MIT License.

Copyright (c) 2012 Yosuke Kumakura

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.