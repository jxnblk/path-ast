
import React from 'react'
import Icon from './Icon'
import Controls from './Controls'
import icons from './icons'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      rotation: 15,
      scale: 1,
      translateX: 0,
      translateY: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: parseFloat(e.target.value) })
  }

  render() {
    const styles = {
      root: {
        fontFamily: 'sans-serif',
      }
    }

    return (
      <div style={styles.root}>
        <h1>Path AST Demo</h1>
        <Controls
          {...this.state}
          handleChange={this.handleChange} />
        <section>
          {Object.keys(icons).map((key, i) => {
            return <Icon
              key={i}
              name={key}
              {...this.state} />
          })}
        </section>
      </div>
    )
  }

}

