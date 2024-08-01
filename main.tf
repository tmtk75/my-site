/*
 * $ echo "${your_account_id}" > cloudflare.auto.tfvars"
 * $ terraform init -backend-config=${path_to_backend_config}
 * $ TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
 * $ TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform apply
 */
locals {
  account_id = var.account_id
  project_name = "my-site"
}

provider "cloudflare" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
  api_token = var.api_token
}

# https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pages_project
resource "cloudflare_pages_project" "main" {
  account_id        = local.account_id
  name              = local.project_name
  production_branch = "main"

  build_config {
    build_caching = false
    destination_dir = "build/client"
  }

  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-08-01"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces                        = {}
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-08-01"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces                        = {}
    }
  }
}

variable "api_token" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
  type = string
}

variable "account_id" {
  type = string
}


terraform {
  #backend "s3" {
  #  #
  #  # terraform init -backend-config=my.tfbackend
  #  #
  #  #     $ cat my.tfbackend
  #  #     profile = "default"
  #  #     region = "ap-northeast-1"
  #  #     bucket = "my-terraform-state"
  #  #
  #  #key = "terraform/github/tmtk75/my-site/cloudflare/terraform.tfstate"
  #}

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
