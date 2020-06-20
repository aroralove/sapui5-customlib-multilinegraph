sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sample.custom.graph.D3_Graphs_Exension.controller.RenderGraph", {
		onInit: function(evt) {
			var data = [
				{
				  name: "India",
				  values: [
					{date: "2000", value: "100"},
					{date: "2001", value: "110"},
					{date: "2002", value: "145"},
					{date: "2003", value: "241"},
					{date: "2004", value: "101"},
					{date: "2005", value: "90"},
					{date: "2006", value: "10"},
					{date: "2007", value: "35"},
					{date: "2008", value: "21"},
					{date: "2009", value: "201"}
				  ]
				},
				{
				  name: "Germany",
				  values: [
					{date: "2000", value: "200"},
					{date: "2001", value: "120"},
					{date: "2002", value: "33"},
					{date: "2003", value: "21"},
					{date: "2004", value: "51"},
					{date: "2005", value: "190"},
					{date: "2006", value: "120"},
					{date: "2007", value: "85"},
					{date: "2008", value: "221"},
					{date: "2009", value: "101"}
				  ]
				},
				{
				  name: "USA",
				  values: [
					{date: "2000", value: "50"},
					{date: "2001", value: "10"},
					{date: "2002", value: "5"},
					{date: "2003", value: "71"},
					{date: "2004", value: "20"},
					{date: "2005", value: "9"},
					{date: "2006", value: "220"},
					{date: "2007", value: "235"},
					{date: "2008", value: "61"},
					{date: "2009", value: "10"}
				  ]
				}
			  ];
			this.getView().byId('mychart').initializeData(data);
		}
	});
});