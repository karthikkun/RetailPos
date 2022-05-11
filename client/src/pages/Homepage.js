import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'
import { useDispatch } from 'react-redux'

function Homepage() {

  const [itemsData, setItemsData] = useState([])
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