import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
     .then(res => {
       transition(SHOW);
     })
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    const interview = null;
    transition(DELETING);
    props.cancelInterview(props.id, interview)
      .then(res => {
        transition(EMPTY);
      })
  }

  function edit() {
    transition(EDIT);

  }

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
    <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => cancel()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit = {edit}
          onDelete={confirm}
        />
      )}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewers = {props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}

  </article>
  );
}