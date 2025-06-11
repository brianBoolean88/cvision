<p align="center">
  <img src="/public/Icon.jpg" alt="Resume Screener Logo" width="200"/>
</p>

<h1 align="center">📄CVision: Resume Screener</h1>
<p align="center">
  A fully serverless resume screening app powered by <strong>AWS Lambda</strong> and <strong>Next.js</strong>.<br/>
  Built to impress recruiters with fast, accurate, and scalable resume analysis.
</p>

---

## 🚀 Project Overview

**Resume Screener** allows users to upload a PDF resume to AWS S3 Bucket, extract its content client-side in the browser using `pdfjs-dist`, and analyze it using a Python-based AWS Lambda backend. The Lambda function scores resumes based on keyword detection, regex-based measurable achievement recognition, and soft skill analysis — storing results in DynamoDB for fast retrieval.

---

## 🧠 Features

- 📄 **Frontend PDF Text Extraction**  
  - Extracts text using `pdfjs-dist` in the browser to avoid Lambda package bloat and Python PDF dependency issues.

- ☁️ **Serverless Analysis with AWS Lambda**  
  - Keyword scanning (`React`, `JavaScript`, `AWS`, etc.)
  - Regex to detect quantified achievements like `5+ projects`, `10k+ users`
  - Soft skill and action verb scoring (`built`, `led`, `created`, etc.)

- 🧮 **Scoring Engine**  
  - Total resume score (out of 100)
  - Keyword list found
  - Custom feedback and suggestions
  - In-depth sub-scores:
    - Brevity
    - Skill Showcase
    - Soft Skills
    - Effectiveness

- 🗄️ **DynamoDB Integration**  
  - Stores analysis results indexed by `fileName`
  - Includes `timestamp` for versioning

- 🖥️ **Next.js Frontend**  
  - Upload resume and view results in a clean, responsive UI
  - Automatically calls Lambda with extracted text and metadata

---

## 🧱 Architecture

```text
+--------------------+        +--------------------------------+
|  Next.js Frontend  | -----> |   Send PDF to AWS S3 Bucket    |
+--------------------+        | Sends extracted text to Lambda |                             
                              +-------------+------------------+
                                            |
                                            v
                                +-----------+-----------+
                                | AWS Lambda (Python)   |
                                | - Analyzes Resume     |
                                | - Keywords & Regex    |
                                +-----------+-----------+
                                            |
                                            v
                                 +----------+----------+
                                 | AWS DynamoDB        |
                                 | - Stores Results    |
                                 +---------------------+

```

---

# 🖥️ Installation Guide

## Context
Please note that I did not intend to publish this to an actual website host because I do not plan to keep this project (from my end) online long-term. These AWS Services cost money after 12 months, and as I will not be using them, I did not decide to host my progress to a website. I have closed my AWS services since the creation of this project.

However, you could utilize my code from my GitHub repository and use AWS for your own projects if you would like! Just please give a little credit :)

## Steps
- AWS Services: S3 Bucket, DynamoDB, Lambda, API Gateway, AWS User w/ Permissions with API Keys/Secret
- Python 3.11 Lambda Function
- VSCode: NextJS
- Computer

1. **Install NextJS**  
   [Download here](https://nextjs.org/docs/app/getting-started/installation)

2. **Import the Project**  
   - Port the project contents to VSCode
   - Run 'npm run dev'
   - Open the localhost link

3. Create a .env file with the following variables:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - S3_BUCKET_NAME
   - AWS_API_GATEWAY_LINK
4. Create an AWS S3 Bucket & Link the bucket name to .env
5. Create an AWS user with relevant roles to access all used services. Add the API Key & Secret to .env
6. Input your relevant AWS account region to the .env
7. Create an AWS lambda function
8. Port the lambda.py file in the repo to the lambda function in AWS.
9. Create an AWS API Gateway that does a POST request to the AWS lambda function
10. Paste your API Gateway POST link to the .env file
11. Run 'npm run dev' in the VSCode terminal
12. Open the localhost link and utilize the application
13. (Optional). Deploy the project to a website host (AWS may send charges after a certain time period)

Happy reviewing your resumes :)