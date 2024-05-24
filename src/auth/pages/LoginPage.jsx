import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google, Login } from "@mui/icons-material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth"
import { useMemo } from "react"

export const LoginPage = () => {

  const { status } = useSelector(state => state.auth)

  const istAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useDispatch()

  const { email, password, onInputChange, formState } = useForm({
    email: 'ricardo.cortes@gmail.com',
    password: '123456'
  })



  const onSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
    dispatch(checkingAuthentication())
  }

  const onGoogleSinging = () => {
    console.log('Login con google')
    dispatch(startGoogleSignIn())
  }

  return (

    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>

          {/*  */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type="email"
              placeholder="user@domain.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          {/*  */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={istAuthenticating}
                type='submit'
                variant="contained"
                fullWidth
              >
                <Login />
                <Typography sx={{ ml: 1 }}>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={istAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSinging}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end' >
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear Cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}