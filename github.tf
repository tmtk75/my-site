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
    cname = "www.tmtk.net"
  }
}

import {
  to = github_repository.my_site
  id = "my-site"
}
