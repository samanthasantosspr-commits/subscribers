// api/subscribers.js
export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.YOUTUBE_API_KEY; // Defina no Vercel
  const channelId = req.query.channelId || "redeassociadas";

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${redeassociadas}&key=${AIzaSyAu1b_r1lBZ47erWIJayBY2LhOuiVkSbWo}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const subscribers = data.items[0].statistics.subscriberCount;
      return res.status(200).json({ channelId, subscribers: Number(subscribers) });
    } else {
      return res.status(404).json({ error: "Canal não encontrado" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
