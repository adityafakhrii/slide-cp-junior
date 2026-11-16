# Materi Slide Presentasi — Pertemuan 41

**Judul Pertemuan:** Misi Terbang Tinggi (Flyer Game): Mengendalikan Burung Melewati Rintangan Awan di Langit!

**Level:** Code Explorer (Usia 5–7 Tahun)

**Total Slide:** 10 Slide

## Slide 1: Sampul Pertemuan (Cover)

* **Tata Letak:** Hero Split Layout (Teks di kiri, ilustrasi karakter besar di kanan).

* **Badge Atas:** `CODEPOLITAN JUNIOR • PERTEMUAN 41`

* **Judul Utama:** Misi **Terbang Tinggi!** *(Stabilo kuning pada kata "Terbang Tinggi!")*

* **Subjudul:** Mengendalikan Burung Melewati Rintangan Awan di Langit

* **Elemen Visual:**

  * Maskot **Biko** memakai kacamata pilot ceria di samping layar laptop Scratch 3.0, tempat **Burung Kakaktua** terbang lincah naik-turun menghindari **Awan Tebal** di langit biru.

  * Ornamen kilau bintang `✦` dan simbol `{ }` `</>` melayang di latar krem bergaris kotak tipis.

## Slide 2: Misi Hari Ini

* **Tata Letak:** 2 Kartu Misi Besar Berdampingan dalam bingkai macOS Window.

* **Badge Atas:** `MISI GAME HARI INI`

* **Judul Utama:** Apa Misi Game Kita Hari Ini?

* **Konten Kartu:**

  * **Kartu 1 (Aksen Biru `#60A5FA`):**

    * **Ikon:** Tombol panah keyboard `⬆️` `⬇️` menggerakkan Burung di langit.

    * **Teks:** Kendalikan **Burung Terbang** Naik & Turun

  * **Kartu 2 (Aksen Coral `#F45B49`):**

    * **Ikon:** Awan meluncur otomatis dengan tanda radar sensor sentuhan.

    * **Teks:** Hindari **Rintangan Awan** Pakai Sensor!

* **Elemen Visual:** Maskot **Biko** menunjuk ke arah dua kartu misi dengan ekspresi penuh semangat.

## Slide 3: Langkah #1 — Siapkan Langit, Burung & Awan!

* **Tata Letak:** Spotlight Card (Ilustrasi panggung di kiri, kartu penjelasan singkat di kanan).

* **Badge Atas:** `PERSIAPAN PANGGUNG GAME`

* **Judul Utama:** Siapkan **3 Bahan Utama** Game! *(Stabilo kuning pada kata "3 Bahan Utama")*

* **Teks Isi (Poin Ikon):**

  * 🌤️ Latar panggung: **Langit Biru (*Blue Sky*)**

  * 🦜 Karakter 1: **Burung (*Parrot*)** — ubah ukuran **`Size` jadi `50`** biar lincah!

  * ☁️ Karakter 2: **Awan (*Clouds*)** sebagai rintangan langit!

* **Elemen Visual:**

  * Tangkapan antarmuka Scratch 3.0 berlatar langit cerah dengan **Burung** mungil di sisi kiri dan **Awan** di sisi kanan, disertai sorotan kuning pada kotak pengaturan `Size: 50`.

## Slide 4: Jurus #1 — Kemudi Terbang Naik & Turun!

* **Tata Letak:** 2 Kartu Rangkaian Kode Kiri-Kanan dalam bingkai macOS Window.

* **Badge Atas:** `KODE BURUNG • KEMUDI KEYBOARD`

* **Judul Utama:** Atur **Terbang Naik & Turun!** *(Stabilo kuning pada kata "Naik & Turun!")*

* **Konten Kartu:**

  * **Kartu Kiri — Terbang Naik (`⬆️` Biru `#60A5FA`):**

    * **Rangkaian:** `when [up arrow] key pressed` ➡️ `change y by (20)`

    * **Teks:** Tekan Panah Atas ➡️ **Terbang Naik!**

  * **Kartu Kanan — Terbang Turun (`⬇️` Hijau `#10B981`):**

    * **Rangkaian:** `when [down arrow] key pressed` ➡️ `change y by (-20)`

    * **Teks:** Tekan Panah Bawah ➡️ **Terbang Turun!**

* **Elemen Visual:** Ilustrasi **Burung** mengepakkan sayap naik saat panah atas ditekan dan turun menghindar saat panah bawah ditekan, ditunjuk oleh **Biko**.

## Slide 5: Jurus #2 — Awan Meluncur Otomatis di Langit!

* **Tata Letak:** Spotlight Card (Ilustrasi Awan & blok di kiri, kartu penjelasan singkat di kanan).

* **Badge Atas:** `KODE AWAN • GERAK OTOMATIS`

* **Judul Utama:** Bikin **Awan Meluncur** Terus! *(Stabilo kuning pada kata "Awan Meluncur")*

* **Teks Isi (Poin Ikon):**

  * ☁️ Ketuk Sprite **Awan (*Clouds*)** di kanan bawah

  * 🧩 Rangkai: `when 🏁 clicked` ➡️ `forever` memeluk `glide (2) secs to [random position]`!

* **Elemen Visual:**

  * Ilustrasi **Awan** meluncur otomatis melintasi langit dengan jejak garis putus-putus, disertai tumpukan blok Scratch 3.0 yang menyatu rapi di bagian bawah.

