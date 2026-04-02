#!/bin/bash

echo "Running Terraform format check..."
terraform fmt -check

echo "Validating Terraform configuration..."
terraform validate