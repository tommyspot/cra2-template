import { groupBy, max, min } from 'lodash';

export function convertJSONData(rawData) {
  if (!rawData) return {};

  const keys = Object.keys(rawData);
  const [dataKey, metaDataKey] = keys;
  const data = rawData[dataKey];
  const metaData = rawData[metaDataKey];
  const formattedData = data.reduce((acc, response) => {
    const {
      RespId,
      Gender,
      AgeGroup,
      Side,
      Weight: weight,
      ...minuteRest
    } = response;
    const minutes = Object.entries(minuteRest);
    const weightedMinutes = minutes.map(minute => [...minute, weight]);
    return [...acc, ...weightedMinutes];
  }, []);

  const groupedData = groupBy(formattedData, newValue => newValue[0]);
  return Object.keys(groupedData).map(key => {
    let sumValue = 0;
    let sumWeight = 0;
    groupedData[key].forEach(item => {
      const [, value, weight] = item;
      sumValue += parseFloat(value) * parseFloat(weight);
      sumWeight += parseFloat(weight);
    });
    return [key, sumValue / (sumWeight * data.length)];
  });
}

export function getMaxMin(data) {
  const maxValue = max(data.reduce((acc, item) => [...acc, item[1]], []));
  const minValue = min(data.reduce((acc, item) => [...acc, item[1]], []));
  if (maxValue > Math.abs(minValue)) {
    return { max: maxValue, min: -maxValue };
  }
  return { max: Math.abs(minValue), min: minValue };
}

export function buildDataTable(data) {
  const dataHeader = [
    'Time',
    'Overall',
    'Milestone',
    { role: 'tooltip' },
    { role: 'style' }
  ];
  const { max: maxValue } = getMaxMin(data);
  const dataRow = data.map((row, index) => [
    ...row,
    index % 4 === 0 ? maxValue * 2 : null,
    null,
    null
  ]);
  return [dataHeader, ...dataRow];
}
