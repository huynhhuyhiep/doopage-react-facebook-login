// eslint-disable-next-line no-unused-vars
import { ChangeEvent, FC, useEffect, useState } from 'react'
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
  state?: string
  isDisabled?: boolean
  callback: (res: any) => void
  appId?: string
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
  onClick: (e?: ChangeEvent) => void
  onFailure?: (res: any) => void
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
    fields
  } = props
  const [isSdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    const { appId, xfbml, cookie, version } = props

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
        js.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }
  }, [])

  // @ts-ignore
  const checkLoginState = ({ authResponse, status }) => {
    if (authResponse) {
      // @ts-ignore
      window.FB.api(
        '/me',
        {
          locale: language,
          fields: fields
        },
        (me: any) => callbackFunc({ ...me, ...authResponse })
      )
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
  appId: process.env.FACEBOOK_APP_ID,
  redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
  scope: 'public_profile,email',
  returnScopes: true,
  xfbml: false,
  cookie: false,
  authType: '',
  fields: 'name',
  version: '9.0',
  disableMobileRedirect: true,
  isMobile: isMobile,
  state: 'facebookdirect',
  language: 'en_US',
  responseType: 'code'
}

export default FacebookLogin
