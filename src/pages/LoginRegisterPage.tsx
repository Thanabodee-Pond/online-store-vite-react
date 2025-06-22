import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginRegisterPage = () => {
    const [activeTab, setActiveTab] = useState('login');
    const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm();
    const { register: registerRegister, handleSubmit: handleRegisterSubmit } = useForm();

    const onLogin = (data: any) => {
        alert("Login functionality is not implemented yet.");
    };

    const onRegister = (data: any) => {
        alert("Registration functionality is not implemented yet.");
    };

    return (
        <div className="container px-4 py-24 mx-auto">
            <div className="max-w-md mx-auto">
                <div className="flex mb-10 border-b">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`py-4 px-1 text-xl font-semibold transition-colors w-1/2
                            ${activeTab === 'login' ? 'border-b-2 border-primary text-dark' : 'text-gray-400 hover:text-dark'}`
                        }
                    >
                        LOGIN
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`py-4 px-1 text-xl font-semibold transition-colors w-1/2
                            ${activeTab === 'register' ? 'border-b-2 border-primary text-dark' : 'text-gray-400 hover:text-dark'}`
                        }
                    >
                        REGISTER
                    </button>
                </div>

                <div>
                    <div className={activeTab === 'login' ? 'block' : 'hidden'}>
                        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-8">
                            <input
                                {...registerLogin("username")}
                                type="text"
                                placeholder="Username or email address *"
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
                            />
                            <input
                                {...registerLogin("password")}
                                type="password"
                                placeholder="Password *"
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
                            />
                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-gray-600">
                                    <input type="checkbox" className="w-4 h-4 mr-2" />
                                    Remember me
                                </label>
                                <a href="#" className="text-sm text-dark hover:text-primary">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full py-4 font-bold tracking-widest text-white rounded-md bg-primary hover:opacity-90">
                                LOGIN
                            </button>
                        </form>
                    </div>

                    <div className={activeTab === 'register' ? 'block' : 'hidden'}>
                        <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-8">
                            <input
                                {...registerRegister("username")}
                                type="text"
                                placeholder="Username *"
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
                            />
                            <input
                                {...registerRegister("email")}
                                type="email"
                                placeholder="Email address *"
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
                            />
                             <input
                                {...registerRegister("password")}
                                type="password"
                                placeholder="Password *"
                                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary"
                            />
                            <button type="submit" className="w-full py-4 font-bold tracking-widest text-white rounded-md bg-primary hover:opacity-90">
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterPage;