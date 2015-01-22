/**
 * Asset Async Load
 *
 * Loads the sources of elements async to the page load.
 * Use the following attributes
 *
 * data-asset-async-background-image for background images
 * data-asset-async-src-image for image sources
 * data-asset-async-src-video-source for video sources
 *
 * The values accepted are either single source files or array of files
 * [file|max-width in pixels], ... [other file|max-width in pixels], [file]
 *
 * Use noscript tags as fallback
 *
 */
(function(name, definition) {
	var theModule = definition(),
	// this is considered "safe":
		hasDefine = typeof define === "function" && define.amd,
	// hasDefine = typeof define === "function",
		hasExports = typeof module !== "undefined" && module.exports;

	if (hasDefine) { // AMD Module
		define(theModule);
	} else if (hasExports) { // Node.js Module
		module.exports = theModule;
	} else { // Assign to common namespaces or simply the global object (window)
		( this.jQuery || this.ender || this.$ || this)[name] = theModule;
	}

	// Start
	theModule.init();

})("AssetAsyncLoad", function() {
	var module = this;

	// Private Variables

	// JQuery Objects
	module.$window = $(window);
	module.$imageBackground = $("[data-asset-async-background-image]");
	module.$imageSrc = $("[data-asset-async-src-image]");
	module.$videoSourceSrc = $("[data-asset-async-src-video-source]");

	module.responsiveElementsCount = 0;

	module.responsiveSourcesById = [];

	// Private Methods

	// Is return true if valid images array
	module.isValidImagesArray = function(attr) {

		attr = attr.trim();

		if (attr.substr(0, 1) === '[' && attr.substr(-1) === ']') {
			return true;
		} else {
			return false;
		}
	};

	// Return array of images from atrtibute string
	module.getSourcesFromAttribute = function(attr) {

		var sourcesArray = [];
		var stringsArray = attr.split(']');

		for (var i = 0; i < stringsArray.length; i++) {
			var cleanString = stringsArray[i].replace(/^\s+|\s+$/g, '');
			cleanString = cleanString.substr(1, cleanString.length);
			cleanString = cleanString.replace('[', '');

			if (cleanString.indexOf('|') > 0) {
				var sourceOptions = cleanString.split('|');
				sourcesArray[sourceOptions[1].trim()] = sourceOptions[0];
			} else if (cleanString !== '') {
				sourcesArray['default'] = cleanString;
			}
		}

		return sourcesArray;
	};

	// Apply appropriate responsive source
	module.applyResponsiveSource = function($el, assetAsyncAttributeName) {

		var elementResponsiveId = null;

		if (typeof $el.attr('data-asset-async-responsive-id') === 'undefined') {
			// Give this element an ID
			$el.attr('data-asset-async-responsive-id', module.responsiveElementsCount);
			// Cache this element's source object
			module.responsiveSourcesById[module.responsiveElementsCount] = module.getSourcesFromAttribute($el.attr(assetAsyncAttributeName));
			elementResponsiveId = module.responsiveElementsCount;
		} else {
			elementResponsiveId = $el.attr('data-asset-async-responsive-id');
		}

		if (typeof assetAsyncAttributeName === 'undefined') {
			// Check all types typeof
			if (typeof $el.attr('data-asset-async-background-image') !== 'undefined') {
				assetAsyncAttributeName = 'data-asset-async-background-image';
			} else if (typeof $el.attr('data-asset-async-src-image') !== 'undefined') {
				assetAsyncAttributeName = 'data-asset-async-src-image';
			} else if (typeof $el.attr('data-asset-async-src-video-source') === 'undefined') {
				assetAsyncAttributeName = 'data-asset-async-src-video-source';
			}
		}

		var responsiveSourceProperty = 0; // Number.MAX_VALUE Init to the largest possible number
		var responsiveSource = module.responsiveSourcesById[elementResponsiveId]['default'];

		// Traverse responsive source options
		for (var windowMaxWidth in module.responsiveSourcesById[elementResponsiveId]) {

			if (windowMaxWidth !== 'default') {

				windowMaxWidth = parseInt(windowMaxWidth);

				if (responsiveSourceProperty === 0) {
					responsiveSourceProperty = windowMaxWidth;
				}

				// Check if this source should be used
				if (responsiveSourceProperty <= windowMaxWidth &&
					module.$window.width() < windowMaxWidth) {

					responsiveSourceProperty = windowMaxWidth;
					responsiveSource = module.responsiveSourcesById[elementResponsiveId][responsiveSourceProperty];

					break;
				}
			}
		}

		if (assetAsyncAttributeName === 'data-asset-async-background-image') {
			// Set the css style background
			$el.css(
				{'background-image': 'url(\'' + responsiveSource + '\')'}
			);
		} else {
			// Set the src of video source or img
			$el.attr('src', responsiveSource);
		}

	};


	return {

		// Public Variables


		// Public Methods

		// Initialize Plugin
		init: function() {
			"use strict";

			// On resize check if responsive sources exist
			module.$window.on('resize', function() {

				var $responsiveElements = $("[data-asset-async-responsive-id]");

				if ($responsiveElements.length > 0) {
					$responsiveElements.each(function() {
						module.applyResponsiveSource($(this));
					});
				}
			});

			// Background images
			if (module.$imageBackground.length > 0) {
				module.$imageBackground.each(function() {

					var elementAttribute = $(this).attr('data-asset-async-background-image');

					if (module.isValidImagesArray(elementAttribute)) {
						module.applyResponsiveSource($(this), 'data-asset-async-background-image');
						module.responsiveElementsCount++;
					} else {
						$(this).css(
							{'background-image': 'url(\'' + elementAttribute + '\')'}
						);
					}

				});
			}

			// Image source
			if (module.$imageSrc.length > 0) {
				module.$imageSrc.each(function() {

					var elementAttribute = $(this).attr('data-asset-async-src-image');

					if (module.isValidImagesArray(elementAttribute)) {
						module.applyResponsiveSource($(this), 'data-asset-async-src-image');
						module.responsiveElementsCount++;
					} else {
						$(this).attr('src', elementAttribute);
					}

				});
			}

			// Video element with sources that have src
			if (module.$videoSourceSrc.length > 0) {
				module.$videoSourceSrc.each(function() {

					var elementAttribute = $(this).attr('data-asset-async-src-video-source');

					if (module.isValidImagesArray(elementAttribute)) {
						module.applyResponsiveSource($(this), 'data-asset-async-src-video-source');
						module.responsiveElementsCount++;
					} else {
						$(this).attr('src', elementAttribute);
					}

				});
			}
		}


	};


});