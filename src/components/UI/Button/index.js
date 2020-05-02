import React from "react"
import "./Button.scss"
class Button extends React.PureComponent {
  render() { 
    const {title, onClick} = this.props
  return  <button  className="Button" onClick={onClick}>{title}</button>
  }
}


export default Button