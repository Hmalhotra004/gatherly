import db from "@/lib/db";
import getSession from "./getSession";

const getFriends = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    // Fetch the current user by their email
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true, // We only need the user's ID
      },
    });

    if (!currentUser) return [];

    // Fetch friends where the user is either user1 or user2
    const friends = await db.friend.findMany({
      where: {
        OR: [{ user1Id: currentUser.id }, { user2Id: currentUser.id }],
        status: "ACCEPTED", // Only accepted friendships
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

    // Map friends to exclude the current user's data
    const friendList = friends.map((friend) => {
      if (friend.user1Id === currentUser.id) {
        return friend.user2; // The other user is the friend
      } else {
        return friend.user1; // The other user is the friend
      }
    });

    return friendList;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
};

export default getFriends;
