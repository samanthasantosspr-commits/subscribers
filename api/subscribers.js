export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "YOUTUBE_API_KEY não definida" });
  }

  const channelId = req.query.channelId;
  if (!channelId) {
    return res.status(400).json({ error: "channelId é obrigatório" });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${UCFO8cMSkrmj1h9CGecAQl6w}&key=${UCFO8cMSkrmj1h9CGecAQl6w}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const subscribers = Number(data.items[0].statistics.subscriberCount || 0);
      return res.status(200).json({ channelId, subscribers });
    } else {
      return res.status(404).json({ error: "Canal não encontrado" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
