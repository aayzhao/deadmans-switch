import Doc from "../../schemas/docs.js";

export async function getText(req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const text = await Doc.find({ userId });
    res.status(200).json(text);
  } catch (error) {
    next(error);
  }
}

export async function updateText(req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { text } = req.body;
    if (!text) {
      throw new Error("No text provided");
    }

    const result = await Doc.findOneAndUpdate(
      { userId },
      { $set: { text: text } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Text updated successfully",
      text: result.text,
    });
  } catch (error) {
    next(error);
  }
}
