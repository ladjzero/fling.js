# webview.on_scroll_listener
Inject this javascript to your webview and it will report scroll state of the webview.

## Demo
http://ladjzero.me/example/on_scroll_listener

Or scan the QR code

![image](/1441274409.png)

## How to use
It calls window.onScrollStateChange once scroll state changes.
Possible states are `start`, `fling`, `end`.

Works on **chrome based** webview which can fire `touchend` event after `touchmove`.
For other webviews I have to listen to scroll event instead.
