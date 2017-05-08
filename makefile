# Vevo Generic Makefile for serverless applications

APP_NAME=my-service-name
APP_PROD_URL=http://my-service-name.vevo.com
APP_DEV_URL=

APP_DATADOG_DASHBOARD_URL=
APP_LAMBDA_URL=https://console.aws.amazon.com/lambda/home?region=us-east-1\#/functions?display=grid&search=my-service-name
APP_API_GATEWAY_URL=

SLACK_NOTIFY=docker-compose -f docker-compose.slack.yml run --rm

# Do NOT change the following lines unless you know what you are doing

SLS=node_modules/.bin/sls
ISTANBUL=node_modules/.bin/istanbul
MOCHA=node_modules/.bin/_mocha

.DEFAULT_GOAL := test
.PHONY: test

clean:
	rm -rf node_modules

install:
	npm install; npm prune;

test:
	$(MOCHA) --recursive test/
	$(ISTANBUL) cover $(MOCHA) -- test/

deploy-resources:
	echo "Resources are deployed in deploy-functions..."

deploy-functions:
	$(SLS) deploy -s $(ENV_SHORTNAME)

deploy: install deploy-resources deploy-functions

slack_success:
	$(SLACK_NOTIFY) success

slack_failure:
	$(SLACK_NOTIFY) failure