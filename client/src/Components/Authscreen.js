import  { useState, useRef } from 'react' ;
import {Box,Stack, Button, TextField, Typography} from '@mui/material';
const Authscreen = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const authFormRef = useRef(null);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <Box
        ref={authFormRef}
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="center"
        alignItems="center"
       height="80vh"

        >
            <Stack
            direction="column"
            spacing={2}
            sx={{ width: '100%', maxWidth: 400 }}
            >
            <Typography align='center' variant="h4">Please  {showLogin ? 'Login' :'Sign Up'} </Typography>
            {!showLogin && (
                <>
                <TextField name="firstName" label="firstName" onChange={handleChange} />
                <TextField name="lastName" label="lastName" onChange={handleChange} />
                </>
            )}
                <TextField name="email" label="Email" type="email" onChange={handleChange} />
                <TextField name="password" label="Password" type="password" onChange={handleChange} />
                <Typography variant="body2"
                color="primary" 
                sx={{cursor: 'pointer'}}
                 onClick={() =>
                     {setShowLogin(!showLogin) 
                    setFormData({})
                        authFormRef.current.reset()
                    }
                    }
                     >
                    {showLogin ? 'Create a new account' : 'Already have an account?'}
                </Typography>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
         
                </Stack>
        </Box>
    )
}

export default Authscreen; 