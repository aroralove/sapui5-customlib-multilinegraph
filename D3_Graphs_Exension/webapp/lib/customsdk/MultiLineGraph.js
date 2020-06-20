
/*
 * A simple UI5 control wrapping the HTML5 media API
 * allowing the library user to easily take Pictures in javascript
 * very easily. The control renders a Video preview element
 * (technically a video html tag). When clicked the image is grabbed
 * as a base64 encoded PNG. In the future would be nice to have the
 * format configurable.
 */
sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/Control',
    'com/sample/custom/graph/D3_Graphs_Exension/lib/customD3/core/d3.v4.min'
],
    function (jQuery, Control) {
        "use strict";

        /**
         * Constructor for a new Camera control.
         *
         * @param {string} [sId] id for the new control, generated automatically if no id is given
         * @param {object} [mSettings] initial settings for the new control
         *
         * @class
         *
         * @public
         * @alias customlib.graph.multilinegraph
         */
        var graph = Control.extend("customlib.graph.MultiLineGraph", {
            /**
             * Control API
             */
            metadata: {
                properties: {

                    "id": {
                        type: "string",
                        defaultValue: ""
                    },

                    "width": {
                        type: "string",
                        defaultValue: "640"
                    },

                    /**
                     * Height of the preview window in pixels
                     */
                    "height": {
                        type: "string",
                        defaultValue: "480"
                    }

                },
                events: {

                }
            },

            /**
             * Lifecycle hook to initialize the control
             */
            init: function () {
                var that = this;
                this._data = {}; // Is the control displaying video at the moment?
            },

            initializeData: function (oData) {
                this._data = oData;
            },

            renderGraph: function (data) {
                var width = 500;
                var height = 300;
                var margin = 50;
                var duration = 250;

                var lineOpacity = "0.25";
                var lineOpacityHover = "0.85";
                var otherLinesOpacityHover = "0.1";
                var lineStroke = "1.5px";
                var lineStrokeHover = "2.5px";

                var circleOpacity = '0.85';
                var circleOpacityOnLineHover = "0.25"
                var circleRadius = 3;
                var circleRadiusHover = 6;


                /* Format Data */
                var parseDate = d3.timeParse("%Y");
                data.forEach(function (d) {
                    d.values.forEach(function (d) {
                        d.date = parseDate(d.date);
                        d.value = +d.value;
                    });
                });


                /* Scale */
                var xScale = d3.scaleTime()
                    .domain(d3.extent(data[0].values, d => d.date))
                    .range([0, width - margin]);

                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(data[0].values, d => d.value)])
                    .range([height - margin, 0]);

                var color = d3.scaleOrdinal(d3.schemeCategory10);

                /* Add SVG */
                var svg = d3.select("#"+this.getId()).append("svg")
                    .attr("width", (width + margin) + "px")
                    .attr("height", (height + margin) + "px")
                    .append('g')
                    .attr("transform", `translate(${margin}, ${margin})`);


                /* Add line into SVG */
                var line = d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.value));

                let lines = svg.append('g')
                    .attr('class', 'lines');

                lines.selectAll('.line-group')
                    .data(data).enter()
                    .append('g')
                    .attr('class', 'line-group')
                    .on("mouseover", function (d, i) {
                        svg.append("text")
                            .attr("class", "title-text")
                            .style("fill", color(i))
                            .text(d.name)
                            .attr("text-anchor", "middle")
                            .attr("x", (width - margin) / 2)
                            .attr("y", 5);
                    })
                    .on("mouseout", function (d) {
                        svg.select(".title-text").remove();
                    })
                    .append('path')
                    .attr('class', 'line')
                    .attr('d', d => line(d.values))
                    .style('stroke', (d, i) => color(i))
                    .style('opacity', lineOpacity)
                    .on("mouseover", function (d) {
                        d3.selectAll('.line')
                            .style('opacity', otherLinesOpacityHover);
                        d3.selectAll('.circle')
                            .style('opacity', circleOpacityOnLineHover);
                        d3.select(this)
                            .style('opacity', lineOpacityHover)
                            .style("stroke-width", lineStrokeHover)
                            .style("cursor", "pointer");
                    })
                    .on("mouseout", function (d) {
                        d3.selectAll(".line")
                            .style('opacity', lineOpacity);
                        d3.selectAll('.circle')
                            .style('opacity', circleOpacity);
                        d3.select(this)
                            .style("stroke-width", lineStroke)
                            .style("cursor", "none");
                    });


                /* Add circles in the line */
                lines.selectAll("circle-group")
                    .data(data).enter()
                    .append("g")
                    .style("fill", (d, i) => color(i))
                    .selectAll("circle")
                    .data(d => d.values).enter()
                    .append("g")
                    .attr("class", "circle")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .style("cursor", "pointer")
                            .append("text")
                            .attr("class", "text")
                            .text(`${d.value}`)
                            .attr("x", d => xScale(d.date) + 5)
                            .attr("y", d => yScale(d.value) - 10);
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .style("cursor", "none")
                            .transition()
                            .duration(duration)
                            .selectAll(".text").remove();
                    })
                    .append("circle")
                    .attr("cx", d => xScale(d.date))
                    .attr("cy", d => yScale(d.value))
                    .attr("r", circleRadius)
                    .style('opacity', circleOpacity)
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr("r", circleRadiusHover);
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr("r", circleRadius);
                    });


                /* Add Axis into SVG */
                var xAxis = d3.axisBottom(xScale).ticks(5);
                var yAxis = d3.axisLeft(yScale).ticks(5);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0, ${height - margin})`)
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append('text')
                    .attr("y", 15)
                    .attr("transform", "rotate(-90)")
                    .attr("fill", "#000")
                    .text("Total values");
            },

            onAfterRendering: function () {
                var data = this._data;
                if (data.length > 0) {
                    this.renderGraph(data);
                } else {
                    this.renderGraphNoData();
                }
            }
        });
        return graph;
    });
