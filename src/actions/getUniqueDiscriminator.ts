import db from "@/lib/db";

export function generateDiscriminator() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

async function getUniqueDiscriminator(name: string) {
  const code = generateDiscriminator();

  const existingUser = await db.user.findUnique({
    where: {
      name_discriminator: {
        name,
        discriminator: code,
      },
    },
  });

  if (existingUser) {
    return getUniqueDiscriminator(name);
  }

  return code;
}

export default getUniqueDiscriminator