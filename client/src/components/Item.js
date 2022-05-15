import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import '../resources/items.css'

function Item({item}) {
  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch({type : 'ADD_TO_CART', payload : {...item, quantity : 1}})
  }
  return (
    <div className='item'>
        <h4 className='name'>{item.name}</h4>
        <img src={item.image} alt="" height='100' width='100' />
        <h4 className="price"><b>Price : ${item.price}</b></h4>
        <div className="d-flex justify-content-end">
            <Button onClick={() => addToCart()} type='text' danger>Add to cart</Button>
        </div>
    </div>
  )
}

export default Item