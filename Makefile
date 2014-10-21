SUBDIRS = mice editor conf demo3

SRCS := ${shell find ${SUBDIRS} -type f -print}
HILIS = $(patsubst %.js,%.js.html,$(SRCS))

all: clean dist

hili: $(HILIS)

clean:
	if [ -e dist/ ]; then rm -rf dist; fi

prepare:
	if [ ! -e dist/ ]; then mkdir -p dist; fi
	cp node_modules/react/dist/react.min.js dist/react.min.js

dist: prepare hili
	for dir in $(SUBDIRS); do \
	  $(MAKE) -C $$dir $(MFARGS) ; \
	done

%.js.html: %.js
	@mkdir -p dist/$(@D)
	node ./hilisrc.js $< > dist/$@
