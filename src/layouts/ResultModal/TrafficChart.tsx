import { useEffect, useRef } from "react";
import { AvgStoreTraffic } from "../../data/sample-data";
import capitalize from "../../utils/capitalize";
import Chart from "chart.js/auto";
import palette from "../../theme/palette";

// Ordering here determines the ordering of the chart datapoints
const DAY_LIST: (keyof AvgStoreTraffic)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

type TrafficChartProps = {
  avgStoreTraffic: AvgStoreTraffic;
};

export default function TrafficChart({ avgStoreTraffic }: TrafficChartProps) {
  const chartElRef = useRef<HTMLCanvasElement | null>(null);
  // Track initialied state to prevent crash when React.StrictMode renders twice in dev env
  const chartInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    const chartEl = chartElRef.current;
    const initialized = chartInitializedRef.current;

    if (chartEl && !initialized) {
      const todayIdx = new Date().getDay();

      new Chart(chartEl, {
        type: "bar",
        data: {
          labels: DAY_LIST.map((day) => capitalize(day.slice(0, 3) + ".")),
          datasets: [
            {
              data: DAY_LIST.map((day) => avgStoreTraffic[day]),
              backgroundColor: DAY_LIST.map((_, idx) =>
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
                  const day = DAY_LIST[dataIndex];
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

      chartInitializedRef.current = true;
    }
  }, [avgStoreTraffic]);

  return <canvas ref={chartElRef} />;
}
