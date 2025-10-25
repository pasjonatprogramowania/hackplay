from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from config import Config
from rag_engine import rag_engine

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS


# ============================================================
# INGESTION ENDPOINTS
# ============================================================

@app.route('/api/upload', methods=['POST'])
def upload_document():
    """
    Upload single document
    POST /api/upload
    Form-data: file, doc_id (optional), stage (optional), date (optional)
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    doc_id = request.form.get('doc_id', None)
    stage = request.form.get('stage', None)
    date = request.form.get('date', None)

    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)

        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)

        # Metadata
        metadata = {}
        if stage:
            metadata['stage'] = stage
        if date:
            metadata['date'] = date

        try:
            result = rag_engine.ingest_document(filepath, doc_id, metadata)
            return jsonify({
                "status": "success",
                "message": f"Document '{filename}' ingested successfully",
                "data": result
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400


@app.route('/api/batch-upload', methods=['POST'])
def batch_upload():
    """
    Upload multiple documents
    POST /api/batch-upload
    Form-data: files[] (multiple)
    """
    if 'files[]' not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist('files[]')
    results = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(Config.UPLOAD_FOLDER, filename)

            os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
            file.save(filepath)

            try:
                result = rag_engine.ingest_document(filepath)
                results.append({
                    "file": filename,
                    "status": "success",
                    "chunks": result.get('chunks', 0)
                })
            except Exception as e:
                results.append({
                    "file": filename,
                    "status": "error",
                    "error": str(e)
                })

    return jsonify({"results": results}), 200


# ============================================================
# QUERY ENDPOINTS
# ============================================================

@app.route('/api/ask', methods=['POST'])
def ask_question():
    """Ask RAG system a question"""
    print("=== ENDPOINT /api/ask CALLED ===")  # <-- DODAJ!

    data = request.get_json()
    print(f"Request data: {data}")  # <-- DODAJ!

    if not data or 'question' not in data:
        return jsonify({"error": "Question is required"}), 400

    question = data['question']
    top_k = data.get('top_k', 5)

    print(f"Calling rag_engine.query with: {question}")  # <-- DODAJ!

    try:
        result = rag_engine.query(question, top_k)
        print(f"Result: {result}")  # <-- DODAJ!

        return jsonify({
            "status": "success",
            "question": question,
            "answer": result.get('answer'),
            "sources": result.get('sources', [])
        }), 200
    except Exception as e:
        print(f"ERROR in ask_question: {e}")  # <-- DODAJ!
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/api/search', methods=['POST'])
def search_documents():
    """
    Search documents (similar to ask but returns raw chunks)
    POST /api/search
    JSON: {"query": "...", "top_k": 5}
    """
    data = request.get_json()

    if not data or 'query' not in data:
        return jsonify({"error": "Query is required"}), 400

    query = data['query']
    top_k = data.get('top_k', 5)

    try:
        result = rag_engine.query(query, top_k)
        return jsonify({
            "status": "success",
            "query": query,
            "results": result.get('sources', [])
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================================
# ANALYSIS ENDPOINTS
# ============================================================

@app.route('/api/compare-versions', methods=['POST'])
def compare_versions():
    """
    Compare two document versions
    POST /api/compare-versions
    JSON: {"doc_a": "kse1", "doc_b": "skrm2", "context": "..."}
    """
    data = request.get_json()

    if not data or 'doc_a' not in data or 'doc_b' not in data:
        return jsonify({"error": "Both doc_a and doc_b are required"}), 400

    doc_a = data['doc_a']
    doc_b = data['doc_b']
    context = data.get('context', None)

    try:
        result = rag_engine.analyze_changes(doc_a, doc_b, context)
        return jsonify({
            "status": "success",
            "comparison": {
                "doc_a": doc_a,
                "doc_b": doc_b,
                "analysis": result.get('analysis')
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/legal-impact', methods=['POST'])
def legal_impact():
    """
    Analyze legal impact of an article
    POST /api/legal-impact
    JSON: {"article": "Art. 67...", "client_profile": "Play"}
    """
    data = request.get_json()

    if not data or 'article' not in data:
        return jsonify({"error": "Article reference is required"}), 400

    article = data['article']
    client_profile = data.get('client_profile', 'telekomunikacja')

    question = f"""
    Przeanalizuj wpływ następującego artykułu na klienta z branży {client_profile}:

    {article}

    Zwróć:
    1. Poziom ryzyka (KRYTYCZNE/WYSOKIE/ŚREDNIE/NISKIE)
    2. Potencjalne kary finansowe (konkretne kwoty w EUR i PLN)
    3. Zalecane działania (konkretne kroki z timeline)
    4. Compliance requirements
    5. Deadline'y i terminy wejścia w życie
    """

    try:
        result = rag_engine.query(question)
        return jsonify({
            "status": "success",
            "article": article,
            "client_profile": client_profile,
            "impact_analysis": result.get('answer'),
            "sources": result.get('sources', [])
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================================
# MAIN ROUTES
# ============================================================

@app.route('/')
def index():
    return jsonify({
        "name": "Legal RAG API",
        "version": "2.0.0",
        "model": "Gemini 2.0 Flash",
        "vector_db": "FAISS",
        "status": "running",
        "endpoints": {
            "ingestion": {
                "upload": "POST /api/upload",
                "batch_upload": "POST /api/batch-upload"
            },
            "query": {
                "ask": "POST /api/ask",
                "search": "POST /api/search"
            },
            "analysis": {
                "compare": "POST /api/compare-versions",
                "impact": "POST /api/legal-impact"
            }
        }
    })


@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "rag_initialized": rag_engine._initialized,
        "documents_count": len(rag_engine.documents) if rag_engine._initialized else 0
    }), 200


@app.route('/stats')
def stats():
    """Get RAG statistics"""
    if not rag_engine._initialized:
        return jsonify({"error": "RAG not initialized"}), 500

    return jsonify({
        "total_documents": len(set(m.get('doc_id') for m in rag_engine.metadata)),
        "total_chunks": len(rag_engine.documents),
        "index_size": rag_engine.index.ntotal if rag_engine.index else 0
    })


# ============================================================
# INITIALIZATION
# ============================================================

@app.before_request
def initialize_rag():
    """Initialize RAG engine before first request"""
    if not rag_engine._initialized:
        rag_engine.initialize()


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Legal RAG API - Starting Server")
    print("=" * 60)
    print(f"📍 Host: 0.0.0.0")
    print(f"🔌 Port: {Config.FLASK_PORT}")
    print(f"🤖 Model: Gemini 2.0 Flash")
    print(f"💾 Vector DB: FAISS")
    print(f"📁 Working Dir: {Config.WORKING_DIR}")
    print("=" * 60)

    app.run(
        host='0.0.0.0',
        port=Config.FLASK_PORT,
        debug=(Config.FLASK_ENV == 'development')
    )
