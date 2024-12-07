import getCurrentUser from "@/actions/getCurrentUser";
import getUniqueDiscriminator from "@/actions/getUniqueDiscriminator";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const Home = async () => {
  const curretUser = await getCurrentUser();

  const name = curretUser?.name;
  const email = curretUser?.email;
  const id = curretUser?.id;

  if (!email || !name || !id) return redirect("/log-in");

  let code = curretUser.discriminator;

  if (!curretUser.discriminator) {
    try {
      code = await getUniqueDiscriminator(name);

      await db.user.update({
        where: { id },
        data: { discriminator: code },
      });

      return redirect("/friends");
    } catch (error) {
      console.error("Error updating discriminator:", error);
      return redirect("/sign-up");
    }
  } else {
    return redirect("/friends");
  }
};

export default Home;
