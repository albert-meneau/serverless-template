![Serverless-Template!](https://s27.postimg.org/xrm3zt36r/sls.png)

# Vevo Serverless Template
Serverless-Template is a boilerplate for Vevo serverless projects. It uses best practices for Lambda/API Gateway services and applies [Vevo N-Factor Services](https://vevowiki.atlassian.net/wiki/pages/viewpage.action?pageId=60784844#suk=ff8080814fa68de5014fb8278a290007) standard.

Projects created based on Serverless-Template are fully implemented with AWS Lambda/API Gateway and do not require any server provisioning. 
Serverless-Template uses [Serverless](http://serverless.com) framework to manage, test and deploy Lambda and other resources.

## What You Get

A production-ready nanoservice with the following capabilities:
- DataDog integration with custom metrics
- Centralized CloudWatch logs
- GoCD ready - templatized pipeline
- Multi-environments deployments (dev, staging, prod)
- Slack notification
- Environment aware configuration
- Base tests
- more


## Usage
1. Make sure you have Serverless framewrok v1.6 or greater installed. ([How to install?](https://serverless.com/framework/docs/providers/aws/guide/installation/))
2. Run `sls install --url https://github.com/VEVO/serverless-template --name <my-service-name>`. 
Don't forget to use your actual service name instead of `<my-service-name>`. This will create an empty project for you. 
3. `cd my-service-name` and replace all `my-service-name` occurrences in code with your actual service name.
4. Done! You can now make changes and deploy your service. 

### Test
`make test`

### Deploy

1. Set environment variables:

```
export ENV_SHORTNAME=dev
export AWS_PROFILE=default
```
2. `cd my-service-name`
3. `make deploy`
4. Hit the generated endpoint url. 
e.g. `curl https://6e6h2k5ljb.execute-api.us-east-1.amazonaws.com/dev/my-service-name/path`
5. To pull the logs: `sls logs -f myFunction`

### Setup CI/CD (GoCD)
In order to enable continuous deployments, you need to setup a new GoCD pipeline as follows:
1. Go to **Admin => Server Configuration** on menu
2. Click **Edit**
3. Find **'json'** and it should get you to the  `<config-repos>` section
4. Add your project in there.  The name is your github repo
5. Press **SAVE** and GoCD will automatically pick up any check-ins you have

### Congrats! You just created a production-ready scalable nanosrvice!    
   
   
Notes: 
- This is a **public** repo due to Serverless [limitations](https://github.com/serverless/serverless/issues/3059).
- Until [this issue](https://github.com/serverless/serverless/issues/1787) is fixed, you would need an AWS key/secret as role-based profiles will not work. You may do `sls config credentials -p aws --profile default --key XXXX --secret XXXX` to setup your `default` AWS profile.

    
