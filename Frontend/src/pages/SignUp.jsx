//*Module functions
import { useEffect, useState } from 'react';

//*CSS
import '../index.css';
import './css/SignUp.css'

//*Componenets
import GemiTextbox from '../modules/GemiText';

function SignUp(){
    return (
        <>
            <h1>Sign up here!</h1>
            <GemiTextbox/>
        </>
    )
}

export default SignUp
