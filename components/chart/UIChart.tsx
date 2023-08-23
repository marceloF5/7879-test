import {
  AreaStyleOptions,
  ChartOptions,
  createChart,
  DeepPartial,
  SeriesOptionsCommon,
} from "lightweight-charts";
import React from "react";
import { IPortfolio } from "../../types/Portfolio";
import { subscribeToUpdates } from "../../util/datastream";

const chartOptions: DeepPartial<ChartOptions> = {
  height: 400,
  rightPriceScale: {
    scaleMargins: {
      top: 0.2,
      bottom: 0.2,
    },
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
  },
  layout: {
    backgroundColor: "#326985",
    textColor: "#ffffff",
  },
  grid: {
    horzLines: {
      color: "#eee",
      visible: false,
    },
    vertLines: {
      color: "#ffffff",
      visible: false,
    },
  },
  crosshair: {
    vertLine: {
      labelVisible: false,
    },
  },
};

const seriesOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
  topColor: "rgba(125, 162, 181, 0.7)",
  bottomColor: "rgba(125, 162, 181, 0.7)",
  lineColor: "rgba(125, 162, 181, 0.7)",
  lineWidth: 2,
};

export const UIChart = (props: {
  portfolio: IPortfolio;
  streamUrl: string;
}) => {
  const chartRef = React.useRef<any>();
  const [prices, setPrices] = React.useState({
    XAU: {
      value: 47.9744,
      diff: -0.0022999999999981924,
    },
    XPT: {
      value: 24.5031,
      diff: -0.0030999999999998806,
    },
    goldPrice: 47.9744,
    platinumPrice: 24.5031,
  });

  React.useEffect(() => {
    subscribeToUpdates(
      props.streamUrl,
      (data) => {
        setPrices(data);
      },
      (data) => {
        setPrices(data);
      }
    );
  }, [props.streamUrl]);

  const chartData = React.useMemo(
    () =>
      props.portfolio.history.map((i) => ({
        time: i.date,
        value: i.totalValue.amount,
      })),
    [props.portfolio]
  );

  React.useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current.clientWidth });
      chart.timeScale().fitContent();
    };

    const chart = createChart(chartRef.current, {
      ...chartOptions,
      width: chartRef.current.clientWidth,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries(seriesOptions);
    newSeries.setData(chartData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [chartData]);

  return (
    <div className="bg-[#326985]">
      <div className="flex flex-col justify-between px-12 py-12 text-white border-b border-white  sm:flex-row">
        <span className="text-2xl">Your portfolio</span>
        <div className="flex flex-col sm:items-end">
          <span className="text-2xl">
            £{" "}
            {props.portfolio.currentBalance.goldBalance * prices.goldPrice +
              props.portfolio.currentBalance.platinumBalance *
                prices.platinumPrice}
          </span>
          <span className="text-xs">
            £{" "}
            {props.portfolio.currentBalance.goldBalance * prices.goldPrice +
              props.portfolio.currentBalance.platinumBalance *
                prices.platinumPrice}
          </span>
        </div>
      </div>
      <div ref={chartRef} />
    </div>
  );
};

export default UIChart;
