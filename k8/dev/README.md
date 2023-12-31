# Group 51's Kubernetes Local Testing Quick Guide

This guide will hoepfully allow you to quickly deploy a kubernetes cluster with all the services, ingress controller, pods and containers! Lens will also be used throughout this guide.

Do note that our team no longer these bare metal configurations as we have migrated to Google Kubernetes Engine (GKE).

## Installation (Recommended)

- Install K8 dependencies

1a. Docker Desktop (easiest)

```bash
  https://docs.docker.com/desktop/install
```

1b. Minikube

```bash
  https://minikube.sigs.k8s.io/docs/start/
```

- Lens GUI for managing K8

```bash
  https://k8slens.dev/
```

## Run Locally

Clone the project

```bash
  https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51.git
```

Go to our main directory

```bash
  cd ./CS3219-AY2324S1/ay2324s1-course-assessment-g51/Server-Configs/Without-K8/dev
```

Build all images and wait for all images to be built

```bash
  docker compose build
```

Enable Kubernetes Cluster In Docker Desktop
![unknown_2023 10 15-05 21_2](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51/assets/34855234/a24faf73-84fe-471f-8267-83aa68515691)

Launch Lens & Sync kubeconfig
![unknown_2023 10 15-05 30_1](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51/assets/34855234/9aac61ef-0b86-46dc-9f60-583b2b8a3376)

Create "dev" Namespace
![lens-namespace](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51/assets/34855234/4bea11d1-32bc-49d7-af13-e1169e7cc730)

Deploy everything!

```bash
  kubectl apply -k .
```

## For Full Control Of Deployment

<details>
    <summary>Show me!</summary>
  
Deploy Pods (A pod can contain multiple containers)
```bash
  kubectl apply -f ./deployments/front-end-deployment-dev.yaml
```
```bash
  kubectl apply -f ./deployments/profile-service-deployment-dev.yaml
```
```bash
  kubectl apply -f ./deployments/question-service-deployment-dev.yaml
```
```bash
  kubectl apply -f ./deployments/mongodb-statefulset-dev.yaml
```
```bash
  kubectl apply -f ./deployments/postgres-statefulset-dev.yaml
```
```bash
  kubectl apply -f ./deployments/matching-service-deployment-dev.yaml
```
```bash
  kubectl apply -f ./deployments/matching-service-db-statefulset-dev.yaml
```
```bash
  kubectl apply -f ./deployments/matching-worker-service-deployment-dev.yaml
```
```bash
  kubectl apply -f ./deployments/rabbitmq-deployment-dev.yaml
```
Deploy Services (A service represents network connectivity policy for a pod)

```bash
  kubectl apply -f ./services/front-end-service-dev.yaml
```

```bash
  kubectl apply -f ./services/profile-service-service-dev.yaml
```

```bash
  kubectl apply -f ./services/question-service-service-dev.yaml
```

```bash
  kubectl apply -f ./services/mongodb-service-dev.yaml
```

```bash
  kubectl apply -f ./services/postgres-service-dev.yaml
```

```bash
  kubectl apply -f ./services/matching-service-db-service-dev.yaml
```

```bash
  kubectl apply -f ./services/matching-service-service-dev.yaml
```

```bash
  kubectl apply -f ./services/rabbitmq-service-dev.yaml
```

Deploy NGINX Ingress Controller (It is our reverse proxy and traffic load balancer)

```bash
  kubectl apply -f ./ingresses/nginx-ingress-dev.yaml
```

Deploy PVCs (Persistent Volume Claims)

```bash
  kubectl apply -f ./volumes/mongodb-pvc-dev.yaml
```

```bash
  kubectl apply -f ./volumes/postgres-pvc-dev.yaml
```

Deploy Horizontal Pod Autoscalers (HPA)

```bash
  kubectl apply -f ./scalers/horizontal/front-end-hpa-dev.yaml
```

Deploy ConfigMaps (.env file equivalent!)

```bash
  kubectl apply -f ./configMaps/postgres-config-dev.yaml
```

