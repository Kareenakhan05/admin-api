export function send_response(res, status, message, data = null) {
  res.status(status).json({ message, data });
}
