const custom = {
  enableStacked: false,
  enableStacked100: false,
  enableReverseStack: false,
  enableDataLabels: true,
  enableLegend: true,
  enableGridLines: false,
  enableDash: false,
  enableBoldLines: false,
  enableLabelInside: false,
  enableShadow: false,
  enableMinorGridLines: false,
  enableOppositeAxis: false,
  enableReverseLegends: false,
  enableSymbolOnRight: false,
  enableSquareSymbol: false,
  enableLegendsOnLeft: false
};

const option = {
  chartType: '',
  title: '',
  categories: [],
  yAxisTitle: '',
  series: [],
  custom
};

export const LargeNumbers = {
  trillion: 1000000000000,
  billion: 1000000000,
  million: 1000000,
  thousand: 1000
}

export const defaultChartTypes = [
  { type: 'column', label: 'Column chart', enabled: false },
  { type: 'bar', label: 'Bar chart', enabled: false },
  { type: 'line', label: 'Line chart', enabled: false }
];

export const cacheId = 'Image-to-Chart', cacheCapacity = 5;

export const initialOption = option;