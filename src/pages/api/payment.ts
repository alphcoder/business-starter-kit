import type { NextApiRequest, NextApiResponse } from 'next';
import { createYooKassaPayment } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, description } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Некорректная сумма' });
  }

  try {
    const payment = await createYooKassaPayment(amount, description || 'Оплата услуги');
    res.status(200).json({ confirmation_url: payment.confirmation?.confirmation_url });
  } catch (err: any) {
    console.error('Payment error:', err.message);
    res.status(500).json({ error: 'Ошибка создания платежа' });
  }
}
