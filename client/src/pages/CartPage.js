import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Form, Modal, Select, Input, Button, Table, message } from 'antd'


function CartPage() {
  const dispatch = useDispatch()
  const increaseQuantity = (record) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...record, quantity: record.quantity + 1 }
    })
  }
  const decreaseQuantity = (record) => {
    if (record.quantity != 1)
      dispatch({
        type: 'UPDATE_CART',
        payload: { ...record, quantity: record.quantity - 1 }
      })
  }
  const deleteFromCart = (record) => {
    dispatch({
      type: 'DELETE_FROM_CART',
      payload: record
    })
  }

  const { cartItems } = useSelector(state => state.rootReducer)
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name'
    },
    {
      title: 'IMAGE',
      dataIndex: 'image',
      render: (image, record) => <img src={image} height={60} width={60}></img>
    },
    {
      title: 'PRICE',
      dataIndex: 'price'
    },
    {
      title: 'QUANTITY',
      dataIndex: '_id',
      render: (id, record) => <div>
        <PlusCircleOutlined className='mx-3' onClick={() => increaseQuantity(record)} />
        <b>{record.quantity}</b>
        <MinusCircleOutlined className='mx-3' onClick={() => decreaseQuantity(record)} />
      </div>
    },
    {
      title: 'ACTIONS',
      dataIndex: '_id',
      render: (id, record) => <DeleteOutlined onClick={() => deleteFromCart(record)} />
    }
  ]

  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  
  useEffect(() => {
    let sum = 0
    cartItems.forEach(item => { sum += item.quantity * item.price })
    setSubTotal(sum)
  }, [cartItems])

  useEffect(() => {
    let tax = Number(((subTotal / 100) * 10).toFixed(2))
    setTax(tax)
  }, [subTotal])

  const [transactionChargeModalVisible, setTransactionChargeModalVisible] = useState(false)


  const onFinish = (values) => {
    axios.post('/api/transactions/charge-txn',
      {
        ...values,
        subTotal,
        tax: tax,
        totalAmount: subTotal + tax,
        userId: JSON.parse(localStorage.getItem('pos-user'))._id,
        cartItems
      }).then((response) => {
        dispatch({ type: 'HIDE_LOADING' })
        setTransactionChargeModalVisible(false)
        message.success('Bill charged successfully')
      }).catch(err => {
        dispatch({ type: 'HIDE_LOADING' })
        setTransactionChargeModalVisible(false)
        message.error('Something went wrong')
        console.log(err)
      })
  }

  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartItems} bordered pagination={false} />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end br-12">
        <h3>SUB TOTAL : <b>{subTotal} $/-</b></h3>
        <Button type='primary' onClick={() => { setTransactionChargeModalVisible(true) }}>Charge Transaction</Button>
      </div>
      {transactionChargeModalVisible && (<Modal
        visible={transactionChargeModalVisible}
        title='Charge Transaction'
        footer={false}
        onCancel={() => {
          setTransactionChargeModalVisible(false)
        }}>
        <Form
          layout='vertical' onFinish={onFinish}>
          <Form.Item name='customerName' label='Customer Name'>
            <Input />
          </Form.Item>
          <Form.Item name='customerPhone' label='Customer Phone'>
            <Input />
          </Form.Item>
          <Form.Item name='paymentMode' label='Payment Mode'>
            <Select>
              <Select.Option value='cash'>Cash</Select.Option>
              <Select.Option value='card'>Card</Select.Option>
            </Select>
          </Form.Item>
          <h4>SubTotal: <b>{subTotal}</b></h4>
          <h4>Tax: <b>{tax}</b></h4>
          <hr />
          <h3 className='d-flex justify-content-center'>Total Amount : <b>{subTotal + tax}</b></h3>
          <div className="d-flex justify-content-end">
            <Button htmlType='submit' type='primary'>Generate Bill</Button>
          </div>
        </Form>


      </Modal>)}
    </DefaultLayout>
  )
}
export default CartPage