import "./App.css";
import React, {Fragment, Suspense, useContext, useEffect, useState} from 'react';
import download from 'downloadjs';
import querystring from "querystring";
import PropTypes from "prop-types";
import moment from 'moment';
import { ApiContext } from "./api.context";

const BasicShell = React.lazy(() => import("./basicShell"));
 const TableList = React.lazy(() => import("./AbsenceTable"));

let ics = require("ics");

const MainPage = ({location}) => {
  const {getAllEventData} = useContext(ApiContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventFileDataExport, setEventFileDataExport] = useState(null);


  const downloadIcs = (file) => {
    file.preventDefault();
    if (!eventFileDataExport) {
      const eventExport = events.map(event =>{
        const eventStart = moment(event.startDate, "YYYY-MM-DD").format("YYYY-MM-DD").split("-");
        const eventEnd = moment(event.endDate, "YYYY-MM-DD").format("YYYY-MM-DD").split("-");
        return {
          title: event.title,
          start: eventStart,
          end: eventEnd,
          calName: "CrewAbsencesCalendar"
        }
      });
      const {error, value} = ics.createEvents(eventExport);
      if (error){
        return
      }
      setEventFileDataExport(value);
      download(value, "CrewAbsencesCalendar.ics", "text/plain");
    }
    download(eventFileDataExport, "CrewAbsencesCalendar.ics", "text/plain");
  };
  useEffect(() => {
    let searchTerm = location.search.slice(1);
    let queryParamsObject = querystring.parse(searchTerm);
    setEvents([...getAllEventData(queryParamsObject)]);
    setLoading(false);
  }, [getAllEventData, location.search]);


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicShell>
           {loading ? 'loading...' :
               <Fragment>
                   {events.length > 0 && <div className={"clearfix"}>
                       <button className={"btn btn-secondary float-right download"}
                               onClick={downloadIcs}>Download
                       </button>
                   </div>}
                   <Suspense fallback={<div>Loading...</div>}>
                       <TableList events={events}/>
                   </Suspense>
               </Fragment>
           }
           </BasicShell>
   </Suspense>
    );
  };
MainPage.propTypes = {
  location: PropTypes.object.isRequired
};
export default MainPage;

  