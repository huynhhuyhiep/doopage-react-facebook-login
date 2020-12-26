import React from 'react'
import FacebookLogin from '@doopage/react-facebook-login'
import { Button } from '@doopage/react-ui-kit'

const App = () => {
  const responseFacebook = (response: any) => {
    console.log('responseFacebook', response)
    // do something
  }

  return (
    <>
      Put your facebook app id into env file or pass into FacebookLogin
      component as a props before run this example
      <FacebookLogin
        callback={responseFacebook}
        fields='name,email,picture'
        scope='public_profile,email,pages_messaging_subscriptions'
      >
        {({ onClick, disabled }: any) => {
          return (
            <Button color='info' onClick={onClick} disabled={disabled}>
              Đăng nhập Facebook
            </Button>
          )
        }}
      </FacebookLogin>
    </>
  )
}
export default App
