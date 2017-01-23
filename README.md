![Serverless-Template!](https://s27.postimg.org/xrm3zt36r/sls.png)

# Vevo Serverless Template
Serverless-Template is a boilerplate for Vevo serverless projects. It uses best practices for Lambda/API Gateway services and applies [Vevo N-Factor Services](https://vevowiki.atlassian.net/wiki/pages/viewpage.action?pageId=60784844#suk=ff8080814fa68de5014fb8278a290007) standard.

Projects created based on Serverless-Template are fully implemented with AWS Lambda/API Gateway and do not require any server provisioning. 
Serverless-Template uses [Serverless](http://serverless.com) framework to manage, test and deploy Lambda and other resources.

## Usage
1. Make sure you have Serverless framewrok v1.5 or greater installed. ([How to install?](https://serverless.com/framework/docs/providers/aws/guide/installation/))
2. Run `sls install --url https://github.com/VEVO/serverless-template --name my-service-name`. Use the actual service name instead of `my-service-name` 

This will create an empty project. You can then make changes and deploy your service. 
The first thing you want to do is finding and replacing all `my-service-name` occurrences with your actual service name.

### Deploy and test your newly created service:

1. Set environment variables:

```
export DEPLOY_STAGE=dev
export AWS_PROFILE=default
```
2. `cd my-service-name`
3. `make deploy`
4. Hit the generated endpoint url. 
e.g. `curl https://6e6h2k5ljb.execute-api.us-east-1.amazonaws.com/dev/my-service-name/path`
5. To pull the logs: `sls logs -f myFunction`

### Setup GoCD pipeline
1. Admin/Pipelines/serverless-sample: Click "Clone"
2. Set "New Pipeline Name" to `your-project-name`
3. Materials: Edit GitHub repo and test the connection 
4. Environment Variables: Set any required environment variables (regular and secure)
5. Environments/default/pipelines edit: Find and check `your-project-name`
6. Pipelines/`your-project-name`: Unpause the pipeline (click on "pause" icon)

### Congrats! You just created a production-ready scalable microsrvice!    
   
   
Notes: 
- This is a **public** repo due to Serverless [limitations](https://github.com/serverless/serverless/issues/3059).
- Until [this issue](https://github.com/serverless/serverless/issues/1787) is fixed, you would need an AWS key/secret as role-based profiles will not work. You may do `sls config credentials -p aws --profile default --key XXXX --secret XXXX` to setup your `default` AWS profile.
