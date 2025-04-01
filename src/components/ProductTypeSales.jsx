// src/components/SalesChart.jsx
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

function SalesChart() {
  const salesData = useSelector((state) => state.sales);
  const d3Container = useRef(null);
  const [chartWidth, setChartWidth] = useState(getChartWidth());

  // Helper function to determine the chart width based on window size
  function getChartWidth() {
    if (window.innerWidth < 400) {
      return Number(window.innerWidth - 50); // smaller screens
    } else if (window.innerWidth < 830) {
      return Number(window.innerWidth - 50); // medium screens
    } else {
      return 500; // larger screens
    }
  }

  // Update chart width when the window resizes
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(getChartWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (salesData && d3Container.current) {
      // Clear any previous SVG
      d3.select(d3Container.current).select("svg").remove();

      // Set dimensions and margins
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = chartWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // Append SVG container
      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
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

      // Create copies of the arrays and sort them so as not to mutate the state
      const higherData = [...salesData]
        .filter((d) => d.type === "higher")
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );
      const lowerData = [...salesData]
        .filter((d) => d.type === "lower")
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

      // X scale: scaleBand for discrete months
      const x = d3
        .scaleBand()
        .domain(salesData.map((d) => d.month))
        .range([0, width])
        .padding(0.2);

      // Append X axis and remove unwanted lines/ticks
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
      xAxis.select("path").remove();
      xAxis.selectAll("line").remove();
      xAxis
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y scale: from 0 to max sales
      const maxSales = d3.max(salesData, (d) => d.sales) * 1.1;
      const y = d3.scaleLinear().domain([0, maxSales]).range([height, 0]);

      // Generate tick values at intervals of 5000
      const tickValues = d3.range(0, maxSales, 5000);

      // Append Y axis with custom ticks and remove the left axis line
      const yAxis = svg.append("g").call(
        d3
          .axisLeft(y)
          .tickValues(tickValues)
          .tickSize(0)
          .tickFormat((d) => d)
      );
      yAxis.select("path").remove();

      // Line & area generators using curveCardinal for smooth curves.
      // We use x(d.month) + x.bandwidth()/2 to center the data points in each band.
      const lineGenerator = d3
        .line()
        .x((d) => x(d.month) + x.bandwidth() / 2)
        .y((d) => y(d.sales))
        .curve(d3.curveCardinal.tension(0.5));

      const areaGenerator = d3
        .area()
        .x((d) => x(d.month) + x.bandwidth() / 2)
        .y0(y(0))
        .y1((d) => y(d.sales))
        .curve(d3.curveCardinal.tension(0.5));

      // "Higher" area & line (same color: #13cbd8)
      svg
        .append("path")
        .datum(higherData)
        .attr("fill", "#13cbd8")
        .attr("opacity", 0.6)
        .attr("stroke", "#13cbd8")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", areaGenerator);

      svg
        .append("path")
        .datum(higherData)
        .attr("fill", "none")
        .attr("stroke", "#13cbd8")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

      // "Lower" area & line (color: #9dfcd1)
      svg
        .append("path")
        .datum(lowerData)
        .attr("fill", "#9dfcd1")
        .attr("opacity", 0.6)
        .attr("stroke", "#9dfcd1")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", areaGenerator);

      svg
        .append("path")
        .datum(lowerData)
        .attr("fill", "none")
        .attr("stroke", "#9dfcd1")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

      // Handmade legend (optional)
      svg
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 30)
        .attr("r", 6)
        .style("fill", "#13cbd8");
      svg
        .append("text")
        .attr("x", 320)
        .attr("y", 30)
        .text("Higher")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");

      svg
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 60)
        .attr("r", 6)
        .style("fill", "#9dfcd1");
      svg
        .append("text")
        .attr("x", 320)
        .attr("y", 60)
        .text("Lower")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    }
  }, [salesData, chartWidth]);

  return (
    <div
      id="my_dataviz"
      ref={d3Container}
      style={{ width: "100%" }} // ensures the container is responsive
    ></div>
  );
}

export default SalesChart;
