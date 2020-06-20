/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sample/custom/graph/D3_Graphs_Exension/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});