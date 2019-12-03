import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';
import config from '../Config'

const BASE_URL = config.BASE_URL;

export default class ImageSlide extends Component {

    state = {
        dataImage: []
    }

    componentDidMount() {
        this.getImageList(this.props.post_id)
    }

   componentWillReceiveProps(nextProps){
    if(nextProps.post_id!==this.props.post_id){
        let aa = nextProps

       this.getImageList(nextProps.post_id)
    }
       
    // this.props.imageList.length > 0 ? this.setState({ dataImage : this.props.imageList }) :''
    
   }




    getImageList = async (id) => {
        await axios.get(`${BASE_URL}/post-show/${id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    dataImage: res.data,


                })

            })
    }

    render() {

        return (
            <div>
                {this.props.topic}
                {this.state.dataImage.length == 0 ? '' :
                    <ImageGallery
                        items={this.state.dataImage}
                        showNav={true}
                        showIndex={true}
                        showBullets={false}
                        showFullscreenButton={false}
                        // showThumbnails={false}
                        thumbnailPosition = "right"
                    //slideDuration = {600}

                    />
                }
            </div>
        )
    }
}