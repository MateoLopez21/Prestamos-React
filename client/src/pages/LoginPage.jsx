import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const LoginPage = () => {

  const { register, handleSubmit, formState: {
    errors
  } } = useForm();

  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        onSubmit={onSubmit}
      >
        {
          signinErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white' key={i}>
              {error}
            </div>
          ))
        }
        <input type="email"
          {...register('email', { required: true })}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='Email'
        />
        {
          errors.email && <p className='text-red-500'>Email is required</p>
        }
        <input type="password"
          {...register('password', { required: true })}
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
        ¿No tienes una cuenta aún? <Link to='/register' className="text-sky-500">Registrar</Link>
      </p>
    </div>
  )
}
