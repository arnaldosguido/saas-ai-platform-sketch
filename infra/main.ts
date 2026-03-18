# Configurazione Provider (AWS)
provider "aws" {
  region = "eu-central-1"
}

# Database Postgres per dati transazionali e vettoriali
resource "aws_db_instance" "postgres_db" {
  allocated_storage = 20
  instance_class    = "db.t3.micro"
  engine            = "postgres"
  db_name           = "platform_prod"
  username          = "admin"
  password          = var.db_password
}

# Redis Managed (ElastiCache) per Celery e WebSockets
resource "aws_elasticache_cluster" "redis_broker" {
  cluster_id           = "celery-broker"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  port                 = 6379
}