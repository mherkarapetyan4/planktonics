import React, { createRef } from "react"
import { connect } from "react-redux"
import "./ChatMessage.scss"
class ChatMessage extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      editable: false,
      contextMenu: false
    }
  }



  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  handleClickOutside = (event) => {
    if (this.contextMenuRef && !this.contextMenuRef.contains(event.target)) {
      this.setState({
        contextMenu: false
      })
    }
  }

  render() {
    const { message, users, userId, editable, removeMessage, editMessage, id } = this.props
    const { editable: isEditable, contextMenu } = this.state
    if (!users.length) {
      return null
    }
    const user = users.filter(i => parseInt(i.id) === parseInt(userId))[0]
    const imgUrl = `http://localhost:3000/images/${user.avatar}`
    return <div className={editable ? "ChatMessage ChatMessage-own" : "ChatMessage"}>
      <div><img src={imgUrl} /></div>
      <div className="ChatMessage-content">
        <div className="ChatMessage-content__message" onMouseOver={() => this.setState({ editable: true })} onMouseLeave={() => this.setState({ editable: false })}>
          {isEditable && editable &&
            <div className={"ChatMessage-content_editable"} onClick={(e) => {
              this.setState({
                contextMenu: true
              })
            }}>
              ...
            </div>
          }
          {contextMenu &&
            <div className="contextMenu" ref={node => this.contextMenuRef = node}>
              <div className="contextMenu_item" onClick={() => {
                editMessage(id)
                this.setState({
                  contextMenu: false
                })
              }} >
                Изменить
                </div>
              <div className="contextMenu_item" onClick={() => {
                removeMessage(id)
                this.setState({
                  contextMenu: false
                })
              }}>
                Удалить
                </div>
            </div>
          }
          <p>{message}</p>
        </div>
        <span>{editable ? "you" : user.username}</span>
      </div>
    </div>
  }
}

export default connect(state => ({
  users: state.users.data
}))(ChatMessage)