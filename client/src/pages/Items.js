import DefaultLayout from '../components/DefaultLayout'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'


function Items() {
  const [itemsData, setItemsData] = useState([])
  const [editModalVisible, setEditModalVisible] = useState(false)
  
  const onFinish = (values) => {
    dispatch({type : 'SHOW_LOADING'})
    axios.post('/api/items/add-item', values).then((response) => {
      dispatch({type : 'HIDE_LOADING'})
      setEditModalVisible(false)
      message.success('Item added successfully')
      getAllItems()
    }).catch(err => {
      dispatch({type : 'SHOW_LOADING'})
      message.error('Something went wrong')
      console.log(err)
    })
  }

  const dispatch = useDispatch()

  const getAllItems = () => {
    dispatch({type : 'SHOW_LOADING'})
    axios.get('/api/items/get-all-items').then((response) => {
      dispatch({type : 'HIDE_LOADING'})
      setItemsData(response.data)
    }).catch(err => {
      dispatch({type : 'SHOW_LOADING'})
      console.log(err)
    })
  }  
  useEffect(() => {
    getAllItems()
  }, [])

  const columns = [
    {
      title : 'NAME',
      dataIndex : 'name'
    },
    {
      title : 'CATEGORY',
      dataIndex : 'category',
      filters: [
        {
          text: 'Vegetables',
          value: 'vegetables',
        },
        {
          text: 'Fruits',
          value: 'fruits',
        },
        {
          text: 'Meat',
          value: 'meat',
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (category, record) => record.category == category,
      width: '30%',
    },
    {
      title : 'IMAGE',
      dataIndex : 'image',
      render : (image, record) => <img src={image} height={60} width={60}></img>    
    },
    {
      title : 'PRICE',
      dataIndex : 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title : 'ACTIONS',
      dataIndex : '_id',
      render : (id, record) => <div className='d-flex'>
        <DeleteOutlined className='mx-2'/>
        <EditOutlined className='mx-2'/>
      </div>
    }
  ]

  return (
    <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Items</h3>
          <Button type="primary" onClick={() => setEditModalVisible(true)}>Add Item</Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered></Table>

        <Modal visible={editModalVisible} title='Add new item' footer={false} onCancel={() => setEditModalVisible(false)}>
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item name='name' label='Name'>
                <Input />
              </Form.Item>
              <Form.Item name='price' label='Price'>
                <Input />
              </Form.Item>
              <Form.Item name='image' label='Image URL'>
                <Input />
              </Form.Item>
              <Form.Item name='category' label='Category'>
                <Select>
                  <Select.Option value='vegetables'>Vegetables</Select.Option>
                  <Select.Option value='fruits'>Fruits</Select.Option>
                  <Select.Option value='meat'>Meat</Select.Option>
                </Select>
              </Form.Item>

              <div className="d-flex justify-content-end">
                  <Button htmlType='submit' type='primary'>SAVE</Button>
              </div>


            </Form>
        </Modal>
    
    </DefaultLayout>
  )
}

export default Items