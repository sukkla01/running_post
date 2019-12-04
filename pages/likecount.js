import React, { Component } from 'react'
import axios from 'axios';
import config from '../Config'

const BASE_URL = config.BASE_URL;

export default class likecount extends Component {

    state = {
        data: []
    }
    componentDidMount() {
        this.getCount(this.props.id)
    }

    componentWillReceiveProps(nextProps){
   
           this.getCount(nextProps.id)
        
    }

    getCount = async (id) => {
     
        await axios.get(`${BASE_URL}/get-like-count/${id}`)
            .then(res => {
               
                this.setState({
                    data: res.data[0],

                })

            })
    }

    render() {
        const { data } = this.state
        // console.log(data)
        return (
            
            <span>{data.tcount} </span>
        )
    }
}
