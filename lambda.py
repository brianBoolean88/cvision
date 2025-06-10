import re
import json
from datetime import datetime
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ResumeAnalysis')

def analyze_text(text):
    # Define sample data
    technical_keywords = ["Python", "Java", "JavaScript", "C++", "AWS", "React", "Node.js", "SQL", "Machine Learning", "Docker"]
    soft_skills = ["communication", "teamwork", "leadership", "adaptability", "problem-solving", "collaboration"]
    action_verbs = ["developed", "created", "led", "implemented", "designed", "initiated", "achieved", "optimized"]
    certifications = ["AWS Certified", "Google Cloud Certified", "Certified Scrum Master", "PMP", "CompTIA"]
    
    # Normalize text
    lower_text = text.lower()
    
    # Scoring
    tech_matches = [kw for kw in technical_keywords if kw.lower() in lower_text]
    soft_matches = [kw for kw in soft_skills if kw in lower_text]
    verb_matches = [kw for kw in action_verbs if kw in lower_text]
    cert_matches = [kw for kw in certifications if kw.lower() in lower_text]

    # Quantified impact — look for numbers + keywords
    quantified = re.findall(r'\b(\d+[\w%$]*)\b.*?\b(projects?|users?|clients?|sales|revenue|growth|savings?)', lower_text)

    # Scoring logic
    scores = {
        "Technical Skills": min(len(tech_matches) * 10, 100),
        "Soft Skills": min(len(soft_matches) * 15, 100),
        "Action Verbs": min(len(verb_matches) * 10, 100),
        "Certifications": 100 if cert_matches else 0,
        "Quantified Impact": min(len(quantified) * 20, 100)
    }

    summary_points = []
    if len(tech_matches) < 3:
        summary_points.append("Consider adding more technical skills relevant to the job.")
    if not quantified:
        summary_points.append("Use more numbers to show measurable results.")
    if not cert_matches:
        summary_points.append("Adding certifications can strengthen credibility.")
    if not soft_matches:
        summary_points.append("Include more interpersonal or teamwork-oriented phrases.")

    summary = "Strong technical background." if scores["Technical Skills"] >= 70 else "Resume can be more technically focused."

    return {
        "score": round(sum(scores.values()) / len(scores)),
        "summary": summary,
        "keywords": tech_matches + soft_matches + verb_matches + cert_matches,
        "good": [
            f"Mentions technical skills: {', '.join(tech_matches)}",
            f"Includes soft skills: {', '.join(soft_matches)}",
            f"Uses action verbs: {', '.join(verb_matches)}",
            f"Certifications: {', '.join(cert_matches)}" if cert_matches else "No certifications found",
            f"Quantified examples: {len(quantified)}"
        ],
        "suggestions": summary_points,
        "in_depth_scores": [{"category": k, "score": v} for k, v in scores.items()],
    }

def lambda_handler(event, context):
    print(f"Received event: {event}")

    # Parse event body if Lambda Proxy integration
    if "body" in event:
        event_body = json.loads(event["body"])
    else:
        event_body = event

    file_name = event_body.get("fileName")
    extracted_text = event_body.get("extractedText")

    if not file_name:
        return {
            'statusCode': 400,
            'body': json.dumps("No file name provided")
        }
    if not extracted_text:
        return {
            'statusCode': 400,
            'body': json.dumps("No extractedText provided")
        }

    analysis = analyze_text(extracted_text)

    result = {
        "fileName": file_name,
        **analysis,
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        table.put_item(Item=result)
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Failed to store result in DynamoDB: {str(e)}")
        }

    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }