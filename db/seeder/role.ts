export const roles = [
  { role: 'admin', name: 'Admin', isParticipant: false },
  { role: 'reviewer', name: 'Reviewer', isParticipant: false },
  { role: 'campus', name: 'Campus', isParticipant: true },
  {
    role: 'direktur',
    name: 'Direktur / Kepala Lembaga',
    isParticipant: true,
    idNumberType: 'NIM',
  },
  { role: 'dekan', name: 'Dekan', isParticipant: true, idNumberType: 'NIDN' },
  {
    role: 'kaprodi',
    name: 'Ketua Program Studi',
    isParticipant: true,
    idNumberType: 'NIDN',
  },
  { role: 'dosen', name: 'Dosen', isParticipant: true, idNumberType: 'NIDN' },
  { role: 'staff', name: 'Staff', isParticipant: true, idNumberType: 'NIP' },
  {
    role: 'mahasiswa',
    name: 'Mahasiswa',
    isParticipant: true,
    idNumberType: 'NIM',
  },
];
