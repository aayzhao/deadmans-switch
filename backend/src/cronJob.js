import cron from "node-cron";
import {
  sendRemindersIfCloseToExpiry,
  sendDocumentsIfExpired,
} from "./controllers/expiry/expiry.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily expiration check");

  try {
    await sendRemindersIfCloseToExpiry();
    await sendDocumentsIfExpired();
  } catch (error) {
    console.error("Error in expiration check:", error);
  }
});
