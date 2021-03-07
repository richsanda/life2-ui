import { Component, useState } from "react";

const Zoom = (props) => {

    const { src } = props;

    const [style, setStyle] = useState({backgroundImage: `url(${src})`, backgroundColor: "yellow", backgroundPosition: '0% 0%', margin: '22px'});
  
    const handleMouseMove = e => {
      const { left, top, width, height } = e.target.getBoundingClientRect()
      const x = (e.pageX - left) / width * 10
      const y = (e.pageY - top) / height * 200
      setStyle({...style, backgroundPosition: `${x}% ${y}%`, margin: '12px'});
    }
  
    return (
      <figure onMouseMove={handleMouseMove} style={style}>
      </figure>
    )
  }

  export default Zoom