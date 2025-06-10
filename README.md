<p align="center">
  <img src="/public/Icon.jpg" alt="Resume Screener Logo" width="200"/>
</p>

<h1 align="center">📄 Resume Screener</h1>
<p align="center">
  A fully serverless AI resume screening app powered by <strong>AWS Lambda</strong> and <strong>Next.js</strong>.<br/>
  Built to impress recruiters with fast, accurate, and scalable resume analysis.
</p>

---

## 🚀 Project Overview

**Resume Screener** allows users to upload a PDF resume, extract its content client-side in the browser using `pdfjs-dist`, and analyze it using a Python-based AWS Lambda backend. The Lambda function scores resumes based on keyword detection, regex-based measurable achievement recognition, and soft skill analysis — storing results in DynamoDB for fast retrieval.

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
|   Next.js Frontend | -----> | Send PDF to AWS S3 Bucket      |
+--------------------+        | Sends extracted text to Lambda |                             
                              +-------------+------------------+
                                            |
                                            v
                                +-----------+-----------+
                                | AWS Lambda (Python)   |
                                | - Analyzes Resume      |
                                | - Keywords & Regex     |
                                +-----------+-----------+
                                            |
                                            v
                                 +----------+----------+
                                 | AWS DynamoDB        |
                                 | - Stores Results     |
                                 +----------------------+
