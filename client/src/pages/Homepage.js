import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'
import { useDispatch } from 'react-redux'

function Homepage() {

  const [itemsData, setItemsData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('fruits')
  
  const categories = [
    {
      name : 'fruits',
      imageUrl : 'https://cdn.pixabay.com/photo/2018/11/08/11/26/apple-3802379__340.jpg'
    },
    {
      name : 'vegetables',
      imageUrl : 'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153__480.jpg'
    },
    {
      name : 'meat',
      imageUrl : 'https://cdn.pixabay.com/photo/2014/06/03/14/29/meat-361270__340.jpg'
    }
  ]
  
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
        <div className='d-flex'>
          {categories.map(e => {
            return <div className={`category d-flex ${selectedCategory == e.name && 'selected-category'}`} onClick={() => setSelectedCategory(e.name)}>
              <h4>{e.name}</h4>
              <img src={e.imageUrl} height='60' width='80'/>
            </div>
          })}
        </div>
        <Row gutter={20}>{itemsData.filter(each => each.category == selectedCategory).map((each) => {
          return <Col xs={24} lg={6} md={12}>
              <Item item={each}/>
          </Col>
        })}</Row>
    </DefaultLayout>
  )
}

export default Homepage