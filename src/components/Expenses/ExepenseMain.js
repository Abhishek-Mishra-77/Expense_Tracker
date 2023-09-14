import React, { Fragment } from 'react';
import ExpenseForm from './ExpenseForm';
import './ExpenseMain.css'
import NavBar from '../NavBar/NavBar';


const ExepenseMain = (props) => {


    return (
        <Fragment>
            <NavBar />
            <section className='mainH'>
                <ExpenseForm>
                    {props.children}
                </ExpenseForm>

            </section>
        </Fragment>
    )
}


export default ExepenseMain;