CWD := $(shell pwd)
LIB := $(CWD)/lib

all: clean grunt

clean:
	rm -rf $(CWD)/*.min.js

grunt:
	grunt

test:
	mocha -r should --reporter spec $(CWD)/test/*.test.js

.PHONY: test
