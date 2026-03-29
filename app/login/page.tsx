import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <section>
        <p className="text-sm font-medium text-brand-700">Bonus feature</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Simple authentication flow</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          This page uses the Fake Store login endpoint and keeps the token in a small Zustand auth store.
          Once logged in, users can add items to cart and manage them across refreshes.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-slate-900">Demo credentials</p>
          <p className="mt-2 text-sm text-slate-500">Username: mor_2314</p>
          <p className="text-sm text-slate-500">Password: 83r5^_</p>
        </div>
      </section>

      <LoginForm />
    </div>
  );
}
