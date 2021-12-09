// eslint-disable-next-line no-unused-vars
import { FC, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const getParamsFromObject = (obj: any) => {
  const str = []
  for (const key in obj)
    if (obj[key] !== null && obj[key] !== undefined)
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
  if (!str.length) return ''
  return '?' + str.join('&')
}

interface Props {
  appId?: string

  isDisabled?: boolean
  callback: (res: any) => void

  xfbml?: boolean
  cookie?: boolean
  authType?: string
  scope?: string
  responseType?: string
  returnScopes?: boolean
  redirectUri?: string
  disableMobileRedirect?: boolean
  isMobile?: boolean
  fields?: string
  version?: string
  language?: string
  onFailure?: (res: any) => void
  state?: string
}

const FacebookLogin: FC<Props> = (props) => {
  const {
    children,
    isMobile,
    scope,
    appId,
    returnScopes,
    responseType,
    redirectUri,
    disableMobileRedirect,
    authType,
    state,
    onFailure,
    callback: callbackFunc,
    language,
    fields,
    version,
    xfbml,
    cookie
  } = props
  const [isSdkLoaded, setSdkLoaded] = useState(false)
  console.log('FACEBOOK_APP_ID', process.env.REACT_APP_FACEBOOK_APP_ID)

  useEffect(() => {
    if (!appId) {
      console.error(
        'FacebookLogin need appId to init Facebook Sdk, see https://www.npmjs.com/package/@doopage/react-facebook-login Props for more detail'
      )
      return
    }

    if (document.getElementById('facebook-jssdk')) {
      setSdkLoaded(true)
    } else {
      // @ts-ignore
      window.fbAsyncInit = () => {
        // @ts-ignore
        window.FB.init({
          version: `v${version}`,
          appId,
          xfbml,
          cookie
        })

        setSdkLoaded(true)
      }
      ;((d, s, id) => {
        const element = d.getElementsByTagName(s)[0]
        const fjs = element
        let js = element
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        // @ts-ignore
        js.src = `https://connect.facebook.net/${language}/sdk.js`
        // @ts-ignore
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }
  }, [appId])

  // @ts-ignore
  const checkLoginState = ({ authResponse, status }) => {
    if (authResponse) {
      try {
        // @ts-ignore
        window.FB.api(
          '/me',
          {
            locale: language,
            fields: fields
          },
          (me: any) => callbackFunc({ ...me, ...authResponse })
        )
      } catch (e) {
        callbackFunc(authResponse)
      }
    } else {
      if (onFailure) onFailure({ status })
      else callbackFunc({ status })
    }
  }

  const handleLogin = () => {
    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state,
      return_scopes: returnScopes,
      scope,
      response_type: responseType,
      auth_type: authType
    }

    if (isMobile && !disableMobileRedirect) {
      window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(
        params
      )}`
    } else {
      // @ts-ignore
      if (!window.FB) {
        if (onFailure) onFailure({ status: 'facebookNotLoaded' })
        else callbackFunc({ status: 'facebookNotLoaded' })
      } else {
        // @ts-ignore
        window.FB.getLoginStatus((response) => {
          if (response.status === 'connected') checkLoginState(response)
          else {
            // @ts-ignore
            window.FB.login(checkLoginState, {
              scope,
              return_scopes: returnScopes,
              auth_type: authType
            })
          }
        })
      }
    }
  }

  // @ts-ignore
  return children({
    onClick: handleLogin,
    disabled: !isSdkLoaded
  })
}

FacebookLogin.defaultProps = {
  appId: process.env.REACT_APP_FACEBOOK_APP_ID,
  redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
  scope: 'public_profile,email',
  returnScopes: true,
  xfbml: false,
  cookie: false,
  authType: '',
  fields: 'name',
  version: '12.0',
  disableMobileRedirect: true,
  isMobile: isMobile,
  state: 'facebookdirect',
  language: 'en_US',
  responseType: 'code'
}

export default FacebookLogin
