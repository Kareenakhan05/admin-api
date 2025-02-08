function send_response(req, res, next) {
  const { statusCode, message, data } = req;

  // If statusCode is not set, default to 200
  const status = statusCode || 200;
  
  // Send the response
  res.status(status).json({ message, data });
}

module.exports = send_response;
