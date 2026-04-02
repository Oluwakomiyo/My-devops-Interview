output "kubeconfig" {
  value     = azurerm_kubernetes_cluster.aks_cluster.kube_config_raw
  sensitive = true
}

output "kubernetes_cluster_name" {
  value = azurerm_kubernetes_cluster.aks_cluster.name
}

output "resource_group_name" {
  value = azurerm_resource_group.aks.name
}