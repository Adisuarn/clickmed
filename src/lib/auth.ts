import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from '@/db'

export const auth = betterAuth({
  trustedOrigins: ["https://papaya-dragon-6d5ac1.netlify.app"],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
})
