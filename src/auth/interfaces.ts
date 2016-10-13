export interface AuthState {
  /** The JSON Web Token as a string */
  token: string;
  /** Is the client logged in right now? */
  authenticated?: boolean;
  /** email address of the "subject" */
  sub: string;
  /** Issued at timestamp*/
  iat: number;
  /** Token identifier */
  jti: string;
  /** Issuer (server URL) */
  iss: string;
  /** Expiration timestamp */
  exp: number;
  /** MQTT broker hostname */
  mqtt: string;
  /** UUID of bot as stored on API server. */
  bot: string;
  /** The github release api for OS images */
  os_update_server: string;
  /** The github release api for Fw images */
  fw_update_server: string;
}
