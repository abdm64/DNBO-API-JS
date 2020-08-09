# DTE-DNBO-API 
API  allow To integrate both DNBO0.5 & DNBO1.0 in single API on the k8s platform (single EndPoint) which will be used later as a communication interface with DNBO system and all other external/internal systems such as VAS, Snoc, DBSS

## api architecture

![Alt text](./images/api-archi.PNG?raw=true "Title")

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to install the fellowing software in order to get the api up and running 
    1-node.js and npm
    2-docker
    3-kubernetes on cloud
    
 # Development environment
 Download and Install node.js and NPM from https://nodejs.org/en/download/
 ## Running node.js api 
1- Download or clone the project code from https://github.com/abdm64/DNBO-API-JS

2- Install all required npm packages by running npm install from the command line in the api folder (where the package.json is located).

3- Start the api by running npm start from the command line in the api folder, you should see the message Server listening on port 3000. You can test the api directly using an application such as Postman or you can test it with one of the page web. 
# Testing environment with Docker
1- Download and install docker in your machine
2- inside the root folder run the fellowing cammand 

```
$docker-compose up 

```
and now the server live on the port 80 using nginx instance
### Docker image 

   Build your own docker image and push it to your repo  by running  "docker build -t my-app-name:v1 . "
   from the cammand line in api folder you can push it to your own registy 


 
 # Production environment
Deploying this app on kubernetes system can be so easy by applying the k8s yaml files, make sure that you upload the app image to the docker hub or private registry and change the image name config in stage-deployment.yaml  , then run "sudo kubectl apply -f k8s" from the cammand line in the root folder

 Remember : "always you can change the config and the docker image" 


## Deployment Architecture

![Alt text](./images/dep-Archi.PNG?raw=true "Title")


## Author

* **Messelleka Abdellah** - *DevOps Engineer @* - [Djezzy](http://www.djezzy.dz/)



## License

This project is licensed under the MIT License 

## Credits

Made with ❤️ by Abdellah 



    
