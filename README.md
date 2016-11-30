Developer Setup
===============

This temlate is intended to be deployed onto a Kubernetes cluster.  First make sure you have kubectl setup correctly.  In most cases
you will want to use Google Container Engine (GKE) rather than hosting a local kubernetes deployment.

To setup kubectl for GKE do the following:

1. Download and install gcloud:  https://cloud.google.com/sdk/downloads
2. Init Gcloud

    ``` 
    gcloud auth login
    gcloud init
    ```

    Ensure you specify the Compute Engine defaults and choose a default zone that makes your GKE cluster.

3. Install Kubectl.
    ```
    brew install kubernetes-cli
    ```
4. Init Kubectl to point to the GKE cluster
    ```
    gcloud container clusters get-credentials <gke cluster name>
    ```
5. Test the connection between kubectl and the GKE cluster
    ```
    kubectl version
    ```
    That command should produce output describing both the client build details and the server (gke) build details.
    
 6. Deploy the app to your namespace: 
    The below example uses a private namespace called "pw-private"
    ```
     kubectl config view  #look up the context name
     kubectl create namespace pw-private
     kubectl config set-context <kubernetes context name> --namespace pw-private
     
    ```
  

7. Update the gradle files to reflect the project in GCP.  Basically do a text search in *.gradle for:
    ```
    dockerImagePath = "us.gcr.io/*/<good-docker-path>/app"
    ```
   And replace the existing project with your own (if different from default).
 
8. Start the Kubernetes Proxy (for management of the cluster) [Optional].
    ```
    kubectl proxy
    ```
    Now go to http://localhost:8001/ui and you can see the details of the cluster... Useful for debugging.

9. Deploy the app
    ```
    ./gradlew deploy
    ```
   
   
Local Development
=================

The app and service can both be run locally.  To run the App locally, simply:

```
#To build Docker image and run with local dockerd...
./gradlew :NodeApp:runAppLocal

#or, to run node directly:
#in tab 1:
    npm install && gulp watch
# in tab 2:
    cd App/deploy/stage && node server/server.js
```



