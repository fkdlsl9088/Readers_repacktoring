import React, { useCallback, useEffect } from 'react'
import Button from '../Button'
import { FormWrapper, InputWarrper } from './accountStyles'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../../reducers/user'
import useInput from '../../custom_hooks/useInput'
import Router from 'next/router'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const { logInError, me } = useSelector(state => state.user)

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault()
      dispatch(loginRequestAction({ email, password }))
    },
    [email, password]
  )

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  useEffect(() => {
    if (me) {
      Router.replace('/')
    }
  }, [me])

  return (
    <FormWrapper onSubmit={onSubmitForm}>
      <InputWarrper
        type="email"
        name="email"
        placeholder="이메일 주소"
        value={email}
        onChange={onChangeEmail}
      />
      {/* {errors.email && <p>{errors.email}</p>} */}

      <InputWarrper
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
      />
      {/* {errors.password && <p>{errors.password}</p>} */}

      <Button size="large" type="submit">
        로그인
      </Button>
    </FormWrapper>
  )
}

export default LoginForm
