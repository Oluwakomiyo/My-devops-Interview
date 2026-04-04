# DevOps Interview Project

## Overview

This project demonstrates modern DevOps practices by building, containerizing, and deploying a full-stack application using:

* Node.js (Backend API)
* React (Frontend UI)
* Docker (Containerization)
* Kubernetes (Orchestration)
* Terraform (Infrastructure as Code)
* GitHub Actions (CI/CD)
* Cloud (Azure AKS)

---

## Application Features

### Backend API

Exposes a REST endpoint:

```
GET /api/message
```

Response:

```json
{
  "message": "Automate all the things!",
  "timestamp": 1234567890
}
```

### Frontend

* Displays: **"Automate all the things!"**
* Fetches and displays backend API response

---

## Prerequisites

Ensure you have the following installed:

* Node.js
* Docker (https://www.docker.com/products/docker-desktop/)
* kubectl
* Terraform (https://developer.hashicorp.com/terraform/downloads)
* Git
* Azure CLI (https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
* Cloud account (AWS / GCP / Azure)

---

## 🖥 Local Development

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/devops-interview-project.git
cd devops-interview-project
```

---

### 2. Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Cloud Development

## 1. Setup GitHub Secrets

To allow GitHub Actions to talk to Azure and Docker Hub, add the following secrets in `Settings > Secrets and variables > Actions`:

| Secret Name | Description |
| :--- | :--- |
| `DOCKER_HUB_USERNAME` | Your Docker Hub username |
| `DOCKER_HUB_TOKEN` | Your Docker Hub [Personal Access Token](https://docs.docker.com/security/for-developers/access-tokens/) |
| `AZURE_CLIENT_ID` | Service Principal App ID |
| `AZURE_CLIENT_SECRET` | Service Principal Password |
| `AZURE_TENANT_ID` | Azure Tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure Subscription ID |
| `AZURE_CREDENTIALS` | The full JSON output of the RBAC command (see below) |

### Generating Azure Credentials
Run this command in your terminal to generate the `AZURE_CREDENTIALS` JSON:
```bash
az ad sp create-for-rbac --name "myApp" --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID> --sdk-auth
```

---

## 2. Initial Infrastructure Setup (One-time)

Terraform requires a **Remote Backend** to store its state safely. Create a storage account manually or via CLI:

```bash
# Create Resource Group for State
az group create --name tf-state-rg --location eastus

# Create Storage Account
az storage account create --resource-group tf-state-rg --name tfstate$(date +%s) --sku Standard_LRS

# Create Blob Container
az storage container create --name tfstate --account-name <YOUR_STORAGE_ACCOUNT_NAME>
```
*Update the `terraform init` line in `.github/workflows/cd.yml` with your generated storage account name.*

---

## 3. Deployment Instructions

### Automatic Deployment
1.  Push any change to the `main` branch.
2.  GitHub Actions will:
    *   Build and tag Docker images.
    *   Push images to Docker Hub.
    *   Provision/Update AKS infrastructure.
    *   Inject the new image tags into Kubernetes manifests.
    *   Apply manifests to the cluster.

### Manual Verification
To check the status of your deployment:
```bash
# Get credentials for kubectl
az aks get-credentials --resource-group my-aks-resource-group --name my-aks-cluster

# Check pods
kubectl get pods

# Check service (to find your External IP)
kubectl get service frontend
```

---

## 4. Cleanup Instructions

To avoid ongoing Azure costs, follow these steps to destroy the resources when they are no longer needed.

### Step A: Delete K8s Resources
```bash
kubectl delete -f k8s/
```

### Step B: Destroy Infrastructure (Manual)
Since GitHub Actions is designed for deployment, infrastructure destruction is best handled manually from your local machine to prevent accidental data loss:

```bash
cd terraform/
terraform init -backend-config="..." # Use same config as pipeline
terraform destroy -auto-approve
```

### Step C: Delete Azure State Resource Group
```bash
az group delete --name tf-state-rg --yes --no-wait
```

---

## Best Practices Notes
-   **Image Tagging:** We use Git SHAs for image tags to ensure traceability.
-   **Least Privilege:** The Azure Service Principal should only have "Contributor" access to the specific subscription.
-   **Resource Limits:** Kubernetes manifests include basic resource requests to prevent cluster starvation.

---

## Design Decisions

* **Node.js**: Lightweight and fast for REST APIs
* **React**: Simple UI for demonstration
* **Docker**: Ensures environment consistency
* **Kubernetes**: Provides scalability and resilience
* **Terraform**: Enables reproducible infrastructure
* **GitHub Actions**: Automates CI/CD pipeline

---

## 👨‍💻 Author

OLADEINDE FRANKLYN OLUWAKOMIYO

