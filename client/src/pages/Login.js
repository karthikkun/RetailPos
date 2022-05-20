import React from 'react'
import { Button, Row, Col, Form, Input} from 'antd'
import '../resources/account.css'
import { Link } from 'react-router-dom'

function Login() {
    const onFinish = (values) => {
        console.log(values)
    }
    return (
    <div className='account'>
        <Row>
            <Col lg={8} md={14} xs={20}>
                <Form
                className='account-form'
                layout='vertical' onFinish={onFinish}>
                    <h1><b>Retail POS</b></h1>
                    <hr />
                    <h3>Login</h3>
                <Form.Item name='empId' label='Employee ID'>
                    <Input />
                </Form.Item>
                <Form.Item name='password' label='Password'>
                    <Input type='password'/>
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to='/register'>Didn't register ? Click here to Register</Link>
                    <Button htmlType='submit' type='primary'>Login</Button>
                </div>
                </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Login