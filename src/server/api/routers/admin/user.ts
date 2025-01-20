import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";

export const adminUserRouter = createTRPCRouter({
    getUserRole: protectedProcedure.query(async ({ctx}) => {
        return ctx.db.roleUser.findMany({
            where: {
                isParticipant: true
            }
        });
    }),
})
