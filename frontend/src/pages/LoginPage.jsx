import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogIn } from 'lucide-react';
import API from '../api/axios';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await API.post('/auth/login', { email, password });

            if (data.role === 'customer') {
                data.location = { lat: 21.1458, lng: 79.0882 }; // Example Nagpur location
            }

            login(data);

            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'seller') navigate('/seller');
            else navigate('/shop');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 pt-10 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <User className="w-8 h-8" />
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
                <p className="text-slate-500 mb-8">Sign in to your account to continue.</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold text-left">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 text-left">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="customer@gmail.com"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
                        <p className="font-semibold mb-1">Demo Credentials:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Customer: customer@gmail.com / customer@98765</li>
                            <li>Seller: seller@gmail.com / seller@98765</li>
                            <li>Admin: admin@gmail.com / admin@98765</li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 focus:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                        <LogIn className="w-5 h-5" /> Sign In
                    </button>
                </form>

                <p className="mt-8 text-sm text-slate-500">
                    Don't have an account? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
