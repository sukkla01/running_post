import React, { Component } from 'react'

export default class test extends Component {
    constructor(){
        super()
        this.state = {
            istest : false
        }
    }
    render() {
        console.log('render')
        return (
            <div>
                {this.state.istest  ? 'true' : 'ff'}
                
            </div>
        )
    }
}
