# api/__init__.py
"""
API endpoints dla Legal RAG System
"""

from .ingestion import ingestion_bp
from .query import query_bp
from .analysis import analysis_bp

__all__ = ['ingestion_bp', 'query_bp', 'analysis_bp']
