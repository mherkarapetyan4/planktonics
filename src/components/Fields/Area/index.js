import React from "react"
import "./Area.scss"

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { emojiIcon } from "../../../images/icons"
class FieldArea extends React.PureComponent {
  state = {
    picker: false
  }


  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

  }


  handleClickOutside = (event) => {
    if (this.pickerRef && !this.pickerRef.contains(event.target)) {
      this.setState({
        picker: false
      })
    }
  }
  render() {
    const { value, onChange, onSubmit, addEmoji } = this.props
    return <div className="FieldArea__wrapper">
      <textarea value={value} onChange={onChange} onKeyDown={(e) => {
        if (e.which === 13 && !e.shiftKey) {
          e.preventDefault()
          onSubmit()
        }
      }} className="FieldArea">

      </textarea>
      <div onClick={() => this.setState({ picker: !this.state.picker })}>{emojiIcon}
        {
          this.state.picker && <div className="FieldArea_picker" ref={node => this.pickerRef = node}>
            <Picker onSelect={addEmoji} />
          </div>
        }
      </div>

    </div>
  }
}


export default FieldArea