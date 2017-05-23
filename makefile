SLACK_NOTIFY=docker-compose -f docker-compose.slack.yml run --rm

# Do NOT change the following lines unless you know what you are doing

SLS=node_modules/.bin/sls
ISTANBUL=node_modules/.bin/istanbul
MOCHA=node_modules/.bin/_mocha

.DEFAULT_GOAL := test
.PHONY: test

clean:
	rm -rf node_modules
	rm -rf functions/node_modules
	rm -rf .serverless/

install:
	npm install && npm prune
	cd functions && npm install && npm prune

test:
	$(MOCHA) --recursive test/
	$(ISTANBUL) cover $(MOCHA) -- test/

deploy_resources:
	echo "Resources are deployed in deploy-functions..."

deploy_functions:
	$(SLS) deploy --stage $(ENV_SHORTNAME)

deploy: 
	install deploy-resources deploy-functions

slack_success:
	$(SLACK_NOTIFY) success

slack_failure:
	$(SLACK_NOTIFY) failure