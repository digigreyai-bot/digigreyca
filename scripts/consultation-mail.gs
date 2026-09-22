/**
 * DigiGrey consultation mailer — paste into https://script.google.com
 *
 * Deploy → New deployment → Web app
 *   Execute as: Me (digigrey.ai@gmail.com)
 *   Who has access: Anyone
 * Copy the Web App URL into Railway as CONSULTATION_WEBHOOK_URL
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const to = data.to || Session.getEffectiveUser().getEmail();
    const subject = data.subject || "New Consultation Request — DigiGrey Website";
    const replyTo = data.replyTo || data.email || "";
    const html =
      data.html ||
      "<p><b>Name:</b> " +
        esc_(data.name) +
        "</p><p><b>Email:</b> " +
        esc_(data.email) +
        "</p><p><b>Phone:</b> " +
        esc_(data.phone) +
        "</p><p><b>Service:</b> " +
        esc_(data.service) +
        "</p><p><b>Message:</b><br>" +
        esc_(data.message) +
        "</p>";

    MailApp.sendEmail({
      to: to,
      subject: subject,
      htmlBody: html,
      replyTo: replyTo || undefined,
      name: "DigiGrey Website",
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: "digigrey-consultation-mailer" });
}

function esc_(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
