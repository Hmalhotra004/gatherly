import getSession from "@/actions/getSession";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getSession();
  if (!session || !session.user || !session.user?.email) {
    throw new Error("Unauthorized");
  }
  return { userId: session.user.email };
};

export const ourFileRouter = {
  image: f(["image", "image/jpeg", "image/heic", "image/png"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
