📚 README — Batch Thumbnail Generation & Grid Gallery
1. Spostati nella cartella immagini
bash
cd /percorso/della/tua/cartella/immagini
2. Verifica la presenza dei file JPG/JPEG
bash
ls *.jpg
ls *.JPG
(se hai nomi misti .jpg e .JPG, esegui entrambi)

3. Crea la cartella thumbs per le anteprime
bash
mkdir thumbs
4. Genera le thumbnails (400x260 px di esempio) con ImageMagick
bash
magick mogrify -resize 400x260 -path thumbs/ *.JPG
(sostituisci *.JPG con *.jpg se i tuoi file sono minuscoli)

5. Problemi comuni
Errore "no matches found: *.jpg"
→ Sei in una cartella senza file .jpg oppure estensioni diverse: controlla dove sei, o prova anche con *.JPG.

Errore "unable to open image 'thumbs/…'"
→ La cartella thumbs non esisteva: crea la cartella, poi rilancia il comando!

6. (FACOLTATIVO) Script universale per .jpg/.JPG/.jpeg
bash
for ext in jpg JPG jpeg; do
  magick mogrify -resize 400x260 -path thumbs/ *.$ext
done
7. Consigli best practice
Le thumbnails devono avere qualità bassa/peso minimo.

Le originali rimangono in /immagini/, servite solo in visualizzazione grande o download.
