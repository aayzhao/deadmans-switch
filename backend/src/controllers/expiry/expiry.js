import cron from "node-cron";
import User from "../../schemas/user.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily expiration check");

  try {
    // Find users who have not refreshed within the last 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const expiredUsers = await User.find({
      lastRefreshed: { $lt: oneMonthAgo },
    });

    for (const user of expiredUsers) {
      // Send documents of expired user to their trusted contacts
    }
  } catch (error) {
    console.error("Error in expiration check:", error);
  }
});
