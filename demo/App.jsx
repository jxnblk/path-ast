
import React from 'react'
import Icon from './Icon'
import Controls from './Controls'
import icons from './icons'

export default class App extends React.Component {

  constructor () {
    super()
    this.state = {
      rotation: 90,
      scale: 1,
      translateX: 0,
      translateY: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: parseFloat(e.target.value) })
  }

  render () {
    const styles = {
      root: {
        fontFamily: 'sans-serif'
      },
      header: {
        position: 'fixed',
        zIndex: 2,
        backgroundColor: 'white'
      },
      body: {
        paddingTop: 128
      }
    }

    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <Controls
            {...this.state}
            handleChange={this.handleChange} />
        </div>
        <section style={styles.body}>
          {Object.keys(icons).map((key, i) => {
            return (
              <Icon
                key={i}
                name={key}
                {...this.state} />
            )
          })}
        </section>
      </div>
    )
  }

}

