import React, { Fragment, useEffect, useState } from 'react';
import './ExpenseForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ExpenseItems from './ExpenseItems';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/expenseReducer';
import { themeActions } from '../../store/themeReducer';



const ExpenseForm = () => {


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
                            const expenseId = Object.keys(data);
                            let totalAmount = 0;
                            for (let i = 0; i < expenseData.length; i++) {
                                const newObj = {
                                    enteredAmount: expenseData[i].enteredAmount,
                                    enteredDescription: expenseData[i].enteredDescription,
                                    productType: expenseData[i].productType,
                                    id: expenseId[i]
                                }
                                const price = parseInt(expenseData[i].enteredAmount)
                                totalAmount = totalAmount + price;
                                dispatch(expenseActions.allExpenses(newObj))
                            }
                            dispatch(expenseActions.expenseAmount(totalAmount))
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
        const userEmail = email.replace(/[@.]/g, '');


        if (takeId) {
            const expenseData = allExpenses.find((expense) => expense.id === takeId);
            const uniqueId = expenseData.id;
            try {
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
            catch (error) {
                console.log(error)
            }
        }
        else {
            if (enteredAmount !== '' && enteredDescription !== '') {
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
                        const { name } = data;
                        const obj = {
                            enteredAmount: enteredAmount,
                            enteredDescription: enteredDescription,
                            productType: productType,
                            id: name
                        }
                        dispatch(expenseActions.allExpenses(obj))
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
            else {
                alert('please fill all the fields!')
            }
        }

        setEntedAmount('');
        setEnteredDescription('');
        setProducType('');
    }




    const removeExpenseHandler = async (id) => {
        const userEmail = email.replace(/[@.]/g, '');
        dispatch(expenseActions.expenseRemove(id));
        try {
            const response1 = await fetch(`https://expense-tracker-40eba-default-rtdb.firebaseio.com/expense${userEmail}/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'applications/json'
                },
            })

            if (response1.ok) {
                const data = await response1.json();
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
        catch (error) {
            console.log(error)
        }
    }




    const editExpenseHandler = (expense) => {
        const { enteredDescription, enteredAmount, productType, id } = expense;
        setTakeId(id)
        setEnteredDescription(enteredDescription)
        setEntedAmount(enteredAmount)
        setProducType(productType)
    }

    const onExpenseHandler = () => {
        dispatch(themeActions.activePrimium())
    }

    const onExpenseDataHandler = () => {
        const a2 = document.getElementById('a2');

        const dataFile = JSON.stringify(allExpenses);

        const blob = new Blob([dataFile], { type: 'application/json' });
        console.log(blob)
        a2.href = URL.createObjectURL(blob)
    }


    const Expense = (
        <Fragment>
            {allExpenses.map((expense) => (
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
        </Fragment>
    )





    return (
        <Fragment>
            <div className='container gap-4  activaePlan'>
                <div className="card mb-4 cardexpense" style={{ color: 'grey', marginTop: '2rem' }}>
                    <h2 className="card-header">Add Your Daily Expenses <span>KAre</span></h2>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={onSubmitHandler}>
                            <div className="col-md-6">
                                <label className='mb-3'>Description</label>
                                <input
                                    value={enteredDescription}
                                    onChange={(e) => setEnteredDescription(e.target.value)}
                                    type='text'
                                    placeholder='enter your description'
                                    className="form-control"
                                    id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <label className='mb-3' style={{ color: 'white' }}>Amount</label>
                                <input
                                    value={enteredAmount}
                                    onChange={(e) => setEntedAmount(e.target.value)}
                                    type='number'
                                    placeholder='enter your amount'
                                    className="form-control"
                                    id="inputPassword4" />
                            </div>
                            <div className="dropdown">
                                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Expense Type
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a
                                        onClick={(e) => setProducType('Food')}
                                        className="dropdown-item"
                                        required
                                        value='Food'
                                        href="#">Food</a>
                                    </li>
                                    <li><a
                                        onClick={(e) => setProducType('Petrol')}
                                        className="dropdown-item"
                                        required
                                        value='Petrol'
                                    >Petrol</a>
                                    </li>
                                    <li><a
                                        onClick={(e) => setProducType('Travel')}
                                        className="dropdown-item"
                                        required
                                        value='Travel'
                                    >Travel</a>
                                    </li>
                                    <li><a
                                        required
                                        onClick={(e) => setProducType('Something else here')}
                                        className="dropdown-item"
                                        value='etc' >Something else here</a>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-1'>
                                <button type='submit' className='btn btn-success btn-submit-expense'>+Expense</button>
                            </div>
                            <div className='container'>
                                {totalAmount >= 10000 && <div className="card text-bg-success text-end" style={{ maxWidth: 'fit-content', float: 'right', fontWeight: 'bold' }}>
                                    <button onClick={onExpenseHandler} type="button" style={{ fontWeight: 'bold' }} className="btn btn-success">{`₨ - ${totalAmount || 0} Activate Premium`}</button>
                                </div>}
                                {activePremium && <div className='budget-container mt-4'>
                                    <a type="button" className="btn btn-primary" id='a2' download={'ExpenseData.csv'} onClick={onExpenseDataHandler}>Download Prime</a>
                                </div>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='expenseItems '>
                    {Expense}
                </div>
            </div >
        </Fragment>
    )

}


export default ExpenseForm;