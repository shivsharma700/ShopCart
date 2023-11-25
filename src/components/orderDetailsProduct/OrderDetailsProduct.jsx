import React from 'react'

const OrderDetailsProduct = ({title, price, image, quantity, onRemove, onUpdate}) => {
   
   const quantityAvailable = [1,2,3,4,5,6,7,8,9,10];

  return (
       <>
          <div className="order-details-product d-flex flex-row">
          <div className="order-details-product-img d-flex">
             <img src={image}/>
          </div>
          <div className="order-details-product-data d-flex flex-column">
             <div>{title}</div>
             <div>&#8377; {price}</div>
          </div>
          <div className="order-details-product-actions d-flex flex-column">
            <div className="order-details-product-quantity">
              <div className="fw-bold">Quantity</div>
              <div className="form-group">
                 <select onChange={e => onUpdate(e.target.value)} className="form-select">
                    {quantityAvailable.map(id => <option  selected= {quantity == id} key= {id} value= {id} >{id}</option>)}
                 </select>
              </div>
            </div>
            <button onClick={onRemove} className="order-details-product-remove btn btn-danger" >Remove</button>
          </div>
          </div>
          <hr />
       </>
  )
}

export default OrderDetailsProduct