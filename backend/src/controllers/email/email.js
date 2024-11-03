import Email from "../../schemas/email.js";

export async function getEmails(req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const emails = await Email.find({ userId });
    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
}

export async function addEmail(req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { email } = req.body;
    if (!email) {
      throw new Error("No email provided");
    }

    const trimmedEmail = email.trim();

    // Ensure email fits a regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const result = await Email.findOneAndUpdate(
      { userId },
      { $addToSet: { emails: trimmedEmail } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Email added successfully",
      emails: result.emails,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmail(req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { email } = req.body;
    if (!email) {
      throw new Error("No email provided");
    }

    const trimmedEmail = email.trim();

    // Ensure email fits a regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const result = await Email.findOneAndUpdate(
      { userId },
      { $pull: { emails: trimmedEmail } },
      { new: true }
    );

    if (!result) {
      throw new Error("Email not found");
    }

    res.status(200).json({
      message: "Email deleted successfully",
      emails: result.emails,
    });
  } catch (error) {
    next(error);
  }
}
