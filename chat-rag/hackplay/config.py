import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # Gemini API
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-exp")
    GEMINI_EMBEDDING_MODEL = os.getenv("GEMINI_EMBEDDING_MODEL", "text-embedding-004")
    EMBEDDING_DIM = int(os.getenv("EMBEDDING_DIM", 768))

    # RAG Configuration
    WORKING_DIR = os.getenv("WORKING_DIR", "./rag_storage")
    CHROMA_PERSIST_DIR = os.path.join(WORKING_DIR, "chroma_db")

    # Flask
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))

    # Upload
    UPLOAD_FOLDER = os.path.join(".", "data", "documents")
    ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc', 'txt'}
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB

    # RAG Settings
    TOP_K_RESULTS = 10
    CHUNK_SIZE = 1000
    CHUNK_OVERLAP = 200
