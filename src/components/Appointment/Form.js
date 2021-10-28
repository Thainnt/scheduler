import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";

import Button from "components/Button";

export default function Form(props) {

  console.log('props:',props);

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = (val) => {
    setStudent("");
    setInterviewer(null);
    val = "";
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      onChange={() => setInterviewer()}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  );

  // console.log('props: ', props);

  // const [student, setStudent] = useState(props.student || "");
  // const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // const reset = () => {
  //   setStudent("");
  //   setInterviewer(null);
  // };

  // const cancel = () => {
  //   reset();
  //   props.onCancel();
  // };

  // return(
  //   <main className="appointment__card appointment__card--create">
  //     <section className="appointment__card-left">
  //       <form autoComplete="off">
  //         <input
  //           className="appointment__create-input text--semi-bold"
  //           name="name"
  //           type="text"
  //           placeholder="Enter Student Name"
  //           onChange={(event) => setStudent(event.target.value)}
  //         />
  //       </form>
  //       <InterviewerList 
  //         setInterviewer={setInterviewer(props.onChange)}
  //         // setInterviewer={props.onChange(setInterviewer(interviewer.id))}
  //       />
  //     </section>
  //     <section className="appointment__card-right">
  //       <section className="appointment__actions">
  //         <Button danger onClick={cancel}>Cancel</Button>
  //         <Button confirm onClick={props.onSave}>Save</Button>
  //       </section>
  //     </section>
  //   </main>
  // );
}