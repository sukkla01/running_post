import React, { Component } from 'react'
import './main.css'
import { Input, Button, Upload, Modal, Icon, notification, message } from 'antd';
import { Table } from 'reactstrap';
import axios from 'axios';
import config from '../Config'
import ImageSlide from './ImageSlide';
import Moment from 'react-moment';
import userlike from './userlike';

const { TextArea } = Input;
const BASE_URL = config.BASE_URL;


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        //reader.onerror = error => reject(error);
    });
}


const imgArr = []

export default class post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fileList: [],
            previewVisible: false,
            previewImage: '',

            imageList: [],
            topic: '',
            dataImage: [],
            data: [],
            countLike: 0,
            likeColor: '#9C9C9C',
            idLike: 0,

            visible: false,
            post_like_id: 0,

            dataLike: [],
            total:0



        };
    }

    componentDidMount() {
        this.getPost()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    handleChange = async ({ file, fileList }) => {


        this.setState({
            fileList,
            isimageList: false
        })

        if (this.state.isRemove == false) {
            file.preview = await getBase64(file.originFileObj);


            const isArr = imgArr.includes(file.preview);

            if (isArr == false) {
                imgArr.push(file.preview)
            }

        }


        this.setState({
            imageList: imgArr,
            isRemove: false
        })




    };

    handleCancel = () => {
        this.setState({
            previewVisible: false
        })
    };
    onRemove = async (file) => {

        // file.preview = await getBase64(file.originFileObj);
        // console.log(file)

        //  let imgArr =["a","b","c","d"]


        // imgArr.splice(0, 1)
        // // console.log(arr)
        let filtered = imgArr.filter(function (value, index, arr) {
            if (value === file.preview) {
                imgArr.splice(index, 1)
                console.log('rm---')
            } else {
                console.log('non')
            }


        });
        this.setState({
            imageList: imgArr,
            isRemove: true
        })
        // console.log(imgArr)

    }

    handlePreview = async (file) => {
        //console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };


    onPost = async (e) => {
        e.preventDefault()
        let data = {
            username: this.props.url.query.username,
            topic: this.state.topic,
            image: this.state.imageList
        }

        try {
            const res = await axios.post(`${BASE_URL}/post-job`, data)
            this.openNotification()
            this.setState({
                topic: '',
                imageList: [],
                imageList: '',
                fileList: []
            })

            this.getPost()
            // this.clickReload()

        } catch (error) {
            console.log(error)
        }


    }


    openNotification = placement => {
        notification.info({
            message: `เสร็จสมบูรณ์`,
            description:
                'โพสเรียบร้อยแล้ว',
            placement: 'topRight',
            style: { backgroundColor: '#73BE8C', color: 'black' }
        });
    };


    getPost = async (id, token) => {
        await axios.get(`${BASE_URL}/get-post`)
            .then(res => {

                this.setState({
                    data: res.data,

                })

            })
    }
    clickReload = (e) => {
        window.location.href = "/post"
    }


    onLike = async (id) => {


        let data = {
            username: this.props.url.query.username,
            post_id: id
        }

        try {
            const res = await axios.post(`${BASE_URL}/post-like`, data)


            this.getPost()
            this.setState({
                likeColor: '#eb2f96',
                idLike: id
            })
            this.msgLike()
            // this.clickReload()

        } catch (error) {
            console.log(error)
        }

    }
    
    msgLike = () => {
        message.success('กดหัวใจรัวๆ');
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    likeShowUser = (id,total) => {
        this.getLikeUser(id)
        this.setState({
            visible: true,
            post_like_id: id,
            total:total
        })


    }

    getLikeUser = async (id) => {


        try {
            const res = await axios.get(`${BASE_URL}/get-like-user/${id}`)
            console.log(res)
            this.setState({
                dataLike: res.data
            })


        } catch (error) {
            console.log(error)
        }

    }


    render() {
        const { fileList, previewVisible, previewImage, data, dataLike } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">รูปภาพ</div>
            </div>
        );
        return (
            <>
                <div style={{ textAlign: 'center', marginTop: 5 }}>
                    <Button shape="circle" icon="reload" onClick={this.clickReload} />
                </div>
                <div style={{ textAlign: 'left', marginTop: 10 }}>

                    {/* {console.log(this.props.url.query.username)} */}
                    <div className="row justify-content-center">
                        <div className="card main-contrainer" >
                            <div className="card-header">สร้างโพสต์</div>
                            <div className="card-body">
                                <div className="row" >
                                    <TextArea value={this.state.topic} name="topic" onChange={this.onChange} rows={4} placeholder="คุฯกำลังคิดอะไรอยู่" />
                                </div>
                                <div className="row" style={{ marginTop: 5 }}>
                                    <Upload
                                        action={this.state.statuspost}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        onRemove={this.onRemove}
                                    >
                                        {fileList.length >= 10 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                                <div className="row" style={{ marginTop: 0 }}>
                                    <Button type="primary" block loading={this.state.loading} onClick={this.onPost}>
                                        โพสต์
        </Button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>



                {data.map((item, i) => {
                    return <div className="row justify-content-center" style={{ marginTop: 10 }}>
                        <div className="card main-contrainer" >
                            <div className="card-header"><Icon type="user" /><span style={{ marginTop: 10 }}> {item.username}</span>
                                <span style={{ fontSize: 12 }}> <Moment format="DD/MM/YYYY HH:mm:ss">
                                    {item.d_update}
                                </Moment> </span> </div>
                            <div className="card-body">

                                <ImageSlide post_id={item.id} topic={item.topic} />

                            </div>
                            <div className="card-footer">
                                {/* <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> <span style={{ fontSize:12}}> 24</span> */}
                                <Icon onClick={() => this.onLike(item.id)} type="heart" theme="twoTone" twoToneColor={this.state.idLike == item.id ? this.state.likeColor : '#9C9C9C'} /> <span style={{ fontSize: 12 }} onClick={() => this.likeShowUser(item.id,item.tcount)}> {item.tcount > 0 ? item.tcount : ''}</span>
                            </div>
                        </div>
                    </div>
                })}

                <Modal
                    title={"ทั้งหมด " + this.state.total }
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Table dark>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>usrname</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataLike.map((item,i) => {
                                return <tr>
                            <th scope="row">{i+1}</th>
                            <td>{item.username}</td>

                                </tr>
                            })}


                        </tbody>
                    </Table>



                </Modal>
            </>
        )
    }
}
