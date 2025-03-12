import db from "@/lib/db";
import { User } from "@prisma/client";
import getUniqueDiscriminator from "./getUniqueDiscriminator";

async function createUserWithDiscriminator(user: User) {
  const name = user.name || "user";
  const uniqueDiscriminator = await getUniqueDiscriminator(name);

  return db.user.create({
    data: {
      ...user,
      discriminator: uniqueDiscriminator,
    },
  });
}

export default createUserWithDiscriminator;
