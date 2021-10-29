
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
}
