import React, { useEffect, useState } from 'react';
import './ExpenseForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ExpenseItems from './ExpenseItems';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/expenseReducer';
import { themeActions } from '../../store/themeReducer';


const ExpenseForm = () => {

    const [expenseItems, setExpenseItems] = useState([]);
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredAmount, setEntedAmount] = useState('');
    const [productType, setProducType] = useState('');
    const [takeId, setTakeId] = useState('');
    const email = localStorage.getItem('email');
    const isLoggegIn = !!email;
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.amount.totalAmount);
    const allExpenses = useSelector(state => state.amount.allExpenses);
    const activePremium = useSelector(state => state.active.active)
    const toggleTheme = useSelector(state => state.active.theme)




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
                        if (data) {
                            const expenseData = Object.values(data);
                            let totalAmount = 0;
                            for (const data in expenseData) {
                                const price = parseInt(expenseData[data].enteredAmount)
                                totalAmount = totalAmount + price;
                            }
                            setExpenseItems(expenseData)
                            dispatch(expenseActions.expenseAmount(totalAmount))
                            dispatch(expenseActions.allExpenses(expenseData))
                        }
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
    }, [isLoggegIn, enteredAmount, totalAmount])


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const newExpense = {
            enteredAmount,
            enteredDescription,
            productType,
        }

        const userEmail = email.replace(/[@.]/g, '');


        if (takeId) {
            setExpenseItems((prevExpense) => {
                const updatedExpense = prevExpense.map((expense) => {
                    if (expense.id === takeId) {
                        return {
                            ...expense,
                            enteredAmount: enteredAmount,
                            enteredDescription: enteredDescription,
                            productType: productType
                        }
                    }
                    return expense;
                })
                return updatedExpense;
            })


            try {
                const response = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'applications/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    const dataItem = Object.values(data).find((item) => item.id === takeId);
                    const uniqueId = Object.keys(data).find((key) => data[key] === dataItem)

                    const response1 = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}/${uniqueId}.json`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'applications/json'
                        },
                        body: JSON.stringify({
                            id: takeId,
                            enteredAmount: enteredAmount,
                            enteredDescription: enteredDescription,
                            productType: productType
                        })
                    })

                    if (response1.ok) {
                        const data = await response1.json();
                        console.log(data);
                    }
                    else {
                        const data = await response1.json();
                        let errorMessage = 'Request fails!';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    }
                }
            }
            catch (error) {
                alert(error.message)
                console.log(error.message)
            }

        }
        else {
            const newExpenseItems = {
                id: Math.random().toString(),
                ...newExpense,
            }
            setExpenseItems((prevExpense) => {
                const newItem = [...prevExpense, newExpenseItems]
                return newItem;
            })


            try {
                const response = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applications/json'
                    },
                    body: JSON.stringify({
                        enteredAmount: newExpenseItems.enteredAmount,
                        enteredDescription: newExpenseItems.enteredDescription,
                        id: newExpenseItems.id,
                        productType: newExpenseItems.productType
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





        setEntedAmount('');
        setEnteredDescription('');
        setProducType('');

    }


    const removeExpenseHandler = async (id) => {
        setExpenseItems((expenseItems) => {
            const newExpenses = expenseItems.filter((expense) => expense.id !== id);
            return newExpenses;
        })

        const userEmail = email.replace(/[@.]/g, '');

        try {
            const response = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'applications/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                const dataItem = Object.values(data).find((item) => item.id === id);
                const uniqueId = Object.keys(data).find((key) => data[key] === dataItem);

                const response1 = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}/${uniqueId}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'applications/json'
                    }
                })


                if (response1.ok) {
                    const data = await response1.json();
                }
                else {
                    const data = await response.json();
                    let errorMessage = 'Fetching data fails!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }
            }
        }
        catch (error) {
            console.log(error.message)
        }

    }


    const editExpenseHandler = (expense) => {
        const { enteredDescription, enteredAmount, productType, id } = expense;
        setTakeId(id)
        setEnteredDescription(enteredDescription)
        setEntedAmount(enteredAmount)
        setProducType(productType)
    }




    const Expense = (
        <>
            {expenseItems.map((expense) => (
                <ExpenseItems
                    key={expense.id}
                    enteredDescription={expense.enteredDescription}
                    enteredAmount={expense.enteredAmount}
                    productType={expense.productType}
                    id={expense.id}
                    removeExpenseHandler={removeExpenseHandler}
                    editExpenseHandler={editExpenseHandler}
                />
            ))}
        </>
    )



    const onExpenseHandler = () => {
        dispatch(themeActions.activePrimium())
    }

    const onToggleHandler = () => {
        dispatch(themeActions.themeToggle())

        if (toggleTheme) {
            document.body.style.background = 'black'
        }
        else {
            document.body.style.background = "linear-gradient(90deg, rgb(27, 23, 101) 0%, rgba(0, 212, 255, 1) 100%, rgba(0, 212, 255, 1) 100%)";
        }
    }


    const onExpenseDataHandler = () => {
        const a2 = document.getElementById('a2');

        const dataFile = JSON.stringify(allExpenses);

        const blob = new Blob([dataFile], { type: 'application/json' });
        console.log(blob)
        a2.href = URL.createObjectURL(blob)
    }





    return (
        <div className='row mainSection' style={{ color: 'white' }}>
            <div className='col-4 left-container'>
                <div className='month-container'>
                    {activePremium && <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox" role="switch"
                            id="flexSwitchCheckDefault"
                            onClick={onToggleHandler} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">theme</label>
                    </div>}
                    <div className='header fs-white'>Your Budget</div>
                    <div className='sub-text fs-white'></div>
                    <div className='budget-container p-2 mt-4'>
                        <span className='month-amount'>₹{totalAmount}</span>
                        {totalAmount > 10000 && <button onClick={onExpenseHandler} style={{ marginLeft: '2rem' }} type="button" className="btn btn-success">Activate Premium</button>}
                    </div>
                    {activePremium && <div className='budget-container  mt-4'>
                        <a id='a2' download={'ExpenseData.csv'} onClick={onExpenseDataHandler} className='month-amount'>Download</a>
                    </div>}
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
                                    placeholder='Description'
                                    required />
                            </div>
                            <div className='col-3'>
                                <input
                                    value={enteredAmount}
                                    onChange={(e) => setEntedAmount(e.target.value)}
                                    type='number'
                                    className='form-control input-expense-value'
                                    placeholder='Value'
                                    required />
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
                                            required
                                            value='Food'>Food
                                        </a></li>
                                        <li><a
                                            onClick={(e) => setProducType('Petrol')}
                                            className="dropdown-item"
                                            required
                                            value='Petrol'>Petrol
                                        </a></li>
                                        <li><a
                                            required
                                            onClick={(e) => setProducType('Salary')}
                                            className="dropdown-item"
                                            value='Salary'>Salary
                                        </a></li>
                                        <li><a
                                            required
                                            onClick={(e) => setProducType('etc')}
                                            className="dropdown-item"
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
                            <div>
                                <h1 className='headMain'>Your Expenses</h1>
                            </div>
                        </section>
                        <section className='table_body'>
                            <table className="table">
                                <thead className="table-info">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Remove Expense</th>
                                        <th scope="col">Edit Expense</th>
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