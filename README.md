# @doopage/react-facebook-login

> Support Login Facebook Component for ReactJS

[![NPM](https://img.shields.io/npm/v/@doopage/react-facebook-login.svg)](https://www.npmjs.com/package/@doopage/react-facebook-login) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

For more related information such as **appId**, see https://developers.facebook.com/docs/facebook-login/web/
## Install

```bash
npm install --save @doopage/react-facebook-login
```

or

```bash
yarn add @doopage/react-facebook-login
```

## Usage

```tsx
import FacebookLogin from '@doopage/react-facebook-login'
import { Button } from "@doopage/react-ui-kit";

const Example = () => {
  const responseFacebook = (response) => {
    console.log("responseFacebook", response);
    // do something
  }

  return (
    <FacebookLogin
      appId={'YOUR_FB_APP_ID'}
      callback={responseFacebook}
      fields="name,email,picture"
      scope="public_profile,email,pages_messaging_subscriptions"
    >
      {({ onClick, disabled }) => {
        return (
          <Button
            color="info"
            onClick={onClick}
            disabled={disabled}
          >
            Đăng nhập Facebook
          </Button>
        );
      }}
    </FacebookLogin>)
}
```

## Props

|    params    |required|    type           | default |              description                  |
|:------|:-------------------:|:-------------------|:-------------------|:---------------------------------------------------|
|     appId    |x|     string          | process.env.FACEBOOK_APP_ID |                Facebook app id                            |
|     scope    | |     string          |public_profile,email|      public_profile, email, user_birthday           |
|     fields   | |    string          |              name                     |
|   callback   |x|     function        |             resultFacebookLogin                     |
| returnScopes | |     boolean         |                  true                              |
|     xfbml    | |     boolean         |                  false                              |
|    cookie    | |     boolean         |                  false                              |
| redirectUri  | |     string          |               window.location.href  |
|   language   | |     string          |                  en_US                              |
|   onClick    | |    function        |                  Initial click on the component     |
|   isMobile   | |    boolean         |                  detected via userAgent             |use **isMobile** of isreact-device-detect to detect|
| disableMobileRedirect | |    boolean     |                        true                        | set to true for popup authentication on mobile devices |
|   onFailure  | |    function        | optional function to separatere the failed init     |
|   state  | |   string        | optional string to maintain state between the request and callback. This parameter should be used for preventing Cross-site Request Forgery and will be passed back to you, unchanged, in your redirect URI, default is facebookdirect     |
| authType | | string | optional string to change authentication type |
| responseType | | string | optional string to change response type. Default value is 'code' |
| version | | string | Graph API version, default is 9.0 |
## License

MIT © [Huynh Huy Hiep](https://github.com/huynhhuyhiep)
