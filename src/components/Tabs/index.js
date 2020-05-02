import React from "react"
import Chat from "../Chat"
import "./Tabs.scss"
import {getLogout } from "../../actions/app"
import { connect } from "react-redux"
const tabs = [
  { id: 0, title: "Работа", chatOptions: { title: "Работа", chatId: 0 } },
  { id: 1, title: "Увлечение", chatOptions: { title: "Увлечение", chatId: 1 } },
]

class Tabs extends React.PureComponent {
  state = {
    selectedTab: 0
  }

  renderTabContent = () => {
    const { selectedTab } = this.state;
    const current = tabs[selectedTab]
    return <Chat {...current.chatOptions} />
  }

  render() {
    return <div className="Tabs">
      <div className="TabsHeader">
        <div className="TabsHeader_tabs">
          {tabs.map(i => (<div className={i.id === this.state.selectedTab ? "activeTab" : ""} key={i.id} onClick={() => this.setState({ selectedTab: i.id })}>{i.title}</div>))}
        </div>
        <div className="TabsHeader_exit">
          <p onClick={() => {
            this.props.dispatch(getLogout())
          }}>Exit</p>
        </div>
      </div>
      <div className="TabsContent">{this.renderTabContent()}</div>
    </div>
  }
}


export default connect()(Tabs)