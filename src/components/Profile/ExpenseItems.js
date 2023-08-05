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
                <td><button type="button" className="btn btn-info">Remove</button></td>
            </tr>}
        </>
    )
}

export default ExpenseItems;

