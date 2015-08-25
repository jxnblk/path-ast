
import React from 'react'
import Icon from './Icon'
import Circle from './Circle'

export default class App extends React.Component {

  render() {
    const styles = {
      root: {
        fontFamily: 'sans-serif',
      }
    }

    return (
      <div style={styles.root}>
        <h1>Path AST</h1>
        {/*
        <Circle />
          <Icon name='bookmark-rotate' />
          <Icon name='up-rotate' />
        */}
        <section>
          <Icon name='test' />
          <Icon name='triangleUp' />
          <Icon name='bookmark' />
          <Icon name='bookmark-half' />
          <Icon name='bookmark-double' />
          <Icon name='bookmark-shifted' />
          <Icon name='home' />
          <Icon name='home-flip-y' />
          <Icon name='bookmark' />
          <Icon name='cloud' />
          <Icon name='cloud-flip-x' />
          <Icon name='cloud-flip-y' />
          <Icon name='heart' />
          <Icon name='heart-flip-y' />
          <Icon name='musicNote' />
          <Icon name='musicNote-flip-x' />
          <Icon name='musicNote-flip' />
          <Icon name='test' outline />
        </section>
      </div>
    )
  }

}

