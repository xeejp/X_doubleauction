import React, { Component } from 'react'
import { LineChart } from 'react-d3-basic'

const DemandAndSupplyCurve = ({ orders }) => <LineChart
    data={[
        {x: 1, y: 1, z: 4},
        {x: 2, y: 2, z: 3},
        {x: 3, y: 3, z: 2},
        {x: 4, y: 4, z: 1}
    ]}
    chartSeries={[
        { name: "name", field: "y" },
        { name: "name", field: "z" }
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
