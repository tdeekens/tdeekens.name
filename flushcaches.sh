echo "# Flushing all project's caches..."

rm -rf app/coffeescript/_cache/*
echo "1.) Flushed coffeescript cache"

rm -rf app/javascripts/_cache/*
echo "2.) Flushed javascript cache"

rm -rf app/img/_cache/*
echo "2.) Flushed image cache"

rm -rf app/styles/_cache/*
echo "3.) Flushed styles cache"

rm -rf app/fonts/_cache/*
echo "4.) Flushed fonts cache"

rm -rf app/markdown/_cache/*
echo "5.) Flushed markdown cache"

echo "# Done: Caches fresh!"