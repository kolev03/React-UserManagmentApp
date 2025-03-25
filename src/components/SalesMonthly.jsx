// src/components/SalesChart.jsx
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

function SalesChart() {
  const salesData = useSelector((state) => state.monthSales);
  const d3Container = useRef(null);

  useEffect(() => {
    if (salesData && d3Container.current) {
      // Clear any previous SVG
      d3.select(d3Container.current).select("svg").remove();

      // Set dimensions and margins
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // Append SVG
      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // Set global font-family for the SVG text elements
        .attr("font-family", "Raleway, sans-serif")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Define new month order (June -> December)
      const monthOrder = [
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Separate and sort data by product type
      const higherData = salesData
        .filter((d) => d.type === "higher")
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );
      const lowerData = salesData
        .filter((d) => d.type === "lower")
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

      // X axis: scaleBand for discrete months
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(salesData.map((d) => d.month))
        .padding(0.2);

      // Append X axis and remove the bottom line (domain path)
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
      xAxis.select("path").remove(); // Remove axis line
      xAxis.selectAll("line").remove(); // Remove tick lines

      xAxis
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis: domain based on sales values
      const maxSales = d3.max(salesData, (d) => d.sales) * 1.1;
      const y = d3.scaleLinear().domain([0, maxSales]).range([height, 0]);

      // Generate tick values at intervals of 5000
      const tickValues = d3.range(0, maxSales, 5000);

      // Append Y axis with custom ticks and remove left axis line
      const yAxis = svg.append("g").call(
        d3
          .axisLeft(y)
          .tickValues(tickValues)
          .tickSize(0) // Remove tick lines
          .tickFormat((d) => d)
      );
      yAxis.select("path").remove(); // Remove the left axis line

      // Bars with custom fill color: rgb(19,203,216)
      svg
        .selectAll("rect")
        .data(salesData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.month))
        .attr("y", (d) => y(d.sales))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.sales))
        .attr("fill", "rgb(19,203,216)");
    }
  }, [salesData]);

  return <div id="my_dataviz" ref={d3Container}></div>;
}

export default SalesChart;
