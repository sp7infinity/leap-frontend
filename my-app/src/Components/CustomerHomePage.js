import React from 'react'

function customerHomePage() {
  return (
    <>
      <h1>Products</h1>
      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "18rem", marginLeft: "2rem" }}>
          <img class="card-img-top" src="https://images-cdn.ubuy.co.in/65979c2cb910f53d2e6e34ae-3-5cu-ft-compact-refrigerator-mini.jpg" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Fridge</h5>
            <p class="card-text">
              Discounted Price:₹5000 
              <br>
              </br>
              MRP:
              <del>₹10000</del>
              <br></br>
              Discount:50%
            </p>    
            <button class="btn btn-primary smaller-button buy-button" style={{align:"center"}}>Buy</button>
            <button class="btn btn-primary smaller-button" style={{align:"center"}}>Interested</button>
            
          </div>
        </div>
        </div>
       {/* dropdowns will come here gender , agegroup, purchaseFrequency */}
         
      <h1>
        Services
      </h1>
    </>
  )
}

export default customerHomePage