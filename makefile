# Vevo Generic Makefile for serverless applications

APP_NAME=my-service-name
APP_PROD_URL=http://my-service-name.vevo.com
APP_DEV_URL=

APP_DATADOG_DASHBOARD_URL=
APP_LAMBDA_URL=https://console.aws.amazon.com/lambda/home?region=us-east-1\#/functions?display=grid&search=my-service-name
APP_API_GATEWAY_URL=

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
	$(MOCHA) test/
	$(ISTANBUL) cover $(MOCHA) -- test/

deploy-resources:
	echo "Resources are deployed in deploy-functions..."

deploy-functions:
	$(SLS) deploy -s $(DEPLOY_STAGE)

deploy: install deploy-resources deploy-functions

notify_slack_success:
	curl -X POST -d'{"channel": "#production-releases","icon_emoji": ":zap:","text": "*$(APP_NAME) Production Deploy Succeeded*","attachments": [{"fallback": "$(APP_NAME) Production Deploy Succeeded","color": "good","fields": [{"title": "Info","value": "Production URL: $(APP_PROD_URL)\nDevelopment URL: $(APP_DEV_URL)\n\nDataDog Dashboard: $(APP_DATADOG_DASHBOARD_URL)\nLambda(s): $(APP_LAMBDA_URL)\nAPI Gateway: $(APP_API_GATEWAY_URL)\nDeployment History: <https://gocd.vevodev.com/go/tab/pipeline/history/$(APP_NAME)|'${GO_PIPELINE_NAME}'>\nLast Deployment: <https://gocd.vevodev.com/go/pipelines/value_stream_map/$(APP_NAME)/'${GO_PIPELINE_COUNTER}'|'${GO_PIPELINE_COUNTER}'>","short": false}]}]}' $(SLACK_HOOK)

notify_slack_failure:
	curl -X POST -d'{"channel": "#production-releases","icon_emoji": ":zap:","text": "*$(APP_NAME) Production Deploy Failed*","attachments": [{"fallback": "$(APP_NAME) Production Deploy Failed","color": "danger","fields": [{"title": "Info","value": "Production URL: $(APP_PROD_URL)\nDevelopment URL: $(APP_DEV_URL)\n\nDataDog Dashboard: $(APP_DATADOG_DASHBOARD_URL)\nLambda(s): $(APP_LAMBDA_URL)\nAPI Gateway: $(APP_API_GATEWAY_URL)\nDeployment History: <https://gocd.vevodev.com/go/tab/pipeline/history/$(APP_NAME)|'${GO_PIPELINE_NAME}'>\nLast Deployment: <https://gocd.vevodev.com/go/pipelines/value_stream_map/$(APP_NAME)/'${GO_PIPELINE_COUNTER}'|'${GO_PIPELINE_COUNTER}'>","short": false}]}]}' $(SLACK_HOOK)
