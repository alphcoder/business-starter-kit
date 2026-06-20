'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(10, 'Введите номер телефона'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact_form' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-green-500 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <input {...register('name')} placeholder="Ваше имя" className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register('email')} placeholder="Email" className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('phone')} placeholder="Телефон" className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <textarea {...register('message')} placeholder="Сообщение" rows={4} className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white resize-none" />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm text-center">Ошибка отправки. Попробуйте ещё раз.</p>}
    </form>
  );
}
