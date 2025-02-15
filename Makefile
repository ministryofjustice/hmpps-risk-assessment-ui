SHELL = '/bin/bash'
PROJECT_NAME = community-payback-assessment
DEV_COMPOSE_FILES = -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.dev.yml
TEST_COMPOSE_FILES = -f docker-compose.yml -f docker-compose.test.yml
LOCAL_COMPOSE_FILES = -f docker-compose.yml -f docker-compose.local.yml
export COMPOSE_PROJECT_NAME=${PROJECT_NAME}

default: help

help: ## The help text you're reading.
	@grep --no-filename -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

pull: ## Pulls the latest containers
	docker compose pull --policy missing

up: ## Starts the UI in a production container.
	docker compose ${LOCAL_COMPOSE_FILES} up ui --wait --no-recreate

down: ## Stops and removes all containers in the project.
	docker compose ${LOCAL_COMPOSE_FILES} down
	make test-down

build-ui: ## Builds a production image of the UI.
	docker compose build ui

dev-up: ## Starts/restarts the UI in a development container. A remote debugger can be attached on port 9229.
	docker compose ${DEV_COMPOSE_FILES} down ui
	docker compose ${DEV_COMPOSE_FILES} up ui --wait --no-recreate

dev-build: ## Builds a development image of the UI and installs Node dependencies.
	docker compose ${DEV_COMPOSE_FILES} build ui

dev-down: ## Stops and removes all dev containers.
	docker compose ${DEV_COMPOSE_FILES} down

dev-update: update dev-build ## Pulls latest docker images, re-builds the Dev UI and copies node_modules to local filesystem.
	rm -rf node_modules
	docker compose ${DEV_COMPOSE_FILES} run --no-deps --name ui-node-modules ui node -v
	docker container cp ui-node-modules:/app/node_modules .
	docker container rm -f ui-node-modules

test: ## Runs the unit test suite.
	docker compose ${DEV_COMPOSE_FILES} run --rm --no-deps ui npm run test

lint: ## Runs the linter.
	docker compose ${DEV_COMPOSE_FILES} run --rm --no-deps ui npm run lint

lint-fix: ## Automatically fixes linting issues.
	docker compose ${DEV_COMPOSE_FILES} run --rm --no-deps ui npm run lint:fix

test-up: pull ## Stands up a test environment.
	docker compose ${TEST_COMPOSE_FILES} -p ${PROJECT_NAME}-test up ui --wait --no-recreate

test-down: ## Stops and removes all of the test containers.
	docker compose ${TEST_COMPOSE_FILES} -p ${PROJECT_NAME}-test down

BASE_URL ?= "http://localhost:3000"
e2e: ## Run the end-to-end tests locally in the Cypress app. Override the default base URL with BASE_URL=...
	npm i
	npx cypress install
	npx cypress open -c baseUrl=$(BASE_URL)

BASE_URL_CI ?= "http://community-payback-assessment-ui:3000"
e2e-ci: ## Run the end-to-end tests in parallel in a headless browser. Used in CI. Override the default base URL with BASE_URL_CI=...
	circleci tests glob "integration_tests/integration/features/**/*.feature" | circleci tests split --split-by=timings --verbose | paste -sd ',' > tmp_specs.txt
	cat tmp_specs.txt
	docker compose ${TEST_COMPOSE_FILES} -p ${PROJECT_NAME}-test run --rm cypress --headless -b edge -c baseUrl=${BASE_URL_CI} -s "$$(<tmp_specs.txt)"

update: ## Downloads the latest versions of container images.
	docker compose pull

save-logs: ## Saves docker container logs in a directory defined by OUTPUT_LOGS_DIR=
	docker system info
	mkdir -p ${OUTPUT_LOGS_DIR}
	docker logs ${PROJECT_NAME}-api-1 > ${OUTPUT_LOGS_DIR}/api.log
	docker logs ${PROJECT_NAME}-ui-1 > ${OUTPUT_LOGS_DIR}/ui.log
	docker logs ${PROJECT_NAME}-hmpps-auth-1 > ${OUTPUT_LOGS_DIR}/hmpps-auth.log
	docker logs ${PROJECT_NAME}-arns-api-1 > ${OUTPUT_LOGS_DIR}/arns-api.log
	docker logs ${PROJECT_NAME}-integrations-api-1 > ${OUTPUT_LOGS_DIR}/integrations-api.log
	docker logs ${PROJECT_NAME}-delius-1 > ${OUTPUT_LOGS_DIR}/delius.log
