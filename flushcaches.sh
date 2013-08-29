echo "# Flushing all projec's caches..."

rm -r app/coffeescript/_cache/*
echo "1.) Flushed coffeescript cache"

rm -r app/javascripts/_cache/*
echo "1.) Flushed javascript cache"

rm -r app/img/_cache/*
echo "1.) Flushed image cache"

rm -r app/styles/_cache/*
echo "1.) Flushed styles cache"

rm -r app/fonts/_cache/*
echo "1.) Flushed fonts cache"

rm -r app/markdown/_cache/*
echo "1.) Flushed markdown cache"

echo "# Done: Caches fresh!"