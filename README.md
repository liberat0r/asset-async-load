Asset Async Load
================

<<<<<<< HEAD
JQuery plugin that helps you load the sources of elements async to the page load by using data attributes. Also there is an option for loading responsive sources by setting all sources in the same attributes as follows:

```
[IMAGE|MIN_WINDOW_WIDTH], [OTHER IMAGE|LARGER_MIN_WIDTH], [DEFAULT_IMAGE]
```
=======
JQuery plugin that loads the sources of elements async to the page load by using a few data attributes.
>>>>>>> f23aae921bdd06a86ec309da7c35b13e5b9f04e9

__Attributes__
- [data-asset-async-background-image] for background images
- [data-asset-async-src-image] for image sources
- [data-asset-async-src-video-source] for video sources

__Examples__
```
<img data-asset-async-src-image="test.jpg" />

<div data-asset-async-background-image="test.jpg"></div>

<video>
  <source data-asset-async-src-video-source="test.mp4"></source>
  <source data-asset-async-src-video-source="test.ogv"></source>
</video>

<img data-asset-async-src-image="[http://placehold.it/600x200|1000], [http://placehold.it/1600x400|1600], [http://placehold.it/1900x200]" alt="" />
```
