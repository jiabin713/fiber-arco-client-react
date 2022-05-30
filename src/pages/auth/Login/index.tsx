import LoginBanner from './components/login-banner';
import LoginForm from './components/login-form';
import Logo from '@/assets/logo.svg';

const Login = () => {
  return (
    <div className='flex h-screen w-screen'>
      <div className='fixed top-8 left-8 inline-flex items-center z-1 text-4xl'>
        <Logo />
        <div className='ml-4 mr-4  text-2xl text-arco-fill-1'>Fiber Arco Pro</div>
      </div>
      <div
        className='w-550px flex justify-center items-center'
        style={{ background: 'linear-gradient(163.85deg, #1d2129 0%, #00308f 100%)' }}
      >
        <div className='h-full flex-1 w-full'>
          <LoginBanner />
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-center h-full'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
