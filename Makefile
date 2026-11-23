# Local development for the website.
#
#   make setup    one-time: install the gems (same versions as GitHub Pages)
#   make serve    run the site at http://localhost:4000 with live reload
#   make images   optimize new images and create gallery thumbnails
#   make build    build the site into _site/ (what GitHub Pages will publish)
#   make doctor   check that everything needed is installed
#   make clean    remove build output and caches
#
# Options:  make serve HOST=0.0.0.0   -> open the site from your phone on the same Wi-Fi
#           make serve PORT=4001

HOST ?= 127.0.0.1
PORT ?= 4000

# Gems are installed inside the project (vendor/bundle), no sudo needed.
export BUNDLE_PATH := vendor/bundle

# Ubuntu ships Bundler with Ruby but not always the `bundle` command.
BUNDLE := $(shell command -v bundle 2>/dev/null || echo ruby $$(ruby -e 'print Gem.bin_path("bundler", "bundle")' 2>/dev/null))
JEKYLL := $(BUNDLE) exec jekyll

.PHONY: help setup serve build images doctor clean

help:
	@sed -n '3,12p' Makefile | sed 's/^# \{0,1\}//'

setup: doctor
	$(BUNDLE) install
	@echo "\nDone. Now run:  make serve"

serve: $(BUNDLE_PATH)
	$(JEKYLL) serve --livereload --host $(HOST) --port $(PORT)

build: $(BUNDLE_PATH)
	JEKYLL_ENV=production $(JEKYLL) build

images:
	python3 scripts/optimize_images.py

$(BUNDLE_PATH):
	@echo "Gems are not installed yet, running 'make setup' first..."
	@$(MAKE) --no-print-directory setup

doctor:
	@ok=1; missing=""; \
	command -v ruby >/dev/null || { echo "✗ ruby not found"; ok=0; missing="$$missing ruby-full"; }; \
	command -v ruby >/dev/null && echo "✓ ruby $$(ruby -e 'print RUBY_VERSION')"; \
	ruby -e 'exit File.exist?(File.join(RbConfig::CONFIG["rubyhdrdir"], "ruby.h"))' 2>/dev/null \
		&& echo "✓ ruby headers" || { echo "✗ ruby headers (needed to compile some gems)"; ok=0; missing="$$missing ruby-dev"; }; \
	command -v gcc >/dev/null && command -v make >/dev/null \
		&& echo "✓ C compiler" || { echo "✗ C compiler"; ok=0; missing="$$missing build-essential"; }; \
	[ -f /usr/include/openssl/ssl.h ] \
		&& echo "✓ OpenSSL headers" || { echo "✗ OpenSSL headers"; ok=0; missing="$$missing libssl-dev"; }; \
	python3 -c 'import PIL' 2>/dev/null \
		&& echo "✓ Python Pillow (for make images)" || echo "! Python Pillow missing: only needed for 'make images' (sudo apt install python3-pil)"; \
	if [ $$ok = 0 ]; then echo "\nInstall the missing packages with:\n\n    sudo apt install$$missing\n"; exit 1; fi

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata .sass-cache
