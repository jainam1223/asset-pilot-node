terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "prodessy"
    storage_account_name = "tfstateprod178967"
    container_name       = "tfstate"
    key                  = "asset-pilot-node.tfstate"
  }
}

provider "azurerm" {
  features {}
}
