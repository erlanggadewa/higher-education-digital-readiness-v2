import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod';

export const adminCampusRouter = createTRPCRouter({
    getListCampus: protectedProcedure
        .query(async ({ctx}) => {
            return ctx.db.campusUser.findMany({
                where: {
                    role: 'campus',
                },
            });
        }),
    getDetailCampus: protectedProcedure
        .input(z.string().cuid())
        .query(async ({ctx, input}) => {
            return ctx.db.campusUser.findUnique({
                where: {
                    id: input,
                },
                include: {
                    campus: true,
                }
            });
        }),
    createCampus: protectedProcedure
        .input(z.object({
            namaPT: z.string().min(1),
            kodePT: z.string().min(1),
            emailPT: z.string().email().min(1),
            passwordPT: z.string().min(1),
            logoPT: z.string().min(1),
            statusPT: z.string().min(1),
            akreditasiPT: z.string().min(1),
            tanggalBerdiriPT: z.date(),
            noSKPT: z.string().min(1),
            tanggalSKPT: z.date(),
            alamatPT: z.string().min(1),
            kotaPT: z.string().min(1),
            kodePosPT: z.string().min(1),
            teleponPT: z.string().min(1),
            faximilePT: z.string().min(1),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.campusUser.create({
                data: {
                    name: input.namaPT,
                    email: input.emailPT,
                    password: input.passwordPT,
                    role: 'campus',
                    image: input.logoPT,
                    campus: {
                        create: {
                            accreditationPt: input.akreditasiPT,
                            address: input.alamatPT,
                            city: input.kotaPT,
                            codePt: input.kodePT,
                            standingDate: input.tanggalBerdiriPT,
                            numberSkPt: input.noSKPT,
                            postalCode: input.kodePosPT,
                            statusPt: input.statusPT === '1',
                            phoneNumber: input.teleponPT,
                            dateSkPt: input.tanggalSKPT,
                            faximile: input.faximilePT,
                        }
                    }
                },
            });
        }),
    updateCampus: protectedProcedure
        .input(z.object({
            id: z.string().cuid(),
            namaPT: z.string().min(1),
            kodePT: z.string().min(1),
            emailPT: z.string().email().min(1),
            logoPT: z.string().min(1),
            statusPT: z.string().min(1),
            akreditasiPT: z.string().min(1),
            tanggalBerdiriPT: z.date(),
            noSKPT: z.string().min(1),
            tanggalSKPT: z.date(),
            alamatPT: z.string().min(1),
            kotaPT: z.string().min(1),
            kodePosPT: z.string().min(1),
            teleponPT: z.string().min(1),
            faximilePT: z.string().min(1),
        }))
        .mutation(async ({ctx, input}) => {
            return ctx.db.campusUser.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.namaPT,
                    email: input.emailPT,
                    image: input.logoPT,
                    campus: {
                        update: {
                            accreditationPt: input.akreditasiPT,
                            address: input.alamatPT,
                            city: input.kotaPT,
                            codePt: input.kodePT,
                            standingDate: input.tanggalBerdiriPT,
                            numberSkPt: input.noSKPT,
                            postalCode: input.kodePosPT,
                            statusPt: input.statusPT === '1',
                            phoneNumber: input.teleponPT,
                            dateSkPt: input.tanggalSKPT,
                            faximile: input.faximilePT,
                        }
                    }
                },
            });
        }),
    removeUserCampus: protectedProcedure
        .input(z.string().cuid())
        .mutation(async ({ctx, input}) => {
            const campusUser = await ctx.db.campusUser.findUniqueOrThrow({
                where: {
                    id: input
                },
                include: {
                    campus: true
                }
            });
            return ctx.db.$transaction([
                ctx.db.campus.delete({
                    where: {
                        campusId: campusUser.id,
                    }
                }),
                ctx.db.campusUser.delete({
                    where: {
                        id: campusUser.id
                    }
                }),
            ])
        }),
    resetPassword: protectedProcedure
        .input(z.object({
            id: z.string().cuid(),
            password: z.string().min(1),
        }))
        .mutation(async ({ctx, input}) => {
            const campusUser = await ctx.db.campusUser.findUniqueOrThrow({
                where: {
                    id: input.id
                }
            });
            return ctx.db.campusUser.update({
                where: {
                    id: campusUser.id
                },
                data: {
                    password: input.password
                }
            });
        }),
});
