import dayjs from 'dayjs';

function getCurrent(data) {
  const keys = Object.keys(data);
  if (keys.length == 0) {
    return {
      temp: 0,
      humidity: 0
    };
  }
  const value = data[keys[keys.length - 1]]
  return {
    temp: value.temperature,
    humidity: value.humidity
  };
}

function getLastN(data, n) {
  const end = data.length;
  const start = Math.max(end - n, 0);
  return data.splice(start, end);
}

function groupByDay(data) {
  const days = {};
  const rawData = Object.values(data);
  rawData.forEach((record) => {
    const day = dayjs(record.timestamp).format("MM-DD")
    const formattedDay = dayjs(record.timestamp).format("YYYY-MM-DD")
    const updatedRecord = {
      ...record,
      formattedDay
    };
    if (days[day] === undefined) {
      days[day] = [updatedRecord];
    } else {
      days[day].push(updatedRecord);
    }
  });
  return days;
}

function getDailyData(data, line1fn, line2fn, line1Name, line2Name) {
  const daysKeys = Object.keys(data);
  const days = [];
  
  daysKeys.forEach((day) => {
    const tempsOfDay = data[day].map((record) => {
      return record.temperature;
    });
    const humsOfDays = data[day].map((record) => {
      return record.humidity;
    })
    const line1 = line1fn(tempsOfDay, humsOfDays);
    const line2 = line2fn(tempsOfDay, humsOfDays);
    days.push({
      formattedDate: day,
      line1: line1,
      line2: line2,
      displayDate: data[day][0].formattedDay,
      line1Name,
      line2Name
    })
  })
  return days;
}

function getAverage(nums){
  if (nums.length === 0){
    return 0;
  }
  let sum = 0;
  nums.forEach((num) => {
    sum = sum + num;
  })
  const average = (sum / nums.length).toFixed(2);
  return average;
}

function getHistorical(data, numEntries) {
  const rawData = Object.values(data);
  const formattedData = rawData.map(record => {
    const formattedDate = dayjs(record.timestamp).format("MM-DD/hha")
      return {
        formattedDate,
        ...record
      };
  });
  return getLastN(formattedData, numEntries);
}

function getHighsAndLows(data, numEntries) {
  const days = groupByDay(data);
  const daysHL = getDailyData(days, 
    (temps, humidity) => Math.max(...temps), 
    (temps, humidity) => Math.min(...temps),
    "High", 
    "Low");
  return getLastN(daysHL, numEntries);
}

function getAverages(data, numEntries){
  const days = groupByDay(data);
  const daysAverages = getDailyData(days,
    (temps, humidity) => getAverage(temps),
    (temps, humidity) => getAverage(humidity),
    "Temperature",
    "Humidity");
  return getLastN(daysAverages, numEntries) ;
}

export default {
  getCurrent,
  getHistorical,
  getHighsAndLows,
  getAverages
}