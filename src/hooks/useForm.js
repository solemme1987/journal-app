import { useEffect, useState, useMemo  } from "react"

export const useForm = (initialForm = {}, formValidations = {}) => {

  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])
   

  const isFormValid = useMemo( () => {
    for (const formValue of Object.keys( formValidation )) {
      if (formValidation[formValue] !== null ) return false
    }
    return true
  },[formValidation])


  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,//me agrega todos los campos que tenga el formulario actualmente
      [name]: value // me modifica solo el campo de texto que esta cambiando.
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = () => {

    const formCheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]
      /* console.log(formField) */
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }

    setFormValidation(formCheckedValues)
    /* console.log(formCheckedValues) */
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}