```bash
  kubectl apply -f ./configMaps/question-service-config-dev.yaml
```

```bash
  kubectl apply -f ./configMaps/matching-service-config-dev.yaml
```

```bash
  kubectl apply -f ./configMaps/matching-service-db-config-dev.yaml
```

```bash
  kubectl apply -f ./configMaps/matching-worker-service-config-dev.yaml
```

```bash
  kubectl apply -f ./configMaps/rabbitmq-config-dev.yaml
```

</details>

## Configure Port Forwarding For All Services (Must Do!)

![front-end-service-dev_1](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51/assets/34855234/5307ff49-b906-4625-889f-f3485bc39876)

## Access Everything Locally

#### Peer Prep App

```bash
  http://localhost:3000
```

#### Question Service APIs

```bash
  http://localhost:8080
```

#### Profile Service APIs

```bash
  http://localhost:3100
```

#### Matching Service APIs

```bash
  http://localhost:8000
```

#### Collaboration Service APIs

```bash
  http://localhost:8576
```

## When You're Done? Delete Everything!

```bash
  kubectl delete -k .
```

## FAQ

#### 1. Why do I need to port forward locally?

Everything is running in a K8 cluster. Forwarding ports allows network traffic to flow from pods inside the cluster to your localhost machine

#### 2. Why K8 is done?

K8 allows us to specify exactly the resources we want and we can scale very easily. However, there is much more boilerplate compared to running containers using docker compose

#### 3. I noticed that my system resources is used alot. Is K8 using too much?

Docker Desktop is actually using a lot of resource by default!
For windows users, please check out how to reduce docker desktop resources by modifying the wsl2 file.
For mac users, please adjust the resources given to docker desktop in the settings page.

#### 4. How much resources is K8 using locally?

CPU is about 5% of 2 Cores and RAM is about 300MB

## Common K8 terminologies

- K8: An abbreviation for Kubernetes, an open-source container orchestration platform.

- Cluster: A group of interconnected machines (nodes) that work together to manage and run containerized applications within the Kubernetes environment. A cluster typically consists of a master node and multiple worker nodes.

- Node: Also known as a worker node, it is a machine within the cluster responsible for running containers. Nodes are responsible for executing and managing workloads.

- Pod: The smallest deployable unit in Kubernetes. It's a group of one or more containers that share storage, network resources, and specifications for how to run the containers.

- Master Node: The control plane component of a Kubernetes cluster. It manages the overall state of the cluster, schedules workloads, and ensures high availability.

- Worker Node: A node in the Kubernetes cluster responsible for running containers and hosting pods. Also known as a minion.

- ReplicaSet: An abstraction that ensures a specified number of pod replicas are running at any given time, providing high availability for applications.

- Deployment: A higher-level resource in Kubernetes that manages ReplicaSets and provides declarative updates to applications. It is often used to define the desired state of an application.

- Service: An abstraction that defines a logical set of pods and a policy to access them. It provides network connectivity to the pods.

- Namespace: A way to partition resources within a cluster, allowing multiple teams or applications to coexist and isolate their workloads.

- ConfigMap: A Kubernetes object used to store configuration data in key-value pairs, making it easier to manage and modify configuration settings for applications.

- Secret: Similar to ConfigMaps but used for sensitive data such as API keys and passwords, which are stored securely and can be mounted into pods.

- Container: A lightweight, stand-alone, and executable software package that includes everything needed to run a piece of software, including the code, runtime, libraries, and system tools.

- Image: A static snapshot of a container, including the application code and all its dependencies. It is used to create containers when pods are started.

- Ingress: An API object that manages external access to services within a cluster, typically acting as a traffic controller for routing external requests to the appropriate services.

- Volume: A directory or storage medium that can be mounted into containers, allowing data to be shared and persisted.

- StatefulSet: A Kubernetes resource used to manage stateful applications, ensuring stable network identities and persistent storage for pods.

- DaemonSet: Ensures that all (or a subset of) nodes run a copy of a pod, which is useful for tasks like system monitoring agents.
