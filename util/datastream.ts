/*
    This file  wraps up the complexity of the data stream from Xignite
    Documentation for this feed is available here: https://www.xignite.com/product/CloudStreaming#/DeveloperResources/request/XigniteGlobalMetals/GetRealTimeMetalQuotes

    Please feel free to modify this in any way you wish.

    The initial view of how to use utility is:

    const streamurl = await getStreamingUrl()
    const onConnect = (data: RealTimePriceQuote) => {
        // receive initial data from stream
    }

    const onUpdate = (data: RealTimePriceQuote) => {
        // receive updated data from stream
    }
    subscribeToUpdates(streamUrl, onConnect, onUpdate)
 */

import { applyPatch } from "fast-json-patch";
import {
  IMetalSymbols,
  IXIgnitePrice,
  RealTimePriceQuote,
  XIgniteEvent,
  XigniteMetalSymbols,
} from "../types/MetalStream";

const PRECISION = 10;

const mapXIgniteToData = (
  prev: RealTimePriceQuote,
  data: IXIgnitePrice[]
): RealTimePriceQuote => {
  const prices = data.reduce((acc, d) => {
    const gram = Math.round(d.Mid * PRECISION) / (PRECISION * 1000);
    return {
      ...acc,
      [d.Symbol.replace("KG", "")]: {
        value: gram,
        diff:
          gram - prev?.[d.Symbol.replace("KG", "") as IMetalSymbols]?.value ||
          0,
      },
    };
  }, {} as RealTimePriceQuote);

  return {
    ...prices,
    goldPrice: prices[IMetalSymbols.GOLD]?.value,
    platinumPrice: prices[IMetalSymbols.PLATINUM]?.value,
  };
};

const findTimestampInPrices = (
  prices: IXIgnitePrice[],
  symbol: XigniteMetalSymbols
) => {
  const symbolUpdate = prices.find((u) => u.Symbol === symbol);
  if (!symbolUpdate) {
    return 0;
  }
  return new Date(`${symbolUpdate.Date} ${symbolUpdate.Time}`).getTime();
};

let realtimeData: IXIgnitePrice[] = [];
let lastUpdate: number = 0;

let data: RealTimePriceQuote = {
  [IMetalSymbols.GOLD]: {
    diff: 0,
    value: 48.90807,
  },
  [IMetalSymbols.PLATINUM]: {
    diff: 0,
    value: 25.31755,
  },
  goldPrice: 48.90807,
  platinumPrice: 25.31755,
};

export type MetalStreamFunction = (data: RealTimePriceQuote) => void;

const defaultFunction: MetalStreamFunction = (data: RealTimePriceQuote) =>
  console.log(data);

export const subscribeToUpdates = async (
  streamUrl: string,
  onOpen: MetalStreamFunction = defaultFunction,
  onUpdate: MetalStreamFunction = defaultFunction
) => {
  const url = streamUrl;
  let eventSource: EventSource;

  eventSource = new EventSource(url);
  eventSource.addEventListener("open", function () {
    onOpen(data);
  });
  eventSource.addEventListener("data", (event) => {
    realtimeData = JSON.parse((event as XIgniteEvent).data);
    lastUpdate = findTimestampInPrices(realtimeData, XigniteMetalSymbols.GOLD);
  });
  eventSource.addEventListener("patch", function (event) {
    realtimeData = applyPatch(
      realtimeData,
      JSON.parse((event as XIgniteEvent).data)
    ).newDocument;

    const goldTimestampUpdate = findTimestampInPrices(
      realtimeData,
      XigniteMetalSymbols.GOLD
    );

    if (goldTimestampUpdate - lastUpdate >= 2000) {
      lastUpdate = goldTimestampUpdate;
      data = mapXIgniteToData(data, realtimeData);
      onUpdate(data);
    }
  });

  eventSource.addEventListener("error", (event) => {
    eventSource?.close();
    try {
      const error = JSON.parse((event as XIgniteEvent).data);
      console.error(error);
      if (error.status == "2009") {
        location.reload();
      }
    } catch (e) {
      console.error(event);
    }
  });
};
