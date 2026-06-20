export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          name,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const data = await response.json().catch(() => ({}));
    return res.status(response.status).json({ message: data.message || 'Submission failed' });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}
