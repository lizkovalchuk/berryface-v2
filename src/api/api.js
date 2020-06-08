import axios from "axios";

export const entriesFilter = async (dateRange) => {
  switch(dateRange){
    case 'TEN_LATEST' : {
       const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=10'
      );
      if (res.status != 200) {
        return [];
      }
      return res.data;
    }
    case '25_LATEST' : {
      const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=25'
      );
      if (res.status != 200) {
        return []
      }
      return res.data;
    }
    case '50_LATEST' : {
      const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=50'
      );
      if (res.status != 200) {
        return []
      }
      return res.data;
    }
    case 'ALL' : {
      const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"'
      );
      if (res.status != 200) {
        return []
      }
      return res.data;
    }
  }
}

