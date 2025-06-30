# Dockerfile

# --- Tahap 1: Build Aplikasi React (Build Stage) ---
# Gunakan image Node.js sebagai base image untuk tahap build.
# Kita pakai versi alpine karena lebih ringan.
FROM node:20-alpine AS build

# Set direktori kerja di dalam container.
# Semua perintah selanjutnya akan dijalankan dari direktori ini.
WORKDIR /app

# Salin package.json dan package-lock.json (atau yarn.lock) terlebih dahulu.
# Ini penting untuk memanfaatkan caching Docker. Jika dependensi tidak berubah,
# langkah npm install tidak akan dieksekusi ulang, mempercepat build.
COPY package.json ./
COPY package-lock.json ./

# Instal semua dependensi proyek.
# Hindari --force jika memungkinkan, ini hanya sebagai fallback jika ada masalah peer dependencies.
# Sebaiknya selesaikan warning peer dependencies secara langsung.
RUN npm install

# Salin sisa kode aplikasi dari host ke dalam container.
COPY . .

# Jalankan proses build produksi aplikasi React.
# Output build akan ada di folder `dist`.
RUN npm run build

# --- Tahap 2: Sajikan Aplikasi dengan Nginx (Serve Stage) ---
# Gunakan image Nginx sebagai base image untuk tahap production.
# Nginx sangat efisien untuk menyajikan file statis.
FROM nginx:alpine

# Salin hasil build dari tahap 'build' sebelumnya.
# '/app/dist' adalah lokasi output build dari tahap 'build'.
# '/usr/share/nginx/html' adalah direktori default Nginx untuk file web.
COPY --from=build /app/dist /usr/share/nginx/html

# (Opsional) Jika Anda memiliki konfigurasi Nginx kustom, Anda bisa menyalinnya di sini.
# Contoh: Jika ada file `nginx.conf` di root proyek Anda.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposure port 80. Ini memberitahu Docker bahwa container akan mendengarkan di port ini.
EXPOSE 80

# Perintah default untuk menjalankan Nginx saat container dimulai.
# "-g 'daemon off;'" memastikan Nginx berjalan di foreground, yang penting untuk Docker.
CMD ["nginx", "-g", "daemon off;"]