import React, { useState, useEffect } from "react";
import useRecorder from "./useRecorder";

export default function Recorder() {
  let [audioURL, isRecording, startRecording, stopRecording, d] = useRecorder();
  const [seconds, setSeconds] = useState(15);
  const [isDisabledSend, setDisabledSend] = useState(true);
  const [question, setQuestion ] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds < 15 && isRecording) {
        setSeconds(seconds + 1);
      }
      else{
        stopRecording();
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  function start(){
    setDisabledSend(true);
    startRecording();
    setSeconds(0);
  }

  function stop(){
    stopRecording();
    setDisabledSend(false);
  }

  async function send(){
    let audioBlob = await fetch(audioURL).then((r) => r.blob());
    let audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    let formData = new FormData();
    formData.append('file', audioFile);

    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'POST',
        body: formData,
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        }};
      let response = await fetch('user/SendVoice', data);
      let result = await response.json();
      if(response.status === 200){
        setQuestion(result.question);
        setAnswer(result.response);
      }
      else if(response.status === 401){
        sessionStorage.setItem("accessToken", "");
        sessionStorage.setItem("role", "");
        sessionStorage.setItem("access", "");
        sessionStorage.setItem("isLogin", "");
      }
      else{
        alert(result);
      }
  }
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3 className=" text-muted">
        {seconds} sec.
      </h3>
      <div>
        {isRecording?
        (<><button className="btn btn-outline-secondary px-5 m-3" onClick={stop} disabled={!isRecording}>Stop</button></>)
        :
        (<><button className="btn btn-outline-secondary px-5 m-3" onClick={start} disabled={isRecording}>Start</button></>)}
        <button className="btn btn-outline-secondary px-5 m-3" onClick={send} disabled={isDisabledSend}>Send</button>
      </div>
      <div>
        <audio controls src={audioURL}></audio>
      </div>
      <pre className='text-center text-primary'>
        <h3>{question}</h3>
      </pre>
      <pre className='text-center text-muted'>
        <h3>{answer}</h3>
      </pre>
    </div>
  );
}
