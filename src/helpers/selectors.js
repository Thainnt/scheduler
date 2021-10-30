
export function getAppointmentsForDay(state, day) {
  
  const selectedDay = state.days.filter( eachDay => eachDay.name === day);

  const result = [];

  if (selectedDay.length) {
    const appointmentForDay = selectedDay[0].appointments;

    appointmentForDay.forEach(id => {
      result.push(state.appointments[id]);
    });
  }
  return result;
};

export function getInterview(state, interview) {

  if (interview){
    const interviewData = {...interview};
    interviewData.interviewer = state.interviewers[interview.interviewer];
    return interviewData;
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  
  const selectedDay = state.days.filter( eachDay => eachDay.name === day);

  const result = [];

  if (selectedDay.length) {
    const interviewerForDay = selectedDay[0].interviewers;

    interviewerForDay.forEach(id => {
      result.push(state.interviewers[id]);
    });
  }
  return result;
};