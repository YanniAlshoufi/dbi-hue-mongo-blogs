// MongoDB

import { ObjectId } from "mongodb";
import { z } from "zod";

export const objectIdSchema = z.instanceof(ObjectId, {
  message: "The ID provided must be a valid Object ID.",
});

export const objectIdStringSchema = z
  .string({
    message: "The ID provided must be a string.",
  })
  .length(
    24,
    "The ID provided must be 24 characters long to be a valid ObjectID.",
  )
  .regex(
    /^[a-fA-F0-9]+$/,
    "The ID provided has to only contain hexadecimal characters (a-f, A-F, and 0-9 are allowed)",
  );
