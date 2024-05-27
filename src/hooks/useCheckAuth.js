import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"


export const useCheckAuth = () => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, photoURL, displayName } = user
      dispatch(login({ uid, email, photoURL, displayName }) )
    })
  }, [])


  return status
  
}
