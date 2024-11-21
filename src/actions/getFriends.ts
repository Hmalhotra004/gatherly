import db from "@/lib/db";
import getSession from "./getSession";

const getFriends = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    // Fetch the current user and include their friends' details
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        friends: {
          include: {
            friend: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true, // Add any additional fields you need
              },
            },
          },
        },
      },
    });

    if (!currentUser) return [];

    // Extract only the friends from the result
    const friends = currentUser.friends.map(
      (friendRelation) => friendRelation.friend
    );

    return friends;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default getFriends;
