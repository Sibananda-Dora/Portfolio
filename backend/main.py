"""
Portfolio Backend — FastAPI
===========================
Serves portfolio content from JSON data files.
Run: uvicorn main:app --reload --port 8000
"""

import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Load .env
load_dotenv(Path(__file__).parent / ".env")

GMAIL_USER = os.getenv("GMAIL_USER", "")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")

# ─── App Setup ───────────────────────────────────────────────
app = FastAPI(
    title="Sibananda Dora — Portfolio API",
    description="Backend API for my portfolio website",
    version="1.0.0",
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://portfolio-backend-qjpn.onrender.com",
    ],
    allow_origin_regex=r"https://.*\.onrender\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Data Directory ──────────────────────────────────────────
DATA_DIR = Path(__file__).parent / "data"


def read_json(filename: str) -> list | dict:
    """Read a JSON data file."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(filename: str, data: list | dict):
    """Write data to a JSON file."""
    filepath = DATA_DIR / filename
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ─── Models ──────────────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


# ─── Email Helper ─────────────────────────────────────────────
def send_email(name: str, sender_email: str, message: str):
    """Send contact form submission to Gmail inbox."""
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        return  # silently skip if not configured

    subject = f"Portfolio Contact: {name}"
    body = f"""New message from your portfolio contact form:

Name:    {name}
Email:   {sender_email}
Message:
{message}
"""
    msg = MIMEMultipart()
    msg["From"] = GMAIL_USER
    msg["To"] = GMAIL_USER
    msg["Subject"] = subject
    msg["Reply-To"] = sender_email
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.sendmail(GMAIL_USER, GMAIL_USER, msg.as_string())


# ─── Routes ──────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "alive", "message": "Portfolio API is running 🚀"}


@app.get("/api/profile")
def get_profile():
    """Return profile info (name, tagline, bio)."""
    return {
        "name": "Sibananda Dora",
        "tagline": "ai, systems, and python.",
        "status": "B.Tech 2nd Year — Computer Science",
        "bio": [
            "I am a Computer Science student and a future software engineer. I am passionate about AI and the ever-changing technology landscape. Currently, I am deeply Python-centric — building tools, automations, and intelligent systems with it.",
            "In my almost 2 years of journey, I have participated in hackathons and won some of them. I like to call myself a backend and logic builder who understands how systems work. Lately, I have been drawn more towards Machine Learning — not just using trained models with Python frameworks (which I am already familiar with), but the art of training and fine-tuning models to behave exactly as you intend. Though I can't commit 100% to it, I am curious to see how far I can go.",
            "Well, that's it — not much of a big journey yet!",
        ],
        "philosophy": {
            "title": "Philosophy",
            "text": "I read somewhere some days ago that in earlier days, the Native Americans, when travelling on horses, after covering a distance, used to stop and get off the horse and simply look back to the distance they had travelled — not to rest, not to give their horse a break, but just to look back at the journey they had made.",
            "closing": "Humans, huh!",
        },
        "social": [
            {"name": "GitHub", "url": "https://github.com/Sibananda-Dora", "platform": "github"},
            {"name": "LinkedIn", "url": "https://www.linkedin.com/in/sibananda-dora-a487a1389/", "platform": "linkedin"},
            {"name": "X (Twitter)", "url": "https://x.com/Sibanand007", "platform": "x"},
        ],
    }


@app.get("/api/projects")
def get_projects():
    """Return all projects."""
    return read_json("projects.json")


@app.get("/api/blogs")
def get_blogs():
    """Return all blog posts."""
    return read_json("blogs.json")


@app.get("/api/bookshelf")
def get_bookshelf():
    """Return all bookshelf entries."""
    return read_json("bookshelf.json")


@app.get("/api/papershelf")
def get_papershelf():
    """Return all papershelf entries."""
    return read_json("papershelf.json")


@app.get("/api/highlights")
def get_highlights():
    """Return all highlights/achievements."""
    return read_json("highlights.json")


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    """Save a contact form message and email it."""
    messages = read_json("contact_messages.json")
    if not isinstance(messages, list):
        messages = []
    messages.append({
        "name": msg.name,
        "email": msg.email,
        "message": msg.message,
        "submitted_at": datetime.now().isoformat(),
    })
    write_json("contact_messages.json", messages)

    # Send email notification (non-blocking failure)
    try:
        send_email(msg.name, msg.email, msg.message)
    except Exception as e:
        print(f"[email] Failed to send: {e}")

    return {"status": "success", "message": "Thank you for reaching out! I'll get back to you soon."}
