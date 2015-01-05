Asset Async Load
================

JQuery plugin that helps you load the sources of elements async to the page load by using a few data attributes.

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
```
