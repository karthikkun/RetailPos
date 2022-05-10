import { Divider, Table } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons'

function CartPage() {
  const dispatch = useDispatch()
  const increaseQuantity = (record) => {
    dispatch({
      type : 'UPDATE_CART',
      payload : {...record, quantity : record.quantity + 1}
    })
  }
  const decreaseQuantity = (record) => {
    if(record.quantity != 1)
      dispatch({
        type : 'UPDATE_CART',
        payload : {...record, quantity : record.quantity - 1}
      })
  }
  const deleteFromCart = (record) => {
    dispatch({
      type : 'DELETE_FROM_CART',
      payload : record
    })
  } 

  const {cartItems} = useSelector(state => state.rootReducer)
  const columns = [
    {
      title : 'NAME',
      dataIndex : 'name'
    },
    {
      title : 'IMAGE',
      dataIndex : 'image',
      render : (image, record) => <img src={image} height={60} width={60}></img>    
    },
    {
      title : 'PRICE',
      dataIndex : 'price'
    },
    {
      title : 'QUANTITY',
      dataIndex : '_id',
      render : (id, record) => <div>
        <PlusCircleOutlined className='mx-3' onClick={() => increaseQuantity(record)}/>
        <b>{record.quantity}</b>
        <MinusCircleOutlined className='mx-3' onClick={() => decreaseQuantity(record)}/>
      </div>
    },
    {
      title : 'ACTIONS',
      dataIndex : '_id',
      render : (id, record) => <DeleteOutlined onClick={() => deleteFromCart(record)} />
    }
  ]

  return (
    <DefaultLayout>
        <h3>Cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered/>
    </DefaultLayout>
  )
}
export default CartPage