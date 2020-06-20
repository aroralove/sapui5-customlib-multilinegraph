sap.ui.define([],
	          function() {
	              "use strict";

	              /**
	               * @namespace mylib.graph
	               */
	              var MultiLineGraphRenderer = {};

	              /**
	               * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
	               *
	               * @param {sap.ui.core.RenderManager} oRm RenderManager object
	               * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
	               */
	              MultiLineGraphRenderer.render = function(oRm, oControl) {
		              oRm.write("<div");
		              oRm.writeControlData(oControl);
		              oRm.writeClasses();
		              oRm.writeStyles();
		              oRm.write(">");
	              };

	              return MultiLineGraphRenderer;

              }, /* bExport= */ true);
