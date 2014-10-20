SUBDIRS = mice editor conf demo3

all: clean dist

clean:
	if [ -e dist/ ]; then rm -rf dist; fi

prepare:
	if [ ! -e dist/ ]; then mkdir dist; fi
	cp node_modules/react/dist/react.min.js dist/react.min.js

dist: prepare
	for dir in $(SUBDIRS); do \
	  $(MAKE) -C $$dir $(MFARGS) ; \
	done
