// src/components/SalesChart.jsx
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

function SalesChart() {
  const salesData = useSelector((state) => state.monthSales);
  const d3Container = useRef(null);
  const [chartWidth, setChartWidth] = useState(getChartWidth());

  // A function that determines the chart width based on window.innerWidth
  function getChartWidth() {
    if (window.innerWidth < 400) {
      return Number(window.innerWidth - 50); // smaller screens
    } else if (window.innerWidth < 830) {
      return Number(window.innerWidth - 50); // medium screens
    } else {
      return 500; // larger screens
    }
  }
  // Update chart width on window resize
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

      // Sort data without mutating the original array
      const sortedSalesData = [...salesData].sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      );

      // X axis: scaleBand for discrete months
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(sortedSalesData.map((d) => d.month))
        .padding(0.2);

      // Append X axis and remove the bottom line (domain path)
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

      // Y axis: domain based on sales values
      const maxSales = d3.max(sortedSalesData, (d) => d.sales) * 1.1;
      const y = d3.scaleLinear().domain([0, maxSales]).range([height, 0]);

      // Generate tick values at intervals of 5000
      const tickValues = d3.range(0, maxSales, 5000);

      // Append Y axis with custom ticks and remove left axis line
      const yAxis = svg.append("g").call(
        d3
          .axisLeft(y)
          .tickValues(tickValues)
          .tickSize(0)
          .tickFormat((d) => d)
      );
      yAxis.select("path").remove();

      // Bars with custom fill color
      svg
        .selectAll("rect")
        .data(sortedSalesData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.month))
        .attr("y", (d) => y(d.sales))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.sales))
        .attr("fill", "rgb(41, 50, 176)");
    }
  }, [salesData, chartWidth]);

  return (
    <div id="my_dataviz" ref={d3Container} style={{ width: "100%" }}></div>
  );
}

export default SalesChart;
