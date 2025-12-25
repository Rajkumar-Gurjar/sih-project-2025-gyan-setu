import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/api/auth.service';
import { useAuthStore } from '../../../store/useAuthStore';
import { PinInput } from '../../atoms/Input/PinInput';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (phone.length < 10) {
            setError('Phone number must be at least 10 digits');
            return;
        }

        if (pin.length !== 4) {
            setError('PIN must be exactly 4 digits');
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.register({ name, phone, pin, role });
            login(response.user, response.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-error shadow-lg">
                    <span>{error}</span>
                </div>
            )}

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Full Name</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="input input-bordered w-full" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
            </div>

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
                    required 
                />
            </div>

            <PinInput 
                label="Set 4-digit PIN"
                value={pin}
                onChange={setPin}
            />

            <div className="form-control w-full">
                <label className="label text-sm text-base-content opacity-70">
                    Role
                </label>
                <div className="flex gap-4 mt-1">
                    <label className="label cursor-pointer gap-2">
                        <input 
                            type="radio" 
                            name="role" 
                            className="radio radio-primary" 
                            checked={role === 'student'}
                            onChange={() => setRole('student')}
                        />
                        <span className="label-text">Student</span>
                    </label>
                    <label className="label cursor-pointer gap-2">
                        <input 
                            type="radio" 
                            name="role" 
                            className="radio radio-primary" 
                            checked={role === 'teacher'}
                            onChange={() => setRole('teacher')}
                        />
                        <span className="label-text">Teacher</span>
                    </label>
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-base-content opacity-70">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-primary-focus">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};
