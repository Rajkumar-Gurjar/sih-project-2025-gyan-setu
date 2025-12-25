import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/api/auth.service';
import { useAuthStore } from '../../../store/useAuthStore';
import { PinInput } from '../../atoms/Input/PinInput';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Backoff state
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (lockoutUntil) {
            timer = setInterval(() => {
                const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
                if (remaining <= 0) {
                    setLockoutUntil(null);
                    setSecondsRemaining(0);
                    clearInterval(timer);
                } else {
                    setSecondsRemaining(remaining);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [lockoutUntil]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (lockoutUntil && Date.now() < lockoutUntil) return;
        
        setError('');
        setIsLoading(true);

        try {
            const response = await authService.login({ phone, pin });
            login(response.user, response.token);
            setFailedAttempts(0);
            navigate('/');
        } catch (err) {
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            
            if (newFailedAttempts >= 3) {
                // Exponential backoff: 30s, 60s, 120s...
                const backoffSeconds = 30 * Math.pow(2, newFailedAttempts - 3);
                setLockoutUntil(Date.now() + backoffSeconds * 1000);
                setError(`Too many failed attempts. Locked for ${backoffSeconds} seconds.`);
            } else {
                setError(err instanceof Error && err.message === 'UNAUTHORIZED' 
                    ? 'Invalid phone number or PIN' 
                    : 'Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className={`alert ${lockoutUntil ? 'alert-warning' : 'alert-error'} shadow-lg`}>
                    <span>{error}</span>
                </div>
            )}

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Phone Number</span>
                </label>
                <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="input input-bordered w-full" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading || !!lockoutUntil}
                    required 
                />
            </div>

            <PinInput 
                label="PIN"
                value={pin}
                onChange={setPin}
                error={lockoutUntil ? `Locked for ${secondsRemaining}s` : undefined}
            />

            <div className="flex items-center justify-between">
                <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text">Remember me</span>
                    </label>
                </div>

                <div className="text-sm">
                    <button type="button" className="font-medium text-primary hover:text-primary-focus">
                        Forgot PIN?
                    </button>
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading || !!lockoutUntil}
                >
                    {lockoutUntil ? `Locked (${secondsRemaining}s)` : (isLoading ? 'Signing in...' : 'Sign in')}
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-base-content opacity-70">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary hover:text-primary-focus">
                        Sign up now
                    </Link>
                </p>
            </div>
        </form>
    );
};
