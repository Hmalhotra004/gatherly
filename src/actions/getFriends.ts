import db from "@/lib/db";
import getSession from "./getSession";

const getFriends = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!currentUser) return [];

    const friends = await db.friend.findMany({
      where: {
        OR: [{ user1Id: currentUser.id }, { user2Id: currentUser.id }],
        status: "ACCEPTED",
      },
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        user2: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    const friendList = friends.map((friend) => {
      if (friend.user1Id === currentUser.id) {
        return friend.user2;
      } else {
        return friend.user1;
      }
    });

    return friendList;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
};

export default getFriends;
