import React from 'react'
import Alert from 'react-bootstrap/Alert';

const DefaultAlert = (props) => {

    return (
        <>
        {/* {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => ( */}
          <Alert variant={props.variant}>
            {props.message}
          </Alert>
        {/* ))} */}
      </>
    )
}

export default DefaultAlert
