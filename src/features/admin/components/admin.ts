// Types untuk Tim Capstone - UPDATE
export type TeamCapstone = {
  id: string;
  nama: string;
  kategori: string;
  totalAnggota: number;
  ketua: string;
  period: number;
};

// Types untuk Judul Capstone
export type TitleCapstone = {
  id: string;
  judul: string;
  deskripsi: string;
  photo: string;
  proposal: string;
  period: number;
};

// Types untuk Pengajuan - UPDATE
export type Submission = {
  id: string;
  tim: string;
  targetTim: string;
  grandDesign: string;
};

// Types untuk User - UPDATE
export type User = {
  id: string;
  nama: string;
  email: string;
  tim: string;
  role: string;
  curriculumVitae: string;
};
