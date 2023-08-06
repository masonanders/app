import { useEffect, useRef } from "react";
import { AvgStoreTraffic } from "../../data/sample-data";
import capitalize from "../../utils/capitalize";
import Chart from "chart.js/auto";
import palette from "../../theme/palette";

type TrafficChartProps = {
  avgStoreTraffic: AvgStoreTraffic;
};

// Ordering here determines the ordering of the chart datapoints
const dayList: (keyof AvgStoreTraffic)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function TrafficChart({ avgStoreTraffic }: TrafficChartProps) {
  const chartElRef = useRef<HTMLCanvasElement | null>(null);
  const chartIdRef = useRef<string | null>(null);

  useEffect(() => {
    const chartEl = chartElRef.current;
    const chartId = chartIdRef.current;
    if (chartEl && chartId === null) {
      const todayIdx = new Date().getDay();

      const chart = new Chart(chartEl, {
        type: "bar",
        data: {
          labels: dayList.map((day) => capitalize(day.slice(0, 3) + ".")),
          datasets: [
            {
              data: dayList.map((day) => avgStoreTraffic[day]),
              backgroundColor: dayList.map((_, idx) =>
                idx === todayIdx ? palette.secondary() : palette.primary()
              ),
              borderRadius: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: { text: "Average Daily Traffic", display: true },
            tooltip: {
              titleAlign: "center",
              bodyAlign: "center",
              padding: 8,
              displayColors: false,
              callbacks: {
                title: ([{ dataIndex }]) => {
                  const day = dayList[dataIndex];
                  let title = `${capitalize(day)}${
                    dataIndex === todayIdx ? " (today)" : ""
                  }`;
                  // Give extra width to tooltips with shorter day lengths (chartjs does not support tooltip minWidth or x-padding)
                  if (title.length === 6) title = " " + title + " ";
                  return title;
                },
              },
            },
          },
        },
      });
      chartIdRef.current = chart.id;
    }
  }, [avgStoreTraffic]);

  return <canvas ref={chartElRef} />;
}
