import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: {
        errors
    }} = useForm();

    const { signup, isAuthenticated, errors: RegisterErrors} = useAuth();

    useEffect(() => {
      if (isAuthenticated) navigate('/')
    }, [isAuthenticated, navigate])
    

    const onSubmit = handleSubmit( async (values) =>{
        signup(values);
    })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
            RegisterErrors.map((error, i) => (
                <div className='bg-red-500 p-2 text-white' key={i}>
                    {error}
                </div>
            ))
        }
      <h1 className="text-2xl font-bold">Register</h1>
        <form 
            onSubmit={onSubmit}
        >
            <input type="text" 
                {...register('username', {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Username'
            />
            {
                errors.username && <p className='text-red-500'>Username is required</p>
            }
            <input type="email"
                {...register('email', {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Email'
            />
            {
                errors.email && <p className='text-red-500'>Email is required</p>
            }
            <input type="password"
                {...register('password', {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Password'
            />
            {
                errors.password && <p className='text-red-500'>Password is required</p>
            }
            <button>
                Registrar
            </button>
        </form>
        <p className="flex gap-x-2 justify-between">
        ¿Ya tienes una cuenta? <Link to='/register' className="text-sky-500">Iniciar sesión</Link>
      </p>
    </div>
  )
}
