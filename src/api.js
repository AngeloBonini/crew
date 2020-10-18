import React from 'react';
import absences from '../json_files/absences';
import members from '../json_files/members';
import moment from "moment";



export const MEMBERS_HASH = () => { 
  const hash = {};
  members.payload.forEach(member => {
      hash[member.userId] = member;
  });
  return hash;
};
//----------------------------------------------------
export const ABSENCE_TYPE = (userName, absenceType) => {
if(absenceType === "vacation"){
  return `${userName} is on vacation`;
}else{
  return `${userName} is sick`;
}
}
//---------------------------------------------------
const USER_ID = (ABSENCES, userId) => { 
  return ABSENCES.filter(absence => parseInt(absence.userId) === parseInt(userId));
};

const START_END_DATE = (ABSENCES, startDate, endDate) => {
  return ABSENCES.filter(absence => moment(absence.startDate) >= moment(startDate) && moment(absence.endDate) <= moment(endDate));
};
//------------------------------------------------------------------
export const getAllAbsences = filters => {
  let allMatchedEvents = [];
  let ABSENCES = absences.payload;
  const MEMBERS = MEMBERS_HASH();
  const noFilters = Object.keys(filters).length === 0;

  if ("userId" in filters) {
      allMatchedEvents = USER_ID(ABSENCES, filters.userId);
  }
  if ("startDate" in filters && "endDate" in filters) {
      if (allMatchedEvents.length) ABSENCES = allMatchedEvents;
      allMatchedEvents = START_END_DATE(ABSENCES, filters.startDate, filters.endDate);
  }

  if (noFilters) {
      allMatchedEvents = ABSENCES;
  }

  allMatchedEvents = allMatchedEvents.map(event => {
          const userName = MEMBERS[event.userId].name;
          const absenceType = event.type.toLowerCase();
          return {
              ...event,
              confirmedAt: moment(event.confirmedAt).format("YYYY-MM-DD"),
              createdAt: moment(event.createdAt).format("YYYY-MM-DD"),
              title: ABSENCE_TYPE(userName, absenceType)
          }
      }
  );

  return allMatchedEvents;
};
export const DataProvider = props => {
  const {
      children
  } = props;

  const getAllEventData = filters => getAllAbsences(filters);


  return (
      <DataContext.Provider
          value={{
              getAllEventData
          }}
      >
          {children}
      </DataContext.Provider>
  );
};