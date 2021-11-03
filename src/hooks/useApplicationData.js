import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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

  const updateSpots = (state, appointments, id) => {

    const day = state.days.find(d => d.name === state.day);

    let increment = 0;

    if (!state.appointments[id].interview && appointments[id].interview) {
      increment = - 1;
    } else if (state.appointments[id].interview && !appointments[id].interview) {
      increment = 1;
    }

    let spots = day.spots + increment;
    
    const updatedDay = {...day, spots };
    const updatedDays = state.days.map(d => d.name === state.day ? updatedDay : d);
    
    return updatedDays;
  };
  

  function bookInterview(id, interview) {
    
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      setState({...state, appointments, days: updateSpots(state, appointments, id)});
    })
  }

  function cancelInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = { ...state.appointments, [id]: appointment};
    
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments, days: updateSpots(state, appointments, id)});
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
};