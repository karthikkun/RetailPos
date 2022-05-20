import React, {useEffect} from 'react'
import { Button, Row, Col, Form, Input, message} from 'antd'
import '../resources/account.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = (values) => {
        dispatch({type : 'SHOW_LOADING'})
        axios.post('/api/user/register', values).then(res => {
            dispatch({type : 'HIDE_LOADING'})
            message.success('user registration successfully')
        }).catch(err => {
            dispatch({type : 'HIDE_LOADING'})
            message.error('something went wrong')
            console.log(err)
        })
    }

    useEffect(() => {
        if(localStorage.getItem('pos-user'))
            navigate('/home')
    },[])

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