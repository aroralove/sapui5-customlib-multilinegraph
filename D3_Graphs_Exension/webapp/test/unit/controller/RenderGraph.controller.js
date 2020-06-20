/*global QUnit*/

sap.ui.define([
	"com/sample/custom/graph/D3_Graphs_Exension/controller/RenderGraph.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RenderGraph Controller");

	QUnit.test("I should test the RenderGraph controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});