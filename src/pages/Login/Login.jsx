import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { authActions } from '_store';
import Logo from '../../_components/Logo';
import { NavLink } from 'react-router-dom';

export { Login };

function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.token);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/company');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {
        return dispatch(authActions.login({ email, password }));
    }

    return (
        <div className="col-md-4 mx-auto offset-md-3 pt-5">
            <Logo />
            <div className="card rounded-md mb-10">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`rounded-md form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`rounded-md form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div>
                                <NavLink to="/">Register</NavLink>
                            </div>
                            <div className='text-right'>
                                <button disabled={isSubmitting} className="rounded-md px-5 btn btn bk-primary text-white">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                        </div>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
            <div className="">
                Email: adminuser@gmail.com<br />
                Password: password
            </div>
        </div>
    )
}
