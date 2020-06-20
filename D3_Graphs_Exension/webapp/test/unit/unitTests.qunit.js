/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sample/custom/graph/D3_Graphs_Exension/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});