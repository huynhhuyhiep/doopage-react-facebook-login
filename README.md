# @doopage/react-facebook-login

> Support Login Facebook Component for ReactJS

[![NPM](https://img.shields.io/npm/v/@doopage/react-facebook-login.svg)](https://www.npmjs.com/package/@doopage/react-facebook-login) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @doopage/react-facebook-login
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

## License

MIT © [Huynh Huy Hiep](https://github.com/huynhhuyhiep)
