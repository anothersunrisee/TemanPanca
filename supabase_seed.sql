-- Create Tables
CREATE TABLE IF NOT EXISTS silas (
  id INT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  character_name TEXT,
  character_img TEXT,
  intro_text TEXT,
  theme_color TEXT,
  references_items JSONB
);

CREATE TABLE IF NOT EXISTS materis (
  id TEXT PRIMARY KEY,
  sila_id INT REFERENCES silas(id),
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  character_name TEXT,
  character_img_url TEXT,
  illustration_url TEXT,
  slides JSONB,
  interaction JSONB,
  quiz JSONB
);

-- Insert Silas
INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  1, 
  'Ketuhanan Yang Maha Esa', 
  'Mari belajar tentang nilai Ketuhanan', 
  'Bimo', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWYpwcirKnfkZTbbTpHNInBWsqlznegKBU6ERJOExDqif1xUlwqwUWzGhCXeM85XwQHjh19IZ7H0p-1NvLP5zKk7qjKiCBoUxIDt3nzKgulnO1lGDz1n3AXIl9dnEX5IVB9NM_FMv5rRwymQpaPJ9b_O893b2ikA1UTNuX1sGLP7R-aekEC2GvamwStySLm0ZxAZr_NUcCckD4lALQFZnnTEe9RvdK6XQl2mUgQ2AbyahyfeipRBEiOgFWOPdaRfK8QT8M3QkxEk', 
  'Yuk belajar nilai-nilai agamis bersama Bimo yang bijaksana!', 
  'amber', 
  '["Buku Tematik SD Kelas 1 Tema 6: Lingkungan Bersih, Sehat, dan Asri","Buku Pendidikan Agama (umum lintas agama – nilai dasar)","Nilai karakter religius (Kemendikbud)"]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  2, 
  'Kemanusiaan yang Adil dan Beradab', 
  'Belajar peduli pada sesama', 
  'Siregar', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6PLCvdhY25YiBaOoP0UU35zHclS9Sq8JYLfy-VFB4azsx7JTMnEL-MYsclT-SXu7YVwAzcdn3dIMCC_WeWsRqyeqPP2LqID3GZSunSveKQnq89YAIyKVw1P-aS1MdJz9gnNVtFApd90yE6UEq4JDaq4KVGiZwBr_df-FCUeR5bMU55iQ8CpHvgY5W8Lccw9Oq6U_AcPoZ5vEy_KDobi08JOe7nxBzwy1zeGRrbg17PnELohRerQunuMKnda8jn6jDmS0KnSniTA', 
  'Yuk saling menolong bersama Siregar yang jujur!', 
  'amber', 
  '["Buku Tematik SD Kelas 2 – Hidup Rukun","Nilai Pancasila Sila 2 (adil, berbagi & empati)","Buku PPKn SD Kelas 1–2","Kemendikbud – Penguatan Pendidikan Karakter","Program SEL (Social Emotional Learning) dasar anak"]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  3, 
  'Persatuan Indonesia', 
  'Bersatu kita teguh, berpecah kita runtuh', 
  'Sinta / Leha', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3yBKAM3nv7-mp5OkCr8pU3OoDCvc4EyeMkU_sfhb392LfsAhzdCH1z1mUYHlqU-pkarvW9LJpx10oVPOY4oSvWuXwa-yHBgn09CsBmD-46Db5F-H6PYR_6TDdJppEqCnEf0r7daRinbRw0Wx83jxpy9xgE96kRxjWmOa-BmDI2_15Gf6l_Hq4wTa8BJ7OyYMv3e6Jw6j1MM2KWvel3F7NfW8CrMhqsewVoEUrU5jQmICr9PC6r7Lgd-GPvtE-jzJ2Ze7JyX8YDU', 
  'Ayo belajar persatuan bersama Sinta / Leha yang ramah!', 
  'amber', 
  '["Buku Tematik SD Kelas 1 – Hidup Rukun","Nilai Pancasila Sila 3 (persatuan & kebersamaan)","Buku PPKn SD – Gotong Royong","Nilai budaya Indonesia (kolektivitas & sosial)","Kemendikbud – Cinta Tanah Air"]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  4, 
  'Kerakyatan yang Dipimpin oleh Hikmat', 
  'Belajar bermusyawarah dan menghargai pendapat', 
  'Passa', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lvoESQHpoJDRChWSPgGcvpsyDpYD3rnUyOIYlTGLGBmCUt49vXxut5clZvFU6OA02qIQLalLDGkv0Q2coawNuqd4meopK-USK28EGFvK9X1GT_iGg0megL7PWDr1-UoyN5byyWO8TCP649Z9drZ--k8_4sDG4wCwyF0lJnZRMk2fGW61syVOj4N-nTvzhRYGnt2xavvKiA5Zr1z6R4agFShwce3__t6KnAaaGC8GmeDWtXIyjhBbRkw25RwjfTPavtjjSA4UhYo', 
  'Ayo belajar musyawarah bersama Passa yang bijak!', 
  'amber', 
  '["Buku PPKn SD – Demokrasi sederhana","Nilai Pancasila Sila 4 (musyawarah mufakat)","Kemendikbud – Pendidikan karakter demokratis","Konsep dasar demokrasi anak (voting sederhana)"]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  5, 
  'Keadilan Sosial bagi Seluruh Rakyat', 
  'Belajar bersikap adil dan bertanggung jawab', 
  'Aruya', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBaLFfFGf6bGRZ_LEnFjaeQ8BGKkKg5Rbq095H8Oa7tmR5R__Fzxa6d6EXL0oi4y55_-QZsTkgWoMNKGImlm5olJm-pMyR2by5eLASS7mj67jGOYf2dbnoMIr-MWaQfODxVEZDRtBOV7JCANpyxX46XppO-_t2nL-S9MdI3kLeNFLiY3SLY6-LsnhD0q9sHEk00vcD6fF0n9RBL9H7IafKDIwVJJcUIwa08rBbq7xcZA__Yi7T3IwkJKp9c6rIfqlaRBi62RraW_jY', 
  'Ayo belajar keadilan bersama Aruya yang ceria!', 
  'amber', 
  '["Buku Tematik SD – Kebersamaan & Keadilan","Nilai Pancasila Sila 5 (keadilan sosial)","Buku PPKn SD – Hak dan Kewajiban","Nilai karakter disiplin & tanggung jawab","Pancasila Sila 5 (keadilan melalui keteraturan sosial)"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert Materis
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's1_m1', 
  1, 
  'Berdoa sebelum belajar', 
  'Mengenal kebiasaan religius', 
  'BookOpen', 
  'Bimo', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Halo! Aku Bimo 😊 Sebelum belajar, aku selalu melakukan sesuatu dulu loh!"},{"type":"story","text":"Aku berdoa agar belajar jadi lancar dan mudah dipahami."},{"type":"info","text":"Berdoa adalah cara kita berbicara kepada Tuhan."},{"type":"context","text":"Kita bisa berdoa di rumah, di sekolah, atau di mana saja."},{"type":"value","text":"Berdoa membuat hati kita tenang dan siap belajar 🙏"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan sebelum belajar?","options":[{"text":"Berdoa","isCorrect":true,"feedback":"Hebat! Berdoa adalah kebiasaan baik 🙏"},{"text":"Langsung bermain","isCorrect":false,"feedback":"Coba lagi ya 😊 Sebelum belajar, kita sebaiknya berdoa dulu."}]}'::jsonb, 
  '[{"question":"Apa yang dilakukan sebelum belajar?","options":["Berdoa","Bermain","Tidur"],"answer":"Berdoa","explanation":"Berdoa membantu kita memulai belajar dengan baik."},{"question":"Kenapa kita berdoa sebelum belajar?","options":["Agar belajar lancar","Agar cepat pulang","Agar tidak belajar"],"answer":"Agar belajar lancar","explanation":"Berdoa membantu kita fokus dan tenang."},{"question":"Berdoa adalah kebiasaan...","options":["Baik","Buruk","Tidak penting"],"answer":"Baik","explanation":"Berdoa adalah kebiasaan baik yang diajarkan sejak kecil."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's1_m2', 
  1, 
  'Menghormati teman berbeda agama', 
  'Sikap toleransi antar agama', 
  'Users', 
  'Bimo', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Di sekolah, teman-teman punya agama yang berbeda-beda."},{"type":"story","text":"Walaupun berbeda, kita tetap bisa bermain bersama 😊"},{"type":"info","text":"Menghormati agama lain disebut sikap toleransi."},{"type":"warning","text":"Kita tidak boleh mengejek cara ibadah orang lain."},{"type":"value","text":"Kalau kita saling menghormati, kita bisa hidup rukun 🤝"}]'::jsonb, 
  '{"question":"Temanmu berbeda agama, apa yang kamu lakukan?","options":[{"text":"Menghormati","isCorrect":true,"feedback":"Hebat! Kita harus saling menghargai 🤝"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus saling menghormati."}]}'::jsonb, 
  '[{"question":"Apa itu toleransi?","options":["Menghormati perbedaan","Memilih teman","Bertengkar"],"answer":"Menghormati perbedaan","explanation":"Toleransi berarti menghormati perbedaan orang lain."},{"question":"Bolehkah mengejek agama lain?","options":["Tidak","Boleh","Kadang boleh"],"answer":"Tidak","explanation":"Mengejek agama lain adalah sikap yang tidak baik."},{"question":"Teman berbeda agama harus...","options":["Dihormati","Dijauhi","Diejek"],"answer":"Dihormati","explanation":"Kita harus menghormati semua teman."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's2_m4', 
  2, 
  'Berbagi itu adil', 
  'Mengenal sikap adil dan berbagi', 
  'Gift', 
  'Siregar', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Siregar punya 2 permen 🍬🍬"},{"type":"story","text":"Temannya tidak punya permen."},{"type":"action","text":"Siregar membagi permennya kepada temannya."},{"type":"info","text":"Berbagi adalah salah satu contoh sikap adil."},{"type":"value","text":"Kalau kita punya lebih, kita bisa berbagi 😊"}]'::jsonb, 
  '{"question":"Jika kamu punya lebih, apa yang kamu lakukan?","options":[{"text":"Berbagi","isCorrect":true,"feedback":"Hebat! Berbagi adalah sikap adil 😊"},{"text":"Menghabiskan sendiri","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus berbagi dengan teman."}]}'::jsonb, 
  '[{"question":"Apa itu sikap adil?","options":["Tidak pilih kasih","Memilih teman","Tidak peduli"],"answer":"Tidak pilih kasih","explanation":"Adil berarti memperlakukan semua orang dengan sama."},{"question":"Jika kita punya lebih, sebaiknya...","options":["Berbagi","Disimpan sendiri","Dibuang"],"answer":"Berbagi","explanation":"Berbagi adalah sikap baik dan adil."},{"question":"Berbagi adalah sikap...","options":["Baik","Buruk","Tidak penting"],"answer":"Baik","explanation":"Berbagi menunjukkan kita peduli kepada orang lain."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's2_m5', 
  2, 
  'Suka menolong', 
  'Sikap tolong menolong sesama', 
  'HandHeart', 
  'Siregar', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Temanmu jatuh saat bermain 😢"},{"type":"story","text":"Ia terlihat kesakitan dan butuh bantuan."},{"type":"action","text":"Kamu bisa menolong dan membantu temanmu."},{"type":"info","text":"Tolong menolong adalah sikap saling membantu."},{"type":"value","text":"Menolong orang lain adalah perbuatan mulia 🤝"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan jika temanmu jatuh?","options":[{"text":"Membantu","isCorrect":true,"feedback":"Hebat! Menolong adalah sikap baik 🤝"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus membantu teman."}]}'::jsonb, 
  '[{"question":"Apa itu tolong menolong?","options":["Membantu orang lain","Bermain sendiri","Tidak peduli"],"answer":"Membantu orang lain","explanation":"Tolong menolong berarti saling membantu."},{"question":"Kapan kita harus membantu?","options":["Saat dibutuhkan","Saat ingin saja","Tidak perlu"],"answer":"Saat dibutuhkan","explanation":"Kita membantu ketika orang lain membutuhkan bantuan."},{"question":"Menolong adalah sikap...","options":["Baik","Buruk","Biasa saja"],"answer":"Baik","explanation":"Menolong membuat kita menjadi anak yang baik."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's2_m6', 
  2, 
  'Belajar empati', 
  'Peduli terhadap perasaan orang lain', 
  'Heart', 
  'Siregar', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Temanmu terlihat sedih 😢"},{"type":"story","text":"Ia butuh perhatian dan teman untuk berbicara."},{"type":"action","text":"Kamu bisa menghibur dan menemani temanmu."},{"type":"info","text":"Empati adalah memahami perasaan orang lain."},{"type":"value","text":"Dengan empati, kita jadi anak yang peduli 💛"}]'::jsonb, 
  '{"question":"Jika temanmu sedih, apa yang kamu lakukan?","options":[{"text":"Menghibur","isCorrect":true,"feedback":"Hebat! Kamu anak yang peduli 💛"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus saling peduli."}]}'::jsonb, 
  '[{"question":"Apa itu empati?","options":["Memahami perasaan orang lain","Tidak peduli","Menertawakan teman"],"answer":"Memahami perasaan orang lain","explanation":"Empati berarti kita memahami perasaan orang lain."},{"question":"Saat teman sedih kita harus...","options":["Menghibur","Mengejek","Diam saja"],"answer":"Menghibur","explanation":"Menghibur membuat teman merasa lebih baik."},{"question":"Empati adalah sikap...","options":["Peduli","Jahat","Acuh"],"answer":"Peduli","explanation":"Empati menunjukkan kita peduli kepada orang lain."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's1_m3', 
  1, 
  'Rajin beribadah', 
  'Mendekatkan diri pada Tuhan', 
  'Heart', 
  'Bimo', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Setiap orang punya cara beribadah sesuai agamanya."},{"type":"info","text":"Ibadah adalah kegiatan kita mendekatkan diri kepada Tuhan."},{"type":"example","text":"Contohnya: berdoa, ke tempat ibadah, atau membaca kitab suci."},{"type":"value","text":"Kita harus rajin beribadah agar menjadi anak yang baik."},{"type":"closing","text":"Dengan ibadah, kita belajar menjadi lebih sabar dan baik 💛"}]'::jsonb, 
  '{"question":"Apa yang harus kita lakukan tentang ibadah?","options":[{"text":"Rajin beribadah","isCorrect":true,"feedback":"Hebat! Rajin ibadah membuat kita jadi lebih baik 💛"},{"text":"Malas ibadah","isCorrect":false,"feedback":"Yuk semangat 😊 Ibadah itu penting."}]}'::jsonb, 
  '[{"question":"Apa itu ibadah?","options":["Kegiatan mendekatkan diri kepada Tuhan","Bermain","Tidur"],"answer":"Kegiatan mendekatkan diri kepada Tuhan","explanation":"Ibadah adalah cara kita berhubungan dengan Tuhan."},{"question":"Haruskah kita rajin ibadah?","options":["Ya","Tidak","Kadang saja"],"answer":"Ya","explanation":"Rajin ibadah membuat kita menjadi pribadi yang baik."},{"question":"Ibadah membuat kita...","options":["Lebih baik","Lebih malas","Tidak berubah"],"answer":"Lebih baik","explanation":"Ibadah membantu kita menjadi lebih sabar dan baik."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's3_m7', 
  3, 
  'Bermain bersama', 
  'Belajar hidup rukun bersama teman', 
  'Users', 
  'Sinta / Leha', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Teman-teman bermain bersama di halaman sekolah 😊"},{"type":"warning","text":"Kita tidak boleh memilih-milih teman."},{"type":"info","text":"Persatuan berarti bersama-sama tanpa membeda-bedakan."},{"type":"action","text":"Semua teman ikut bermain dengan rukun."},{"type":"value","text":"Bersama itu menyenangkan! 🤝"}]'::jsonb, 
  '{"question":"Saat bermain, apa yang harus kita lakukan?","options":[{"text":"Bermain bersama","isCorrect":true,"feedback":"Hebat! Bermain bersama membuat kita rukun 🤝"},{"text":"Memilih teman","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita tidak boleh memilih teman."}]}'::jsonb, 
  '[{"question":"Apa itu persatuan?","options":["Bersama-sama","Bermain sendiri","Bertengkar"],"answer":"Bersama-sama","explanation":"Persatuan berarti hidup bersama dengan rukun."},{"question":"Bolehkah memilih teman?","options":["Tidak","Boleh","Kadang boleh"],"answer":"Tidak","explanation":"Kita harus berteman dengan semua orang."},{"question":"Bermain bersama membuat kita...","options":["Rukun","Bertengkar","Sendiri"],"answer":"Rukun","explanation":"Kebersamaan membuat kita hidup rukun."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's3_m8', 
  3, 
  'Kerjasama dan gotong royong', 
  'Bekerja bersama untuk tujuan yang sama', 
  'Handshake', 
  'Sinta / Leha', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Kelas terlihat kotor setelah kegiatan belajar 😟"},{"type":"action","text":"Semua siswa bekerja sama membersihkan kelas."},{"type":"result","text":"Kelas menjadi bersih dan nyaman kembali."},{"type":"info","text":"Kerjasama adalah bekerja bersama untuk tujuan yang sama."},{"type":"value","text":"Dengan gotong royong, pekerjaan jadi ringan 💪"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan saat kelas kotor?","options":[{"text":"Ikut membantu","isCorrect":true,"feedback":"Hebat! Kerjasama membuat pekerjaan lebih ringan 💪"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus ikut membantu."}]}'::jsonb, 
  '[{"question":"Apa itu kerjasama?","options":["Bekerja bersama","Bekerja sendiri","Tidak bekerja"],"answer":"Bekerja bersama","explanation":"Kerjasama berarti melakukan sesuatu bersama-sama."},{"question":"Kerjasama membuat pekerjaan menjadi...","options":["Ringan","Berat","Sulit"],"answer":"Ringan","explanation":"Dengan kerjasama, pekerjaan terasa lebih mudah."},{"question":"Gotong royong adalah...","options":["Kerjasama","Permainan","Istirahat"],"answer":"Kerjasama","explanation":"Gotong royong adalah bentuk kerjasama dalam masyarakat."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's3_m9', 
  3, 
  'Cinta Indonesia', 
  'Bangga dan menjaga budaya bangsa', 
  'Flag', 
  'Sinta / Leha', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Indonesia memiliki banyak budaya yang indah 🇮🇩"},{"type":"example","text":"Seperti tarian, pakaian adat, dan bahasa daerah."},{"type":"info","text":"Kita harus bangga menjadi anak Indonesia."},{"type":"action","text":"Menjaga budaya adalah tanggung jawab kita."},{"type":"value","text":"Aku cinta Indonesia! ❤️🇮🇩"}]'::jsonb, 
  '{"question":"Bagaimana sikap kita terhadap Indonesia?","options":[{"text":"Bangga","isCorrect":true,"feedback":"Hebat! Kita harus bangga menjadi anak Indonesia 🇮🇩"},{"text":"Tidak peduli","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus mencintai Indonesia."}]}'::jsonb, 
  '[{"question":"Apa itu cinta Indonesia?","options":["Bangga pada negara","Tidak peduli","Meninggalkan budaya"],"answer":"Bangga pada negara","explanation":"Cinta Indonesia berarti bangga dan menjaga negara kita."},{"question":"Budaya Indonesia harus...","options":["Dijaga","Dilupakan","Dibuang"],"answer":"Dijaga","explanation":"Budaya adalah kekayaan bangsa yang harus dijaga."},{"question":"Kita adalah warga...","options":["Indonesia","Negara lain","Tidak punya negara"],"answer":"Indonesia","explanation":"Kita adalah warga negara Indonesia."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's4_m10', 
  4, 
  'Musyawarah bersama', 
  'Berdiskusi untuk mencari kesepakatan', 
  'MessageSquare', 
  'Passa', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Teman-teman ingin memilih ketua kelas 😊"},{"type":"action","text":"Mereka berdiskusi bersama untuk menentukan pilihan."},{"type":"info","text":"Dalam musyawarah, semua orang boleh berbicara."},{"type":"value","text":"Kita harus mendengarkan pendapat teman."},{"type":"closing","text":"Musyawarah itu penting untuk mencapai kesepakatan 🤝"}]'::jsonb, 
  '{"question":"Saat musyawarah, apa yang harus kamu lakukan?","options":[{"text":"Ikut diskusi","isCorrect":true,"feedback":"Hebat! Musyawarah butuh partisipasi semua orang 🤝"},{"text":"Diam saja","isCorrect":false,"feedback":"Coba lagi ya 😊 Kamu boleh menyampaikan pendapat."}]}'::jsonb, 
  '[{"question":"Apa itu musyawarah?","options":["Diskusi bersama","Bermain","Bertengkar"],"answer":"Diskusi bersama","explanation":"Musyawarah adalah berdiskusi bersama untuk mencari solusi."},{"question":"Dalam musyawarah semua orang boleh...","options":["Berpendapat","Diam saja","Pergi"],"answer":"Berpendapat","explanation":"Semua orang berhak menyampaikan pendapat."},{"question":"Musyawarah dilakukan untuk...","options":["Mencari keputusan","Bertengkar","Bermain"],"answer":"Mencari keputusan","explanation":"Musyawarah membantu mencapai keputusan bersama."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's4_m11', 
  4, 
  'Menghargai pendapat teman', 
  'Mendengarkan dan menghormati pendapat teman', 
  'Ear', 
  'Passa', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Temanmu sedang menyampaikan pendapatnya 😊"},{"type":"action","text":"Kamu mendengarkan dengan baik."},{"type":"warning","text":"Kita tidak boleh memotong pembicaraan."},{"type":"info","text":"Menghargai berarti menghormati pendapat orang lain."},{"type":"value","text":"Dengan menghargai, kita bisa hidup rukun 🤝"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan saat teman berbicara?","options":[{"text":"Mendengarkan","isCorrect":true,"feedback":"Hebat! Mendengarkan adalah sikap menghargai 🤝"},{"text":"Mengejek","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus menghargai teman."}]}'::jsonb, 
  '[{"question":"Apa itu menghargai?","options":["Menghormati","Mengejek","Mengabaikan"],"answer":"Menghormati","explanation":"Menghargai berarti menghormati orang lain."},{"question":"Saat teman bicara kita harus...","options":["Mendengar","Memotong","Pergi"],"answer":"Mendengar","explanation":"Mendengarkan adalah bentuk menghargai."},{"question":"Mengejek teman adalah sikap...","options":["Salah","Benar","Biasa saja"],"answer":"Salah","explanation":"Mengejek adalah perilaku yang tidak baik."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's4_m12', 
  4, 
  'Memilih dengan voting', 
  'Cara adil dalam pengambilan keputusan', 
  'Vote', 
  'Passa', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Kelas ingin memilih permainan yang akan dimainkan 🎲"},{"type":"action","text":"Mereka melakukan voting untuk menentukan pilihan."},{"type":"result","text":"Pilihan dengan suara terbanyak menjadi keputusan."},{"type":"info","text":"Voting adalah cara memilih secara bersama."},{"type":"value","text":"Voting adalah cara yang adil untuk menentukan pilihan 👍"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan saat voting?","options":[{"text":"Ikut voting","isCorrect":true,"feedback":"Hebat! Voting butuh partisipasi semua orang 👍"},{"text":"Memaksa pilihan","isCorrect":false,"feedback":"Tidak boleh ya 😊 Kita harus mengikuti aturan."}]}'::jsonb, 
  '[{"question":"Apa itu voting?","options":["Memilih bersama","Bermain","Diam saja"],"answer":"Memilih bersama","explanation":"Voting adalah cara memilih secara bersama."},{"question":"Hasil terbanyak berarti...","options":["Dipilih","Ditolak","Diulang"],"answer":"Dipilih","explanation":"Pilihan dengan suara terbanyak menjadi keputusan."},{"question":"Voting adalah cara yang...","options":["Adil","Curang","Tidak penting"],"answer":"Adil","explanation":"Voting memberi kesempatan yang sama untuk semua orang."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's5_m13', 
  5, 
  'Berbagi dengan adil', 
  'Membagi sama rata tanpa pilih kasih', 
  'Scale', 
  'Aruya', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Ada 3 teman dan 3 kue 🍰"},{"type":"action","text":"Setiap anak mendapat 1 kue."},{"type":"result","text":"Semua mendapatkan bagian yang sama."},{"type":"info","text":"Adil berarti membagi sama rata."},{"type":"value","text":"Adil itu tidak pilih kasih 😊"}]'::jsonb, 
  '{"question":"Bagaimana cara membagi dengan adil?","options":[{"text":"Dibagi sama rata","isCorrect":true,"feedback":"Hebat! Itu adalah sikap adil 😊"},{"text":"Diambil sendiri","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus berbagi dengan adil."}]}'::jsonb, 
  '[{"question":"Apa itu adil?","options":["Sama rata","Memilih teman","Tidak peduli"],"answer":"Sama rata","explanation":"Adil berarti semua mendapat bagian yang sama."},{"question":"Berbagi harus dilakukan dengan cara...","options":["Adil","Sembarangan","Tidak perlu"],"answer":"Adil","explanation":"Berbagi harus dilakukan secara adil."},{"question":"Adil berarti...","options":["Tidak pilih kasih","Memilih teman","Mementingkan diri sendiri"],"answer":"Tidak pilih kasih","explanation":"Adil berarti tidak membedakan orang lain."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's5_m14', 
  5, 
  'Hak dan kewajiban', 
  'Keseimbangan hak dan tanggung jawab', 
  'BalanceScale', 
  'Aruya', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"info","text":"Hak adalah sesuatu yang kita dapatkan."},{"type":"example","text":"Contohnya: mendapat belajar di sekolah 📚"},{"type":"info","text":"Kewajiban adalah sesuatu yang harus kita lakukan."},{"type":"example","text":"Contohnya: belajar dengan baik."},{"type":"value","text":"Hak dan kewajiban harus seimbang ⚖️"}]'::jsonb, 
  '{"question":"Apa yang harus kamu lakukan sebagai siswa?","options":[{"text":"Belajar","isCorrect":true,"feedback":"Hebat! Itu adalah kewajibanmu 📚"},{"text":"Malas","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus rajin belajar."}]}'::jsonb, 
  '[{"question":"Apa itu hak?","options":["Sesuatu yang kita dapatkan","Sesuatu yang kita hindari","Sesuatu yang tidak penting"],"answer":"Sesuatu yang kita dapatkan","explanation":"Hak adalah sesuatu yang menjadi milik kita."},{"question":"Apa itu kewajiban?","options":["Sesuatu yang harus dilakukan","Sesuatu yang diabaikan","Sesuatu yang tidak perlu"],"answer":"Sesuatu yang harus dilakukan","explanation":"Kewajiban harus kita lakukan dengan tanggung jawab."},{"question":"Hak dan kewajiban harus...","options":["Seimbang","Diabaikan","Dipilih salah satu"],"answer":"Seimbang","explanation":"Hak dan kewajiban harus berjalan bersama."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  's5_m15', 
  5, 
  'Disiplin itu penting', 
  'Taat aturan dan tepat waktu', 
  'Clock', 
  'Aruya', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYsZO41kBzSBrQ6BCrXim5RMx12dK-xXzexPFgBSdGUil52imX-46dtsvoOWl5XAR3l5loMGCRGZDvo-PVe4tseqw8P13DXojA-Getw_QeJm3lZqZUOFLVL9Kklk9ad5xg10HIJAchsx3nEfZhK8nw-PAGkJAnwkTHMj2X7OYCFU6nE33lXXuyRFSYaneQA0_1iEqOD931dg6JrmqGLfEDnVNQ0nmWh-Sz_IFT-ZZeNbomSq_2KKpep1vInLdMILQQl7ipAMIEQs', 
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqR-_2Z4H2s2_N742yG_p4u9Lz_hO6f-4I23uGgJ7fK_Pq5hR8u169xOKe5vXF-y1YjKz-zF8_4rNnx6jXy9P63uQ_v5fV3UqM4eP7_v0P6G_q7RzVXbB1LkVx-VzDk8hK_Z4F7y2M6iL6V9q6B6J-qY8uK6c_h5u6wTqz4fX_yVXv3A', 
  '[{"type":"story","text":"Sekolah memiliki aturan yang harus dipatuhi."},{"type":"info","text":"Disiplin berarti taat pada aturan."},{"type":"example","text":"Contohnya: datang tepat waktu ke sekolah ⏰"},{"type":"warning","text":"Melanggar aturan adalah sikap tidak baik."},{"type":"value","text":"Disiplin membuat kita menjadi anak yang bertanggung jawab 👍"}]'::jsonb, 
  '{"question":"Apa yang kamu lakukan agar disiplin?","options":[{"text":"Tepat waktu","isCorrect":true,"feedback":"Hebat! Itu contoh sikap disiplin 👍"},{"text":"Terlambat","isCorrect":false,"feedback":"Coba lagi ya 😊 Kita harus tepat waktu."}]}'::jsonb, 
  '[{"question":"Apa itu disiplin?","options":["Taat aturan","Melanggar aturan","Bermain"],"answer":"Taat aturan","explanation":"Disiplin berarti mengikuti aturan yang ada."},{"question":"Datang tepat waktu adalah contoh...","options":["Disiplin","Malas","Tidak penting"],"answer":"Disiplin","explanation":"Tepat waktu menunjukkan kita disiplin."},{"question":"Melanggar aturan adalah sikap...","options":["Tidak baik","Baik","Biasa saja"],"answer":"Tidak baik","explanation":"Melanggar aturan adalah perilaku yang tidak baik."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;
