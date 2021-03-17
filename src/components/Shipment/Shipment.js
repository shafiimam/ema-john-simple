import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { userContext } from '../../App';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log('form submitte', data);
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