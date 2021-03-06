#!/bin/bash

echo "# Updating your project..."

echo "1.) Updating submodules if existentâ€¦"
git submodule sync --quiet || exit $?
git submodule update --init || exit $?
git submodule foreach --recursive --quiet "git submodule sync --quiet && git submodule update --init" || exit $?

echo "2.) Updating dependenciesâ€¦"

echo "2.1.) Composer from composer.json..."
composer update

echo "# Done: Code on!"