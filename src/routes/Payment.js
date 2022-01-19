import React from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";


import { useNavigate } from 'react-router-dom';

import 'firebase/compat/database';
import '../css/Payment.css';

import { Paypal } from "../components";

const client = {
    sandbox: 'AVNa0_zx-Gu0wgMK3hp8wUZ7ciOn3WolI8m9hDoP6AUuaXqxAWQq4Qyyh3KfKau4hP1IQLRrYpPUO_3D',
    production: 'fxxxx'
}

const env = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

const total = 0.1;

const currency = 'USD';

const onError = (error) => {
    console.log('error', error);
}

const onCancel = data => {
    console.log('payement annulé ', data)
}

const Payment = props => {
    const navigate = useNavigate();

    // create onSuccess inside Payment to can use navigate to home component after success 
    const onSuccess = (payment) => {
        console.log('payement réussi');
        const userF = firebase.auth().currentUser;

        const auth = getAuth();
        const user = auth.currentUser;

        console.log('userF :', userF, 'user ', user)

        const dbRef = firebase.database().ref(`users/${user.uid}`);
        console.log(dbRef)
        const now = new Date();
        const newDate = now.setDate(now.getDate() + 30);
        console.log('newDate : ', newDate);
        dbRef.set({ validUntil: newDate })
            .then(() => {
                console.log('opération réussie ')
                //  this.props.history.push({ pathname: '/' })
                return navigate('/')
            })
            .catch(err => {
                console.log('error ', err)
            })

    }
    return (
        <Paypal
            client={client}
            env={env}
            total={total}
            currency={currency}
            onError={onError}
            onCancel={onCancel}
            onSuccess={onSuccess}
        />
    )
}

export { Payment };