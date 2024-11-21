import db from "@/lib/db";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        friends: {
          include: {
            friend: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true, // You can add more fields as needed
              },
            },
          },
        },
        friendRequests: {
          include: {
            friend: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                friendRequests: {
                  select: {
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;
