#
# Makefile
#

#set default STAGE based on your username and hostname
APP_DIR=app
TEST_DIR=tests
API_BASE_URL ?= http://localhost:8000

#==========================================================================
deps:
	@poetry --version &> /dev/null || (echo -e "ERROR: please install poetry" && false)
	poetry config virtualenvs.in-project true
	poetry env list
	poetry env info
	poetry install
	touch $@

format: deps
	poetry run isort $(APP_DIR)/**.py $(TEST_DIR)/**.py
	poetry run black $(APP_DIR) $(TEST_DIR)

lint: deps
	poetry run flake8 --version
	poetry run flake8 ${APP_DIR} ${TEST_DIR}

isort: deps
	poetry run isort --check-only $(APP_DIR)/**.py $(TEST_DIR)/**.py

black: deps
	poetry run black --check $(APP_DIR) $(TEST_DIR)
