import { create } from 'zustand';

type ModalDataState = {
  ModalData: any;
  ClosestTimestampIndex: number;
  setModalData: (data: any) => void;
  fetchModalData: (id: string) => Promise<void>;
  findClosestTimestampIndex: (data: any) => Promise<void | number>;
};


export const useModalDataStore = create<ModalDataState>((set: any) => ({
  ModalData: {},
  ClosestTimestampIndex: 0,
  setModalData: (data: any) => set({ ModalData: data }),
  fetchModalData: async (id: string) => {
    const state = useModalDataStore.getState();
    try {
      if (!id) {
        return;
      }
      set({ ModalData: {} });
      const response = await fetch(`https://tourism.opendatahub.com/v1/Weather/Forecast?locfilter=mun${id}`);
      const data = await response.json();
      await set({ ModalData: { id, forecast: data[0] } });
      if (data[0]) {
        state.findClosestTimestampIndex(data);
      }
    } catch (error) {
      console.error("Failed to fetch modal data:", error);
    }
  },
  findClosestTimestampIndex: async (data: any): Promise<number> => {
    if (!data[0]) {
      throw new Error('Forecast data not available');
    }

    const forecast = data[0];
    const now = new Date();
    let smallestDifference = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < forecast.Forecast3HoursInterval.length; i++) {
      const forecastTime = new Date(forecast.Forecast3HoursInterval[i].Date);
      const difference = Math.abs(forecastTime.getTime() - now.getTime());
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestIndex = i;
      }
    }
    useModalDataStore.setState({ ClosestTimestampIndex: closestIndex });
    return closestIndex;
  }
}));