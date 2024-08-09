provider "github" {
  owner = "tmtk75"
  # export GITHUB_TOKEN
}

resource "github_repository" "my_site" {
  name       = "my-site"
  visibility = "public"

  has_downloads        = false
  has_issues           = false
  has_projects         = false
  has_wiki             = false
  vulnerability_alerts = true

  pages {
    source {
      branch = "gh-pages"
      path   = "/"
    }
    #cname = "www.tmtk.net"
  }
}

import {
  to = github_repository.my_site
  id = "my-site"
}

resource "github_repository_environment" "my_site" {
  environment = "github-pages"
  repository  = github_repository.my_site.name
  deployment_branch_policy {
    custom_branch_policies = true
    protected_branches     = false
  }
}

import {
  to = github_repository_environment.my_site
  id = "my-site:github-pages"
}

#resource "github_repository_environment_deployment_policy" "my_site" {
#  repository     = github_repository.my_site.name
#  environment    = github_repository_environment.my_site.environment
#  branch_pattern = "releases/*"
#}
#
#import {
#  to = github_repository_environment_deployment_policy.my_site
#  id = "my-site:gh-pages:301860457"
#  https://registry.terraform.io/providers/integrations/github/latest/docs/resources/repository_environment_deployment_policy
#}
