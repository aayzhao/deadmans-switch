import User from "../../schemas/user.js";
import Email from "../../schemas/email.js";
import Doc from "../../schemas/docs.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendRemindersIfCloseToExpiry() {
  try {
    // Find users who are going to expire in the next 7 days (lastRefreshed + 30 days - 7 days)
    const twentyThreeDaysAgo = new Date();
    twentyThreeDaysAgo.setDate(twentyThreeDaysAgo.getDate() - 23);

    const usersToRemind = await User.find({
      lastRefreshed: { $lt: twentyThreeDaysAgo },
    });

    for (const user of usersToRemind) {
      // Send reminder to user to refresh
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: "Refresh your time",
        text: "Your time is about to expire. Please log in to refresh!",
      };

      await sgMail.send(msg);
    }
  } catch (error) {
    next(error);
  }
}

export async function sendDocumentsIfExpired() {
  try {
    // Find users who have not refreshed within the last 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const expiredUsers = await User.find({
      lastRefreshed: { $lt: oneMonthAgo },
    });

    for (const user of expiredUsers) {
      // Find emails of trusted contacts
      const { emails } = await Email.find({ userId: user._id });

      // Send documents of expired user to their trusted contacts
      for (const email of emails) {
        const { text } = await Doc.find({ userId: user._id });

        const msg = {
          to: email,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: "Documents of expired user",
          text: text,
        };

        await sgMail.send(msg);
      }
    }
  } catch (error) {
    next(error);
  }
}
