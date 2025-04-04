import { createContext, useEffect,useState } from 'react';


export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const verifyJwtToken=async()=>
  {   
          try {
              
              const response = await fetch(`${API_URL}/api/users/verify`, {
                  method: 'GET',
                  credentials: 'include', // Include cookies in the request
              });
              
              if (response.ok) {
                  const data = await response.json();
                  console.log(data.user)
                  setUser(data.user);
              } 
           
          } catch (error) {
            setUser(null);
              console.error('Token validation/refresh failed:', error);
            
          }
          finally {
            setLoading(false); 
          }
      }
  useEffect(() => {

        verifyJwtToken();

  }, []);

  
  return (
    <AuthContext.Provider value={{user,setUser,loading }}>
      { children }
    </AuthContext.Provider>
  )
};

