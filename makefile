APP_NAME=my-service-name
APP_DEV_URL=
APP_PROD_URL='http://my-service-name.vevo.com'
APP_LAMBDA_URL='https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions?display=list&search=my-service-name'
APP_API_GATEWAY_URL=
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

deploy:
	$(SLS) deploy -s $(DEPLOY_STAGE)

prod_slack_good:
	curl -X POST -d'{"channel": "#production-releases","text": "*'${APP_NAME}' Production Deploy Succeeded*","attachments": [{"fallback": "$(APP_NAME) Production Deploy Succeeded","color": "good","fields": [{"title": "Info","value": "Production URL: '${APP_PROD_URL}'\nDevelopment URL: '${APP_DEV_URL}'\n\nLambda(s): '${APP_LAMBDA_URL}'\nAPI Gateway: '${APP_API_GATEWAY_URL}'\nDeployment History: <https://gocd.vevodev.com/go/tab/pipeline/history/'${APP_NAME}'|'${GO_PIPELINE_NAME}'>\nLast Deployment: <https://gocd.vevodev.com/go/pipelines/value_stream_map/'${APP_NAME}'/'${GO_PIPELINE_COUNTER}'|'${GO_PIPELINE_COUNTER}'>","short": false}]}]}' ${SLACK_HOOK}

prod_slack_danger:
	curl -X POST -d'{"channel": "#production-releases","text": "*'${APP_NAME}' Production Deploy Failed*","attachments": [{"fallback": "$(APP_NAME) Production Deploy Failed","color": "danger","fields": [{"title": "Info","value": "Production URL: '${APP_PROD_URL}'\nDevelopment URL: '${APP_DEV_URL}'\n\nLambda(s): '${APP_LAMBDA_URL}'\nAPI Gateway: '${APP_API_GATEWAY_URL}'\nDeployment History: <https://gocd.vevodev.com/go/tab/pipeline/history/'${APP_NAME}'|'${GO_PIPELINE_NAME}'>\nLast Deployment: <https://gocd.vevodev.com/go/pipelines/value_stream_map/'${APP_NAME}'/'${GO_PIPELINE_COUNTER}'|'${GO_PIPELINE_COUNTER}'>","short": false}]}]}' ${SLACK_HOOK}
