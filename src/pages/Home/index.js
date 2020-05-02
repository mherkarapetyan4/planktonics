import React from "react"
import withAuth from "../../hoc/withAuth"
import Tabs from "../../components/Tabs"
class HomePage extends React.PureComponent {
   render() {
    return (
      <div>
        <Tabs />
      </div>
    )
  }
}

export default withAuth(HomePage)