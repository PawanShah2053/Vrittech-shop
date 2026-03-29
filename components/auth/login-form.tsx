'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { apiFetch } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { useAuthStore } from '@/stores/auth-store';
import type { LoginResponse } from '@/types';

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch<LoginResponse>(API_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      setAuth({ token: data.token, username });
      router.push('/products');
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Login failed. Please try the demo credentials again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Use the Fake Store demo account below to unlock cart functionality.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
      </div>

      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}
