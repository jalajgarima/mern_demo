import React from 'react'
import { Alert } from 'react-bootstrap'

const message = ({variant, children}) => {
    return (
        <Alert variant={variant ? variant : 'info' }>
               {children}
        </Alert>
    )
}

export default message
