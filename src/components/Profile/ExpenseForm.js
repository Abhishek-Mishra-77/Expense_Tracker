import React, { useEffect, useState } from 'react';
import './ExpenseForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ExpenseItems from './ExpenseItems';

const ExpenseForm = () => {

    const [expenseItems, setExpenseItems] = useState([]);
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredAmount, setEntedAmount] = useState('');
    const [productType, setProducType] = useState('');
    const email = localStorage.getItem('email');
    const isLoggegIn = !!email;


    useEffect(() => {
        if (isLoggegIn) {
            const userEmail = email.replace(/[@.]/g, '');
            const fetchExpense = async () => {
                try {
                    const response = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}.json`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'applications/json'
                        }
                    })

                    if (response.ok) {
                        const data = await response.json();
                        const expenseData = Object.values(data);
                        setExpenseItems(expenseData)
                        console.log(data);
                    }
                    else {
                        const data = await response.json();
                        let errorMessage = 'Fetch fails!';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }

                        throw new Error(errorMessage);
                    }
                }
                catch (error) {
                    console.log(error.message);
                }
            }
            fetchExpense()
        }
    }, [isLoggegIn])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(enteredDescription, enteredAmount, productType)

        const newExpense = {
            enteredAmount,
            enteredDescription,
            productType,
        }
        const newExpenseItems = {
            id: Math.random().toString(),
            ...newExpense,
        }
        setExpenseItems((prevExpense) => {
            const newItem = [...prevExpense, newExpenseItems]
            console.log(newItem)
            return newItem;
        })


        const userEmail = email.replace(/[@.]/g, '');

        try {
            const response = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json'
                },
                body: JSON.stringify({
                    enteredAmount: enteredAmount,
                    enteredDescription: enteredDescription,
                    productType: productType
                })
            })

            if (response.ok) {
                const data = await response.json();
            }
            else {
                const data = await response.json();
                let errroMessage = "Athentication fails!";
                if (data && data.error && data.error.message) {
                    errroMessage = data.error.message;
                }
                throw new Error(errroMessage);
            }
        }
        catch (error) {
            console.log(error.message);
        }



    }

    const Expense = (
        <>
            {expenseItems.map((expense) => (
                <ExpenseItems
                    key={expense.id}
                    enteredDescription={expense.enteredDescription}
                    enteredAmount={expense.enteredAmount}
                    productType={expense.productType}
                />
            ))}
        </>
    )

    useEffect(() => {
        const fetchExpense = JSON.parse(localStorage.getItem('expense'));
        if (fetchExpense) {
            setExpenseItems(fetchExpense);
        }
        else {
            setExpenseItems([]);
        }
    }, [])




    return (
        <div className='row mainSection' style={{ color: 'white' }}>
            <div className='col-4 left-container'>
                <div className='month-container'>
                    <div className='header fs-white'>Your Budget</div>
                    <div className='sub-text fs-white'></div>
                    <div className='budget-container p-2 mt-4'>
                        <span className='month-amount'>₹36.0</span>
                    </div>
                </div>

                <div className='chart-container'>
                    <canvas id='expense-chart'></canvas>
                </div>
            </div>

            <div className='col-7 right-container'>
                <form onSubmit={onSubmitHandler}>
                    <div className='calc-container'>
                        <div className='header fs-dark-grey'>Daily Expense Budget</div>
                        <div className='mt-3 tracking-text text-capitalize sub-text buttom-border'>Tracking Savings 💰</div>
                        <div className='row mt-4'>
                            <div className='col-5'>
                                <input
                                    value={enteredDescription}
                                    onChange={(e) => setEnteredDescription(e.target.value)}
                                    type='text'
                                    className='form-control input-expense-description'
                                    placeholder='Description' />
                            </div>
                            <div className='col-3'>
                                <input
                                    value={enteredAmount}
                                    onChange={(e) => setEntedAmount(e.target.value)}
                                    type='number'
                                    className='form-control input-expense-value'
                                    placeholder='Value' />
                            </div>
                            <div className='col-3'>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Expense Type
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a
                                            onClick={(e) => setProducType('Food')}
                                            className="dropdown-item"
                                            href="#"
                                            value='Food'>Food
                                        </a></li>
                                        <li><a
                                            onClick={(e) => setProducType('Petrol')}
                                            className="dropdown-item"
                                            href="#"
                                            value='Petrol'>Petrol
                                        </a></li>
                                        <li><a
                                            onClick={(e) => setProducType('Salary')}
                                            className="dropdown-item"
                                            href="#"
                                            value='Salary'>Salary
                                        </a></li>
                                        <li><a
                                            onClick={(e) => setProducType('etc')}
                                            className="dropdown-item"
                                            href="#"
                                            value='etc'>etc.
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-1'>
                                <button type='submit' className='btn btn-success btn-submit-expense'>+Expense</button>
                            </div>
                        </div>
                    </div>
                </form>

                <section className='expenseSection'>
                    <main className='table1 mt-5'>
                        <section className='table_header'>
                            <h1 className='headMain'>Your Expenses</h1>
                        </section>
                        <section className='table_body'>
                            <table className="table">
                                <thead className="table-info">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="table-success">
                                    {Expense}
                                </tbody>
                            </table>
                        </section>
                    </main>
                </section>
            </div>
        </div>
    )
}

export default ExpenseForm;