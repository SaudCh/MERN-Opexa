import React, { useState } from 'react'
import Chart from "react-apexcharts";
function ChartPage() {
    const [state,setState] = useState({
      options: {
        chart: {
          id: "basic-bar"
        },
        markers: {
          size: 2,
      },
        xaxis: {
          categories: ['04 Feb', '07', '10', '13', '16', '19', '22', '25', '28','03 ']
        }
      },
      series: [
        {
          name: "Commissions",
          data: [0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0]
        }
      ]
    })
  return (
    <div>
        <div className="mixed-chart">
          <Chart
              options={state.options}
              series={state.series}
              marker = {state.markers}
              type="line"
              width="500"
            />
          </div>
    </div>
  )
}

export default ChartPage