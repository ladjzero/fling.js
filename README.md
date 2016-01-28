# fling.js
Inject this javascript to your webview and it reports scroll state of the webview, including `start`, `end` and `fling`.

## Demo
http://ladjzero.me/example/fling.js

Or scan the QR code

![image](/crcode.png)

## How to use
It calls window.onScrollStateChange once scroll state changes.
Possible states are `start`, `fling`, `end`.

Works on **chrome based** webview which can fire `touchend` event after `touchmove`.
For other webviews I have to listen to scroll event instead.
