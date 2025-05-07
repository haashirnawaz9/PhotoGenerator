
import { currentUser } from "@clerk/nextjs/server";
import db from "./db";

export const checkUser = async () => {
    const user = await currentUser();
    if(!user) {
        return null;
    }

    const loggedInUser = await db.user.findUnique({
        where: {clerkId: user.id}
    })

    if(loggedInUser) {
        return loggedInUser;
    }

    const newUser = await db.user.upsert({
        where: { email: user.emailAddresses[0].emailAddress },
        update: {}, // or provide fields to update if needed
        create: {
          clerkId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0].emailAddress,
        },
      });
      
    return newUser;
}