# Petunjuk Konversi SVG ke PNG

Untuk mengkonversi file SVG ke PNG, Anda dapat menggunakan salah satu metode berikut:

## Menggunakan Online Converter

1. Kunjungi situs seperti [SVG2PNG](https://svgtopng.com/) atau [Convertio](https://convertio.co/svg-png/)
2. Upload file `cosmic-icon.svg` 
3. Pilih ukuran output 192x192 dan 512x512
4. Download hasil konversi sebagai `cosmic-icon-192.png` dan `cosmic-icon-512.png`
5. Tempatkan file-file tersebut di dalam folder `frontend/public/`

## Menggunakan Inkscape (Software Gratis)

1. Buka file `cosmic-icon.svg` dengan Inkscape
2. Pilih menu File > Export PNG Image
3. Atur ukuran ekspor ke 192x192 px dan ekspor sebagai `cosmic-icon-192.png`
4. Ulangi dengan ukuran 512x512 px dan ekspor sebagai `cosmic-icon-512.png`
5. Tempatkan file-file tersebut di dalam folder `frontend/public/`

## Menggunakan Command Line dengan ImageMagick

Jika Anda memiliki ImageMagick terinstal:

```bash
# Konversi ke ukuran 192x192
convert -background none -density 300 cosmic-icon.svg -resize 192x192 cosmic-icon-192.png

# Konversi ke ukuran 512x512
convert -background none -density 600 cosmic-icon.svg -resize 512x512 cosmic-icon-512.png
```

Setelah selesai konversi, file PNG akan siap digunakan sebagai favicon dan ikon aplikasi sesuai yang didefinisikan dalam `manifest.json`. 