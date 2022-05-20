import React from 'react'
import { Button, Row, Col, Form, Input} from 'antd'
import '../resources/account.css'
import { Link } from 'react-router-dom'

function Register() {

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
                    <h3>Register</h3>
                <Form.Item name='fullName' label='Full Name'>
                    <Input />
                </Form.Item>
                <Form.Item name='empId' label='Employee ID'>
                    <Input />
                </Form.Item>
                <Form.Item name='password' label='Password'>
                    <Input type='password'/>
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to='/login'>Already registered ? Click here to Login</Link>
                    <Button htmlType='submit' type='primary'>Register</Button>
                </div>
                </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Register