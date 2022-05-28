import DefaultLayout from '../components/DefaultLayout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { EyeOutlined } from '@ant-design/icons'
import { Form, Modal, Table, Select, Input, Button, } from 'antd'


function Transactions() {
  const [txnsData, setTxnsData] = useState([])
  const [printBillModalVisible, setPrintBillModalVisible] = useState(false)

  const tax = 0
  const subTotal = 0

  const onFinish = (values) => {}
  const dispatch = useDispatch()

  const getAllTransactions = () => {
    dispatch({ type: 'SHOW_LOADING' })
    axios.get('/api/transactions/get-all-txns').then((response) => {
      dispatch({ type: 'HIDE_LOADING' })
      setTxnsData(response.data)
    }).catch(err => {
      dispatch({ type: 'HIDE_LOADING' })
      console.log(err)
    })
  }
  useEffect(() => {
    getAllTransactions()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'CUSTOMER',
      dataIndex: 'customerName'
    },
    {
      title: 'SUB TOTAL',
      dataIndex: 'subTotal'
    },
    {
      title: 'TAX',
      dataIndex: 'tax'
    },
    {
      title: 'TOTAL',
      dataIndex: 'totalAmount'
    },
    {
      title: 'ACTIONS',
      dataIndex: '_id',
      render: (id, record) => <div className='d-flex'>
        <EyeOutlined className='mx-2' onClick={() => { setPrintBillModalVisible(true) }} />
      </div>
    }
  ]

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Transactions</h3>
      </div>
      <Table columns={columns} dataSource={txnsData} bordered></Table>

      {printBillModalVisible && (<Modal
        visible={printBillModalVisible}
        title='Print Bill'
        footer={false}
        onCancel={() => {
          setPrintBillModalVisible(false)
        }}>
        <Form
          initialValues=''
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
          <hr/>
          <h3 className='d-flex justify-content-center'>Total Amount : <b>{tax}</b></h3>
          <div className="d-flex justify-content-end">
            <Button htmlType='submit' type='primary'>Generate Bill</Button>
          </div>
        </Form>
      </Modal>)}

    </DefaultLayout>
  )
}

export default Transactions