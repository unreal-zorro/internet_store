import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((jwtToken, id, isAdministrator) => {
    setToken(jwtToken)
    setUserId(id)
    setIsAdmin(isAdministrator)
    
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, isAdmin: isAdministrator
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsAdmin(false)

    localStorage.removeItem(storageName)
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin)
    }
  }, [login]);


  return { login, logout, token, userId, isAdmin }
}
