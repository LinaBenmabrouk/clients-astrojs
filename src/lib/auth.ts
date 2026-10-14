import { betterAuth } from "better-auth";
import db from "./db.js";

const env = import.meta.env;

// Google n'est activé que si les identifiants sont présents dans .env
const socialProviders =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID as string,
          clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        },
      }
    : {};

export const auth = betterAuth({
  // Même base SQLite que les clients (data/clients.db)
  database: db,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  socialProviders,
  // Google vérifie les emails : on peut rattacher une connexion Google
  // à un compte existant (créé par mot de passe) qui a la même adresse.
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});
