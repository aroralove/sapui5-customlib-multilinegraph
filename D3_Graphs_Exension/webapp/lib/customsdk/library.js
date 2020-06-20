sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/library'
],  function(jQuery, library) {
	"use-strict";
	/**
	 * Suite controls library.
	 *
	 * @namespace
	 * @name mylib.graph
	 * @author 
	 * @version ${version}
	 * @public
	 */

	// delegate further initialization of this library to the Core
	var customlib={};
	sap.ui.getCore().initLibrary({
		name : "customlib.graph",
		noLibraryCSS: true,
		version: "${version}",
		dependencies : ["sap.ui.core", "sap.m"],
		types: [],
		interfaces: [],
		controls: [
			"customlib.graph.MultiLineGraph"
		],
		elements: []
	});

	return customlib.graph;

}, /* bExport= */ false);
