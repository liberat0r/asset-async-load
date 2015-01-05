/**
 * Background cover image loader
 *
 * Loads the sources of elements async to the page load.
 * Use the following attributes
 *
 * data-asset-async-background-image for background images
 * data-asset-async-src-image for image sources
 * data-asset-async-src-video-source for video sources
 */
(function() {
	"use strict";


	function AssetAsyncLoad() {

		var self = this;


		self.$imageBackground = $("[data-asset-async-background-image]");
		self.$imageSrc = $("[data-asset-async-src-image]");
		self.$videoSourceSrc = $("[data-asset-async-src-video-source]");


		// Init
		self.start = function() {

			if (self.$imageBackground.length > 0) {
				self.$imageBackground.each(function() {

					$(this).css(
						{'background-image': 'url(\'' + $(this).attr('data-asset-async-background-image') + '\')'}
					);
				});
			}

			if (self.$imageSrc.length > 0) {
				self.$imageSrc.each(function() {

					$(this).attr('src', $(this).attr('data-asset-async-src-image'));
				});
			}

			if (self.$videoSourceSrc.length > 0) {
				self.$videoSourceSrc.each(function() {

					$(this).attr('src', $(this).attr('data-asset-async-src-video-source'));
				});
			}

		};


	}


	var _AssetAsyncLoad = new AssetAsyncLoad();


	$(function() {
		_AssetAsyncLoad.start();
	});

	
})();