import React, { Fragment } from 'react';
import './ExpenseItem.css';

const ExpenseItems = (props) => {
    return (
        <Fragment>
            <div className="container row mb-3">
                <div className="col-sm-7 mb-3  mb-sm-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{props.productType}</h5>
                            <p className="card-text" style={{ fontWeight: 'bold', color: 'grey' }}>You have spend your money - [{props.enteredDescription}] and the amount is [{props.enteredAmount} Rs]</p>
                            <button onClick={() => props.removeExpenseHandler(props.id)} type="button" className="btn btn-info">Remove</button>
                            <button onClick={() => props.editExpenseHandler(props)} type="button" className="btn btn-info" style={{ marginLeft: '2rem' }}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}


export default ExpenseItems;

