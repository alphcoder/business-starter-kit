const AMOCRM_DOMAIN = process.env.AMOCRM_DOMAIN;
const AMOCRM_TOKEN = process.env.AMOCRM_TOKEN;

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
}

export async function createAmoCRMLead(data: LeadData) {
  const res = await fetch(`https://${AMOCRM_DOMAIN}.amocrm.ru/api/v4/leads/complex`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AMOCRM_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      name: `Заявка от ${data.name}`,
      _embedded: {
        contacts: [{
          first_name: data.name,
          custom_fields_values: [
            { field_code: 'EMAIL', values: [{ value: data.email }] },
            { field_code: 'PHONE', values: [{ value: data.phone }] },
          ],
        }],
        tags: [{ name: data.source || 'website' }],
      },
    }]),
  });
  return res.json();
}

export async function sendTelegramNotification(data: LeadData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `🔔 Новая заявка!\n\n👤 ${data.name}\n📧 ${data.email}\n📱 ${data.phone}\n💬 ${data.message || '—'}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

export async function createYooKassaPayment(amount: number, description: string) {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;

  const res = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64'),
      'Content-Type': 'application/json',
      'Idempotence-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      amount: { value: amount.toFixed(2), currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success` },
      capture: true,
      description,
    }),
  });
  return res.json();
}
