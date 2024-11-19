TSHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

all:
	@echo "hello"
up: docker-up


docker-up:
	git pull
build:
	docker-compose -f docker-compose.dev.yml up -d --build 	