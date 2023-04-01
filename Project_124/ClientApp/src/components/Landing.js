import React, { Component } from 'react';
import img_1 from '../images/1.png';
import img_2 from '../images/2.png';
import img_3 from '../images/3.png';
import img_4 from '../images/4.png';
import img_5 from '../images/5.png';
import img_6 from '../images/6.png';

export class Landing extends Component {
  static displayName = Landing.name;

  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h2 className="m-3">You have questions and you are looking for answers register on our website.</h2>
        <h2 className="m-3">Get the information you need quickly and conveniently:</h2>
        <h3 className='m-4 w-100 text-success'>Ask a question in text:</h3>
        <img className='border shadow m-3 w-100' src={img_1}></img>
        <h3 className='m-4 w-100 text-success'>Ask a question in image:</h3>
        <img className='border shadow m-3 w-100' src={img_2}></img>
        <img className='border shadow m-3 w-100' src={img_3}></img>
        <h3 className='m-4 w-100 text-success'>Ask a question in voice:</h3>
        <img className='border shadow m-3 w-100' src={img_4}></img>
        <h3 className='m-4 w-100 text-success'>History of questions:</h3>
        <img className='border shadow m-3 w-100' src={img_5}></img>
        <h3 className='m-4 w-100 text-success'>convenient to use the site on mobile devices:</h3>
        <img className='border shadow m-3 w-50' src={img_6}></img>
        <button className='btn btn-outline-success btn-lg m-5 fw-bold px-5' onClick={()=>{window.location.href = "/auth"}}>Registration</button>
      </div>
    );
  }
}
