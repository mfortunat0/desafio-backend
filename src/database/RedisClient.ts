import { createClient } from "redis";

const redis = createClient({
  url: "redis://cache",
});

redis.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redis.connect();
})();

export { redis };
