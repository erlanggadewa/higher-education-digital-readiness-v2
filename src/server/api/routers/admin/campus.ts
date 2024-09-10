import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc';
import z from 'zod';

export const adminCampusRouter = createTRPCRouter({
    getListCampus: protectedProcedure.query(async ({ctx}) => {
        return ctx.db.campusUser.findMany({
            where: {
                role: 'campus',
            },
        });
    }),
    createCampus: protectedProcedure.input(z.object({
        namaPT: z.string().min(1, 'Wajib diisi'),
        kodePT: z.string().min(1, 'Wajib diisi'),
        emailPT: z.string().email('Email tidak valid').min(1, 'Wajib diisi'),
        passwordPT: z.string().min(1, 'Wajib diisi'),
        logoPT: z.string().min(1, 'Wajib diisi'),
        statusPT: z.string().min(1, 'Wajib diisi'),
        akreditasiPT: z.string().min(1, 'Wajib diisi'),
        tanggalBerdiriPT: z.string().min(1, 'Wajib diisi'),
        noSKPT: z.string().min(1, 'Wajib diisi'),
        tanggalSKPT: z.string().min(1, 'Wajib diisi'),
        alamatPT: z.string().min(1, 'Wajib diisi'),
        kotaPT: z.string().min(1, 'Wajib diisi'),
        kodePosPT: z.string().min(1, 'Wajib diisi'),
        teleponPT: z.string().min(1, 'Wajib diisi'),
        faximilePT: z.string().min(1, 'Wajib diisi'),
    })).mutation(async ({ctx, input}) => {
        await ctx.db.campusUser.create({
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
});
