import React from 'react';
import './ExpenseItem.css';

const ExpenseItems = (props) => {


    return (
        <>
            {<tr>
                <th scope="row">*</th>
                <td>{props.enteredDescription}</td>
                <td>{props.productType}</td>
                <td>₹{props.enteredAmount}</td>
                <td><button onClick={() => props.removeExpenseHandler(props.id)} type="button" className="btn btn-info">Remove</button></td>
                <td><button onClick={() => props.editExpenseHandler(props)} type="button" className="btn btn-info">Edit</button></td>
            </tr>}
        </>
    )
}

export default ExpenseItems;

