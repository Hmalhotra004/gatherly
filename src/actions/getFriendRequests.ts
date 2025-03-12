import db from "@/lib/db";
import getSession from "./getSession";

const getFriendRequests = async () => {
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

    const friendRequests = await db.friend.findMany({
      where: {
        OR: [{ user1Id: currentUser.id }, { user2Id: currentUser.id }],
        status: "PENDING",
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

    const requests = friendRequests.map((request) => request.user1);

    return requests;
  } catch (e) {
    console.error("Error fetching friend requests:", e);
    return [];
  }
};

export default getFriendRequests;
