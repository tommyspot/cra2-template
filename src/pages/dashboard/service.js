/* eslint-disable */
import { groupBy, max, min, get } from 'lodash';
import { GENDER, AGE_GROUP, SIDE, TOPIC_MILESTONE } from './constants';

export function convertJSONData(rawData) {
  if (!rawData) return {};

  const keys = Object.keys(rawData);
  const [dataKey, metaDataKey] = keys;
  const data = rawData[dataKey];
  const metaData = rawData[metaDataKey];
  const formattedData = data.reduce((acc, response) => {
    const {
      RespId,
      Gender: gender,
      AgeGroup: ageGroup,
      Side: side,
      Weight: weight,
      ...minuteRest
    } = response;
    const formattedResponse = { gender, ageGroup, side, weight, ...minuteRest };
    return [...acc, formattedResponse];
  }, []);
  return { data: formattedData, metaData };
}

export function filterData(data, filter) {
  let filteredData = [...data];
  Object.keys(filter).forEach(key => {
    filteredData = filterDataByType(filteredData, key, filter[key]);
  })
  return filteredData;
}

export function buildDataRows(data) {
  const formattedData = data.reduce((acc, item) => {
    const { gender, ageGroup, side, weight, ...minuteRest } = item;
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

export function buildDataTable(data, currentTime) {
  const dataHeader = ['Time', 'Overall', 'Milestone', { role: 'tooltip' }, { role: 'style' }];
  const { max: maxValue } = getMaxMin(data);
  const currentMilestone = `T${currentTime}`;
  const dataRows = data.map(row => [
    ...row,
    hasTopic(row[0]) || currentMilestone === row[0] ? maxValue : null,
    getTopic(row[0]),
    currentMilestone === row[0] ? '#D24344' : null
  ]);
  return [dataHeader, ...dataRows];
}

export function getMaxMin(data) {
  const maxValue = max(data.reduce((acc, item) => [...acc, item[1]], []));
  const minValue = min(data.reduce((acc, item) => [...acc, item[1]], []));
  if (maxValue > Math.abs(minValue)) {
    return { max: maxValue, min: -maxValue };
  }
  return { max: Math.abs(minValue), min: minValue };
}

function filterDataByType(data, filterType, filterValues) {
  return data.filter(item => filterValues.includes(item[filterType]));
}

function hasTopic(milestone) {
  return TOPIC_MILESTONE.some(topicMilestone => Object.keys(topicMilestone)[0] === milestone);
}

function getTopic(milestone) {
  const selectedTopic = TOPIC_MILESTONE.find(topicMilestone => Object.keys(topicMilestone)[0] === milestone);
  if (selectedTopic) {
    return Object.values(selectedTopic)[0];
  }
  return null;
}

function getGenderLabel(genderValue, metaData) {
  const selectedValue = metaData.find(element => {
    const { Variable: variable, Value: value } = element;
    return variable === 'Gender' && value === genderValue;
  });
  if (selectedValue) {
    return get(selectedValue, 'Label');
  }
  return genderValue === '1' ? GENDER.MALE : GENDER.FEMALE;
}

function getAgeGroupLabel(ageGroupValue, metaData) {
  const selectedValue = metaData.find(element => {
    const { Variable: variable, Value: value } = element;
    return variable === 'AgeGroup' && value === ageGroupValue;
  });
  if (selectedValue) {
    return get(selectedValue, 'Label');
  }
  if (ageGroupValue === '1') {
    return AGE_GROUP.FROM18TO35;
  }
  if (ageGroupValue === '2') {
    return AGE_GROUP.FROM35TO50;
  }
  return AGE_GROUP.FROM50;
}

function getSideLabel(sideValue, metaData) {
  const selectedValue = metaData.find(element => {
    const { Variable: variable, Value: value } = element;
    return variable === 'Side' && value === sideValue;
  });
  if (selectedValue) {
    return get(selectedValue, 'Label');
  }
  if (sideValue === '1') {
    return SIDE.RED;
  }
  if (sideValue === '2') {
    return SIDE.BLUE;
  }
  return SIDE.DOUBTS;
}
