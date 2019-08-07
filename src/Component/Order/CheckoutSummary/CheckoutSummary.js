import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary';
const checkoutSummary = (props) => {
    return (
        <div style={{textAlign:'center'}}>
            <h1 >we hope it tastes well!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
export default checkoutSummary;