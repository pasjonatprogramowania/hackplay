from flask import Blueprint, request, jsonify
from rag_engine import rag_engine

analysis_bp = Blueprint('analysis', __name__)


@analysis_bp.route('/compare-versions', methods=['POST'])
def compare_versions():
    """
    POST /api/compare-versions
    Body: {
      "doc_a": "kse1",
      "doc_b": "skrm2",
      "context": "Play - telekomunikacja"
    }
    """
    data = request.get_json()

    if not data or 'doc_a' not in data or 'doc_b' not in data:
        return jsonify({"error": "Both doc_a and doc_b required"}), 400

    try:
        result = rag_engine.analyze_changes(
            data['doc_a'],
            data['doc_b'],
            data.get('context')
        )
        return jsonify({
            "status": "success",
            **result
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@analysis_bp.route('/legal-impact', methods=['POST'])
def legal_impact():
    """
    POST /api/legal-impact
    Body: {
      "article": "Art. 67 - kary do 35 mln EUR...",
      "client_profile": "Play - telekomunikacja"
    }
    """
    data = request.get_json()

    if not data or 'article' not in data:
        return jsonify({"error": "Article is required"}), 400

    article = data['article']
    client_profile = data.get('client_profile', 'telekomunikacja')

    question = f"""
    Przeanalizuj wpływ następującego artykułu na klienta z branży {client_profile}:

    {article}

    Zwróć:
    1. Poziom ryzyka (KRYTYCZNE/WYSOKIE/ŚREDNIE/NISKIE)
    2. Potencjalne kary finansowe (konkretne kwoty)
    3. Zalecane działania (timeline 7-30 dni)
    4. Compliance requirements
    """

    try:
        result = rag_engine.query(question)
        return jsonify({
            "status": "success",
            "article": article,
            "impact_analysis": result['answer'],
            "sources": result.get('sources', [])
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
