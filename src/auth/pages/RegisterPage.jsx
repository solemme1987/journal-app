import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { PersonAddAlt } from "@mui/icons-material"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth"

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {

  // La que esta comentada es la del curso  la otra es la mia
  // email: [(value) => value.includes('@'), 'El correo debe tener una arroba'],
  email: [(value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
  }, 'Correo Debe tener un formato válido'],

  // password: [(value) => value.length >= 6, 'El password debe tener mas de 6 letras'],
  password: [
    (value) => {
      // Expresión regular para validar el formato de una contraseña
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.{8,})/;
      return passwordRegex.test(value);
    },
    'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un carácter especial y un número'
  ],
  /* password: [(value) => value.length >= 6, 'El password debe tener mas de 6 letras'], */
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAutentication = useMemo(() => status === 'checking', [status])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations)



  const onSubmit = (event) => {

    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return;// si el formulario no es valido, hasta aqui llega el codigo

    dispatch(startCreatingUserWithEmailPassword(formState))

  }

  return (

    <AuthLayout title='Crear una cuenta'>
      {/* <h1>Formulario: {isFormValid ? 'Válido' : 'Invalido'}</h1> */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

          {/* Nombre */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type="text"
              placeholder="Escriba su nombre"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          {/* Correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo electrónico'
              type="email"
              placeholder="user@domain.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}

            />
          </Grid>

          {/*  Password */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Constraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            >
            </TextField>
          </Grid>

          {/* Botones  */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}// si el erro viene muestra el mensaje 
                                                    // si no viene pone display:none
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} >
              <Button
                disabled={isCheckingAutentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                <PersonAddAlt />
                <Typography sx={{ ml: 1 }}>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }}> ¿Ya tienes cuenta ? </Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
