import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState( {
    day:"Monday",
    days:[],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }, 
    }, 
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
    
  },[]);

  const updateSpots = (state, appointmentId, interviewData) => {

    const dayIndex = state.days.findIndex(d => d.name === state.day);
    let updatedSpots;

    if (!state.appointments[appointmentId].interview && interviewData) {
      updatedSpots = state.days[dayIndex].spots - 1;
    } else if (state.appointments[appointmentId].interview && !interviewData) {
      updatedSpots = state.days[dayIndex].spots + 1;
    } else {
      updatedSpots = state.days[dayIndex].spots;
    }
    
    const updatedDay = {...state.days[dayIndex], spots: updatedSpots};
    const updatedDays = [...state.days.slice(0, dayIndex), updatedDay, ...state.days.slice(dayIndex + 1)];
    
    return updatedDays;
  };
  

  function bookInterview(id, interview) {
    
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      setState({...state, appointments, days: updateSpots(state, id, interview)});
    })
  }

  function cancelInterview(id, interview) {

    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = { ...state.appointments, [id]: appointment};
    
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments, days: updateSpots(state, id, interview)});
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
};

export default useApplicationData;