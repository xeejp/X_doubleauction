import React, { Component } from 'react'
import { LineChart } from 'react-d3-basic'

const DemandAndSupplyCurve = ({ data }) => <LineChart
    data={data}
    chartSeries={[
        { name: "Demand", field: "demand" },
        { name: "Supply", field: "supply" }
    ]}
    x={(d) => d.x}
/>

const PriceCurve = ({ prices }) => <LineChart
    data={ prices }
    chartSeries={[
        { name: "Price", field: "price" }
    ]}
    x={(d) => d.timestamp}
/>

export { DemandAndSupplyCurve, PriceCurve }
