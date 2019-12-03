import React, { Component } from 'react'
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class userlike extends Component {

    componentDidMount(){
        console.log(this.props.id)
    }
    render() {
        return (
            <div>
                <Table dark>
                    {this.props.id}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>usrname</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>

                        </tr>

                    </tbody>
                </Table>
            </div>
        )
    }
}
