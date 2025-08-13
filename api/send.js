export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  const token = "8021059345:AAEExgQRh_ltogdB3xeMBnQHFwUaM1Q0KEA";
  const chatId = "6453244752";
  const text = `Yangi habar:\nIsm: ${name}\nEmail: ${email}\nTel: ${phone}\nXabar: ${message}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const data = await tgRes.json();
    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: data.description });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
