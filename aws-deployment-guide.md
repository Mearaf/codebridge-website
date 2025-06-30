# AWS Deployment Guide for CodeBridge

## Learning Path: Deploy CodeBridge on AWS

### Option 1: AWS Amplify (Recommended for Learning)

**What you'll learn:**
- Full-stack deployment automation
- Environment variables management
- Database connections in cloud
- Custom domain setup with SSL
- CI/CD pipelines

**Steps:**
1. Create AWS account (free tier available)
2. Install AWS CLI: `npm install -g @aws-amplify/cli`
3. Configure: `amplify configure`
4. Initialize: `amplify init`
5. Deploy: `amplify publish`

**Services Used:**
- AWS Amplify (deployment)
- RDS (PostgreSQL database)
- Route 53 (domain management)
- CloudFront (CDN)

### Option 2: AWS App Runner + RDS

**What you'll learn:**
- Container deployment
- Database as a service
- Environment management
- Load balancing

**Steps:**
1. Push code to GitHub
2. Create RDS PostgreSQL instance
3. Create App Runner service
4. Connect custom domain

**Services Used:**
- AWS App Runner (container service)
- Amazon RDS (managed database)
- Route 53 (DNS)

### Option 3: Full AWS Stack (Advanced)

**What you'll learn:**
- EC2 virtual servers
- Load balancers
- Auto-scaling
- VPC networking
- Security groups

**Services Used:**
- EC2 (compute)
- RDS (database)
- Application Load Balancer
- Route 53 (DNS)
- CloudFront (CDN)
- Certificate Manager (SSL)

## Cost Estimates:
- **Amplify**: $5-15/month
- **App Runner**: $7-20/month  
- **Full Stack**: $20-50/month

## Recommended Path:
Start with **AWS Amplify** - it's designed for exactly your type of application and will teach you core AWS concepts while being cost-effective.