## Slide 6: Permainan Cepat — Blok Apa untuk Radar Awan?

* **Tata Letak:** Interactive Choice Cards (Pertanyaan di atas + 2 Kartu blok besar di bawah).

* **Badge Atas:** `AYO TEBAK!`

* **Judul Utama:** Blok Mana Biar Burung Tahu Kalau **Menyentuh Awan?**

* **Pilihan Kartu:**

  * **Kartu A (Kiri):** Blok segi enam biru muda **`touching [Clouds] ?`** dengan ikon awan. Label: **Sensor Sentuhan (Touching)**

  * **Kartu B (Kanan):** Blok biru **`glide (2) secs to [random position]`** dengan ikon lintasan. Label: **Blok Meluncur (Glide)**

* **Teks Bawah:** Tunjuk blok yang benar di layarmu ya!

* **Elemen Visual:** Maskot **Biko** memegang papan tanda tanya `?` di bagian tengah bawah slide.

## Slide 7: Jurus #3 — Radar Sensor & Kepakan Sayap Burung!

* **Tata Letak:** 2 Kartu Rangkaian Kode Kiri-Kanan dalam bingkai macOS Window.

* **Badge Atas:** `KODE BURUNG • ANIMASI & SENSOR`

* **Judul Utama:** Pasang **Sayap** & **Radar Sensor!** *(Stabilo kuning pada kata "Sayap" & "Radar Sensor!")*

* **Konten Kartu:**

  * **Kartu Kiri — Kepakan Sayap (`🦜` Ungu `#A78BFA`):**

    * **Rangkaian:** `when 🏁 clicked` ➡️ `forever` memeluk `next costume` + `wait (0.2) seconds`

    * **Teks:** Sayap mengepak **Terus-Menerus!**

  * **Kartu Kanan — Radar Awan (`📡` Coral `#F45B49`):**

    * **Rangkaian:** `when 🏁 clicked` ➡️ `forever` memeluk `if < touching [Clouds] ? > then` ➡️ `start sound [Boing]` + `say [Awas awan!] for (1) seconds`

    * **Teks:** Kena Awan ➡️ **Ada Peringatan!**

* **Elemen Visual:** Maskot **Biko** tersenyum menunjuk bagaimana Burung mengepakkan sayap sambil menyalakan radar sensor awan.

## Slide 8: Tips Jagoan Pembuat Flyer Game

* **Tata Letak:** 2 Kolom Perbandingan Kontras (Kiri: Boleh/Seru, Kanan: Jangan/Gagal).

* **Badge Atas:** `TIPS GAME TERBANG TINGGI`

* **Judul Utama:** Rahasia Game Terbangmu Makin Asyik!

* **Kolom Kiri — BOLEH (`✅` Border Hijau `#10B981`):**

  * 🐦 Kecilkan ukuran Burung (**`Size: 50`**) agar mudah menyelinap

  * ☁️ Pilih nama **`Clouds`** di dalam blok sensor `touching`

* **Kolom Kanan — JANGAN (`❌` Border Coral `#F45B49`):**

  * 🦅 Membiarkan Burung **Terlalu Besar** memenuhi langit

  * 🙈 Lupa membungkus sensor `if` di dalam blok **`forever`**

* **Elemen Visual:** Ilustrasi Burung mungil lincah menyelinap melewati Awan (`✅`) vs Burung raksasa memenuhi seluruh layar bertanda silang merah (`❌`).

## Slide 9: Misi Praktik — Mainkan Game Terbang Tinggi!

* **Tata Letak:** 3 Blok Langkah Horizontal ala Scratch (`1` -> `2` -> `3`).

* **Badge Atas:** `AYO BUAT & MAIN!`

* **Judul Utama:** Misi **Game Burung Terbang!**

* **Langkah Misi:**

  * **Blok `1` (Biru `#60A5FA`):** 🌤️ Pasang latar **Langit**, **Burung (`Size 50`)**, & **Awan (*Clouds*)**

  * **Blok `2` (Kuning `#FBBF24`):** 🧩 Rangkai kode **Kemudi Naik-Turun**, **Awan Meluncur**, & **Radar Sensor**

  * **Blok `3` (Hijau `#10B981`):** 🏁 Klik **Bendera Hijau!** Tekan `⬆️` `⬇️` & hindari semua awan!

* **Elemen Visual:** Ilustrasi layar Scratch 3.0 berlatar langit biru menampilkan game Burung Terbang melewati rintangan awan, ditemani **Biko** dan **Kucing Scratch** yang bersorak menyemangati.

## Slide 10: Lencana Juara Pertemuan 41

* **Tata Letak:** Celebration Center Card (Kartu pencapaian di tengah slide).

* **Badge Atas:** `MISI SELESAI!`

* **Judul Utama:** Hore! Kamu Pilot & Pembuat Flyer Game Hebat! 🎉

* **Teks Lencana:**

  * 🏅 **Lencana Master Flyer Game Scratch 3.0**

  * Kamu sudah berhasil menggabungkan **Keyboard, Gerak Otomatis, & Sensor**!

* **Elemen Visual:**

  * Piala dan medali emas besar bergambar sayap pilot bintang dan awan langit di tengah kartu.

  * Maskot **Biko**, **Kucing Scratch**, dan **Burung** melompat gembira merayakan keberhasilan bersama konfeti warna-warni.