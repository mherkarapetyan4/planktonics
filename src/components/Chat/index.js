import React from "react"
import FieldArea from "../Fields/Area"
import Button from "../UI/Button"
import ChatMessage from "./ChatMessage"
import { connect } from "react-redux"
import "./Chat.scss"
import { sendIcon } from "../../images/icons"
import { generateId } from "../../config/helper"
class Chat extends React.PureComponent {
  constructor(props) {
    super(props)
    this.messagesEndRef = ""
    this.state = {
      messageValue: "",
      messages: [],
      userId: "",
      editable: false,
      editableId: ""
    }
  }

  componentDidMount() {
    this.getMessages()
    this.scrollToBottom()
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.getMessages()
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    this.messagesEndRef.scrollTop = this.messagesEndRef.scrollHeight + 100
  }

  getMessages = () => {
    const { chatId } = this.props
    const chats = localStorage.getItem("chats")
    const userId = localStorage.getItem("userId")

    if (chats && userId) {
      const messages = JSON.parse(chats)[chatId]
      this.setState({
        messages,
        userId
      })
    }
  }
  onSubmitHandler = () => {
    const { chatId } = this.props
    const { messageValue, editable, editableId } = this.state
    const userId = localStorage.getItem("userId")
    const chats = JSON.parse(localStorage.getItem("chats")) || [[], []]
    if (!messageValue) {
      return false
    }
    if (editable) {
      const index = chats[chatId].findIndex(i => i.id === editableId)
      chats[chatId][index] = {
        ...chats[chatId][index],
        message: messageValue
      }
    } else {
      let message = {
        userId,
        message: messageValue,
        id: generateId()
      }
      chats[chatId] = [...chats[chatId], message]
    }
    localStorage.setItem("chats", JSON.stringify(chats))
    this.setState({ messages: chats[chatId], messageValue: "" }, () => this.scrollToBottom())
  }

  removeMessageHandler = (id) => {
    const { chatId } = this.props
    const chats = JSON.parse(localStorage.getItem("chats")) || [[], []]
    const index = chats[chatId].findIndex(i => i.id === id) 
    chats[chatId].splice(index, 1)
    localStorage.setItem("chats", JSON.stringify(chats))
    this.setState({ messages: chats[chatId] }, () => this.scrollToBottom())
  }

  editMessageHandler = (index) => {
    const { chatId } = this.props
    const chats = JSON.parse(localStorage.getItem("chats")) || [[], []]
    const message = chats[chatId].filter(e => e.id === index)[0]
    this.setState({
      messageValue: message.message,
      editable: true,
      editableId: index
    })
  }
  
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      messageValue: this.state.messageValue + emoji
    });
  };
  render() {
    const { title, chatId } = this.props
    const { messageValue, messages } = this.state
    const userId = localStorage.getItem("userId")
    return <div className="Chat">

      <h1>{title}</h1>
      <div className="Chat-wrapper">
        <div className={"ChatContent"} ref={node => { this.messagesEndRef = node }}>
          {messages.map(message => {

            return (
              <ChatMessage key={message.id} {...message} editable={message.userId === userId} removeMessage={this.removeMessageHandler} editMessage={this.editMessageHandler} />
            )
          })}
        </div>
        <div className="ChatAction">
          <FieldArea value={messageValue}
            onSubmit={this.onSubmitHandler}
            addEmoji={this.addEmoji}
            onChange={(e) => {
              this.setState({
                messageValue: e.target.value
              })
            }} />
          <Button title={sendIcon} onClick={() => {
            this.onSubmitHandler()
          }} />
        </div>

      </div>
    </div>
  }
}

export default connect(state => ({
  userId: state
}))(Chat)