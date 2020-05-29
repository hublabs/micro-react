import React, { useState, useEffect } from "react";
import { message, Form, Input, Button, Tag } from "antd";
import actions from "@/shared/actions";

import './index.scss';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const Login = (props) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log("didMont.props=>", props);
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
        token && window.localStorage.setItem("token", token)
    }, [token]);

    const logout = () => {
        setToken('')
        window.localStorage.removeItem("token")
    }
    const onFinish = values => {
        console.log('Success:', values);
        let token = "token_xxxxxx"
        setToken(token)
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    if (token) {
        return (
            <div style={{ padding: '20px', height: '100%' }}>
                <Tag color="green">已登录</Tag>
                <Button type="primary" danger onClick={logout} style={{ marginTop: '10px' }}>切换账号</Button>
            </div>
        )
    }
    return (
        <div className="login-page">
            <Form
                {...layout}
                name="basic"
                initialValues={{ username: 'admin', password: '1111' }}
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
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default Login;
