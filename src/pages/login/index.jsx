import React, { useState, useEffect } from "react";
import { message, Form, Input, Button, Tag, Card } from "antd";
import actions from "@/shared/actions";
import util from '../../utils/util.js'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const Login = (props) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // console.log("didMont.props=>", props);
        actions.onGlobalStateChange((state) => {
            const { token } = state;
            // 未登录 - 返回主页
            if (!token) {
                message.error("未检测到登录信息！");
                return props.history.push("/");
            }
            console.log("token=>", token);
            setToken(token)
        }, true);
        if (process.env.REACT_APP_ENV !== 'prd') {
            let token = window.localStorage.getItem("token");
            setToken(token)
        }
    }, [props]);

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token)
            setLoading(true)
            util.httpRequest({
                url: util.COLLEAGUE_API + '/v1/login/colleague-info',
                method: 'GET',
            }).then(res => {
                // console.log('getStoreInfo=>', res);
                window.localStorage.setItem("storeInfo", JSON.stringify(res.stores))
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }, [token]);
    const logout = () => {
        setToken('')
        window.localStorage.removeItem("token")
    }
    const onFinish = values => {
        // console.log('Success:', values);
        let { username, password } = values
        setLoading(true)
        util.httpRequest({
            url: util.LOGIN_API + '/v1/logins/user-name',
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            // console.log("token=>", res.token);
            message.success('登录成功');
            setToken(res.token)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log('api错误=>', err);
            message.error("登录错误");
        })
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    if (token) {
        return (
            <Card title="登录" style={{ height: '100%' }}>
                <Tag color="green">已登录</Tag>
                <Button type="primary" danger onClick={logout} style={{ marginTop: '10px' }}>切换账号</Button>
            </Card>
        )
    }
    return (
        <Card title="登录" style={{ height: '100%' }}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ username: 'system@email.com', password: '1111' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: '400px' }}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
