export interface AuthToken {
  /** SUBJECT - The user's email. */
  sub: string;
  /** ISSUED AT */
  iat: number;
  /** JSON TOKEN IDENTIFIER - a serial number for the token. */
  jti: string;
  /** ISSUER - Where token came from (API URL). */
  iss: string;
  /** EXPIRATION DATE */
  exp: number;
  /** MQTT server address */
  mqtt: string;
  /** BOT UNIQUE IDENTIFIER */
  bot: string;
  /** Where to download RPi software */
  os_update_server: string;
  /** Where to download firmware. */
  fw_update_server: string;
}

export interface AuthState extends AuthToken {
  /** The JSON Web Token as a raw string, mostly for reference. */
  token: string;
  /** Is the client logged in right now? */
  authenticated?: boolean;
}

