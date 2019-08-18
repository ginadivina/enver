import { MoneyButtonClient, AuthError as MoneyButtonAuthError } from '@moneybutton/api-client'
import React from 'react'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

/**
 *
 */
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28'

let moneyButtonClient = null

/**
 *
 */
export default class Oauth extends React.Component {

    async componentDidMount () {
        moneyButtonClient = new MoneyButtonClient(
            OAUTH_IDENTIFIER
        )
        await moneyButtonClient.handleAuthorizationResponse();
        const moneyButtonId = await moneyButtonClient.getIdentity();
        window.location = '/'
    }

    render () {
        return (
            <>
                <h4>Redirecting ...</h4>
            </>
        )
    }
}
