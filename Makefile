TAG := latest
NAME := dev2019/visualization
DNAME := visualization-demo

all: build

start: stop rm run

build:
	yarn build
	docker build -t $(NAME):$(TAG) -f .docker/Dockerfile .

stop:
	docker stop $(DNAME)

rm:
	docker rm $(DNAME)

run:
	docker run \
		-p 2020:8080 \
		-d \
		--name $(DNAME) \
		$(NAME):$(TAG)