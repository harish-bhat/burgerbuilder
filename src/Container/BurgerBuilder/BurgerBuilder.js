import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../Component/Burger/Burger';
import BuilderControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../Component/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
   
    state = {
       ingredients: {
        salad:0,
           bacon:0,   
        cheese:0,
           meat:0,        
       },
       totalPrice: 40,
       purchasable: false,
       purchasing: false,
       loading:false
   }
   updatePurchaseState (ingredients) {
       
       const sum = Object.keys(ingredients)
       .map(igKey => {
           return ingredients[igKey];
       })
       .reduce((sum,el) => {
           return sum+el;
       },0);
       this.setState({purchasable:sum>0})
   }
   addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice+priceAddition;
       this.setState({totalPrice: newPrice,ingredients:updatedIngredients})
       this.updatePurchaseState(updatedIngredients);
   }
   removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0) {
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice-priceDeduction;
    this.setState({totalPrice: newPrice,ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
   }
   purchaseHandler = () => {
       this.setState({purchasing: true});
   }
   purchaseCancelHandler = () => {
       this.setState({purchasing: false});
   }
   purchaseContinueHandler = () => {
       //alert('you continue!');
      
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
        search:'?'+queryString
    });
   }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;
        if(this.state.loading) {
            orderSummary=<Spinner/>;
        }
        return( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
                
            </Auxiliary>
        );
    }
} 
export default withErrorHandler(BurgerBuilder,axios);