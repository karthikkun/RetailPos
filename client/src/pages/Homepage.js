import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'

function Homepage() {

  const [itemsData, setItemsData] = useState([])
  const getAllItems = () => {

    axios.get('/api/items/get-all-items').then((response) => {
        // console.log(response.data)
        setItemsData(response.data)
    }).catch(err => console.log(err))
  }  
  useEffect(() => {
    getAllItems()
  }, [])

  useEffect(() => {
    // console.log('itemsData changed')
    // console.log(itemsData)
  }, [itemsData]);

  return (
    <DefaultLayout>
        <Row gutter={20}>{itemsData.map((each) => {
          return <Col xs={24} lg={6} md={12}>
              <Item item={each}/>
          </Col>
        })}</Row>
    </DefaultLayout>
  )
}

export default Homepage