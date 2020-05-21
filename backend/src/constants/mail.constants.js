const TRANSPORTER_OPTIONS = {
  host: process.env.SEND_IN_BLUE_SMTP,
  port: process.env.SEND_IN_BLUE_PORT,
  secure: false,
  auth: {
    user: process.env.SEND_IN_BLUE_USER,
    pass: process.env.SEND_IN_BLUE_PASSWORD
  }
}

module.exports = {
  TRANSPORTER_OPTIONS
}
