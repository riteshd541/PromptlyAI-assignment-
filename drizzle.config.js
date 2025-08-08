/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql", // instead of driver
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
