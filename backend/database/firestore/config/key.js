require('dotenv').config();

module.exports = {
  type: process.env.FS_TYPE,
  project_id: process.env.FS_PROJECT_ID,
  private_key_id: process.env.FS_PRIVATE_KEY_ID,
  private_key: process.env.FS_PRIVATE_KEY,
  client_email: process.env.FS_CLIENT_EMAIL,
  client_id: process.env.FS_CLIENT_ID,
  auth_uri: process.env.FS_AUTH_URI,
  token_uri: process.env.FS_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FS_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FS_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FS_UNIVERSE_DOMAIN,
};