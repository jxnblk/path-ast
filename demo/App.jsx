
import React from 'react'
import Icon from './Icon'

export default class App extends React.Component {

  render() {
    const styles = {
      root: {
        fontFamily: 'sans-serif'
      }
    }

    return (
      <div style={styles.root}>
        <h1>Path AST</h1>
        <section>
          <Icon name='test' outline />
          <Icon name='bookmark' />
          <Icon name='bookmark-half' />
          <Icon name='bookmark-double' />
          <Icon name='bookmark-shifted' />
          <Icon name='home' />
          <Icon name='home-flip-y' />
          <Icon name='triangleUp' />
          <Icon name='up-rotate' />
          <Icon name='bookmark' />
          <Icon name='bookmark-rotate' />
          <Icon name='cloud' />
          <Icon name='cloud-flip-x' />
          <Icon name='cloud-flip-y' />
          <Icon name='heart' />
          <Icon name='heart-flip-y' />
          <Icon name='musicNote' />
          <Icon name='musicNote-flip-x' />
          <Icon name='musicNote-flip' />
        </section>
      </div>
    )
  }

}

