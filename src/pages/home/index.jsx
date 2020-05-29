import React, { Component } from 'react';
import { Card } from "antd";

import util from '../../utils/util.js'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    async componentDidMount() {
        this.loadData()
    }
    async loadData() {
        let res = await util.httpRequest({
            url: util.WXSETTING_API + '/ping',
            method: 'GET',
        }).catch(err => {
            // message.error('api错误');
        })
        console.log("res=>", res);
    }
    render() {
        return (
            <Card title="React App" style={{ height: '100%' }}>

            </Card>
        );
    }
}

export default Home;