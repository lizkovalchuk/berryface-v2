import React from "react";
import dayjs from 'dayjs';
import Paper from "@material-ui/core/Paper";

function CustomTooltip(props) {
  const { payload } = props;
  if (!payload || payload.length === 0) {
    return null;
  }
  const payloadData = payload[0].payload;
  let date, time;
  if (payloadData.timestamp) {
    const newDate = new Date(payloadData.timestamp);
    date = dayjs(newDate).format('dddd, MMMM D, YYYY')
    time = dayjs(newDate).format('h:mm:ss a');
  }

  if (props.active) {
    return (
      <div className="custom-tooltip">
        <Paper className="label">
          { (date && time) && 
            <div>
              Date: {`${date}`}
              <br/>
              Time: {`${time}`}
            </div>
          }
          { (payloadData.displayDate) && 
            <div>
              Date: {`${payloadData.displayDate}`}
            </div>
          }
          { payloadData.line1Name &&
            <div>{`${payloadData.line1Name}`}: {`${payloadData.line1}`}</div>
          }
          { payloadData.line2Name &&
            <div>{`${payloadData.line2Name}`}: {`${payloadData.line2}`}</div>
          }
          { payloadData.temperature &&
            <div>Temperature: {`${payloadData.temperature}`}</div>
          }
          { payloadData.humidity && 
            <div>Humidity: {`${payloadData.humidity}`}</div> 
          }  
        </Paper>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;