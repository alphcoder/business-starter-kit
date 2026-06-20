import type { NextApiRequest, NextApiResponse } from 'next';
import { createAmoCRMLead, sendTelegramNotification } from '../../lib/api';
import { z } from 'zod';

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().optional(),
  source: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Некорректные данные', details: parsed.error.flatten() });
  }

  const data = parsed.data;

  try {
    await Promise.all([
      createAmoCRMLead(data),
      sendTelegramNotification(data),
    ]);

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Lead error:', err.message);
    res.status(500).json({ error: 'Ошибка отправки' });
  }
}
