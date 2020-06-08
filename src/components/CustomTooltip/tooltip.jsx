import React from "react";
import dayjs from 'dayjs';
import Paper from "@material-ui/core/Paper";


function CustomTooltip(props) {
  const { payload } = props;
  if (!payload) {
    return null;
  }

  const timestamp = payload.length === 0 ? {} : payload[0].payload.timestamp;
  const newDate = new Date(timestamp);
  const date = dayjs(newDate).format('dddd, MMMM D, YYYY')
  const time = dayjs(newDate).format('h:mm:ss a');
  const temperature = payload.length === 0 ? {} : payload[0].payload.temperature;
  const humidity = payload.length === 0 ? {} : payload[0].payload.humidity;

  if (props.active) {
    return (
      <div className="custom-tooltip">
        <Paper className="label">
          Date: {`${date}`}
          <br/>
          Time: {`${time}`}
          <br/>
          Temperature: {`${temperature}`}
          <br/>
          Humidity: {`${humidity}`}
        </Paper>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;