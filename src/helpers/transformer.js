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
  const days = {};
  const rawData = Object.values(data);
  rawData.forEach((d) => {
    const day = dayjs(d.timestamp).format("MM-DD")
    if (days[day] === undefined) {
      days[day] = [d];
    } else {
      days[day].push(d);
    }
  });
  const daysKeys = Object.keys(days);

  const daysHL = [];
  
  daysKeys.forEach((day) => {
    const tempsOfDay = days[day].map((record) => {
      return record.temperature;
    });
    const dayHigh = Math.max(...tempsOfDay);
    const dayLow = Math.min(...tempsOfDay);
    daysHL.push({
      formattedDate: day,
      high: dayHigh,
      low: dayLow
    })
  })
  return getLastN(daysHL, numEntries);
}

export default {
  getCurrent,
  getHistorical,
  getHighsAndLows
}