import axios from "axios";

export const apiAverages = async (dateRange) => {


  switch(dateRange){
    case 'LAST_WEEK' : {
       const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=168'
      );
      if (res.status != 200) {
        return [];
      }
      return res.data;
      const rawData = Object.values(res);
      // console.log(rawData[0]);
      // const formattedResponse = rawData[0].map(record => {
      //   console.log(record);
      //   // const formattedDate = record.timestamp.substring(6, 10);
      //   // return {
      //   //   formattedDate,
      //   //   ...record
      //   // };
      // });
      // return formattedResponse;
      return;
    }
    case 'LAST MONTH' : {
      const res = await axios.get(
        'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=672'
      );
      if (res.status != 200) {
        return []
      }
      return res.data;
    }
  }
}