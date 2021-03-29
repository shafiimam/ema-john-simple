import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log('form submitted', data);
        const savedCart = getDatabaseCart()
        const orderDetails = {...loggedInUser,products: savedCart,shipment: data,orderTime: new Date()}

        fetch('https://morning-brook-56076.herokuapp.com/addOrder',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderDetails)
        })
        .then(res=> res.json())
        .then(data =>{
          if(data){
            processOrder()
            alert('order placed successfully')
          }
        })
    };
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    console.log(watch("example")); // watch input value by passing the name of it
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })}placeholder="name" />
        {errors.name && <span className="error">name required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="email"/>
        {errors.email && <span className="error">email is required</span>}
        <input name="address" defaultValue="" ref={register({ required: true })} placeholder="address"/>
        {errors.address && <span className="error">address is required</span>}
        <input name="phone" defaultValue="" ref={register({ required: true })} placeholder="phone"/>
        {errors.phone && <span className="error">phone is required</span>}
        
        <input type="submit" />
      </form>
    )
}

export default Shipment;