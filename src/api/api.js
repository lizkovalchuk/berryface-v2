import axios from "axios";

export const getData = async () => {
  const res = await axios.get(
    'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=672'
  );
  if (res.status !== 200) {
    return [];
  }
  return res.data;
}
