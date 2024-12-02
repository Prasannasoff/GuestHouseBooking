import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/landing.module.css";
import video from "../assets/mixkit-man-putting-on-virtual-reality-glasses-43597-4k.mp4";
import HomeScreen from "./HomeBooking";

function Landing() {
  return (
    <div className={style.container}>
      <div className={style.blueCont}>
        <div className={style.header}>
          <div className={style.title}>
            <span>Find your </span>
            <span style={{ color: 'rgb(250, 197, 39)' }}>comfy</span>
            <span style={{ marginTop: '-15px', }}>shelter</span>
          </div>
          <div>
            <div className={style.tagline}>Experience Your Stay Before You Arrive: Book Guest Houses with VR Tours!</div>
          </div>
        </div>
        <img src='building.png' className={style.image}></img>
        <div className={style.homePage}><HomeScreen/></div>
      </div>
      {/* <video autoPlay muted loop>
        <source src={video}/>
      </video>
      <div className={style.overlay}>
        <h2>Pick your Choice</h2> 
        <Link to={"/home"}>
            <button className={style.button}>Visualize</button>
        </Link>
      </div> */}
    </div>
  );
}

export default Landing;
