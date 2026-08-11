import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, company, country, service, budget, timeline, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Name, email and project details are required." });

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    return res.status(503).json({ error: "Email delivery is not configured yet." });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "YourSetoGo Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO,
      reply_to: email,
      subject: `New YourSetoGo project inquiry — ${service || "Project"}`,
      html: `
        <h2>New YourSetoGo project inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "-")}</p>
        <p><strong>Country:</strong> ${escapeHtml(country || "-")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(timeline || "-")}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\\n/g, "<br />")}</p>
      `
    });
    if (error) return res.status(500).json({ error: "Email provider rejected the message." });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to send inquiry." });
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}