from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from rag_engine import rag_engine
from config import Config

ingestion_bp = Blueprint('ingestion', __name__)
config = Config()


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS


@ingestion_bp.route('/upload', methods=['POST'])
def upload_document():
    """
    POST /api/upload
    Body: multipart/form-data
      - file: PDF/DOCX
      - doc_id: (optional) identyfikator
      - stage: (optional) np. "9. SKRM"
      - date: (optional) np. "02-10-25"
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
        filepath = os.path.join(config.UPLOAD_FOLDER, filename)

        os.makedirs(config.UPLOAD_FOLDER, exist_ok=True)
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
                "message": f"Document '{filename}' ingested",
                "data": result
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400


@ingestion_bp.route('/batch-upload', methods=['POST'])
def batch_upload():
    """POST /api/batch-upload - wiele plików naraz"""
    if 'files[]' not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist('files[]')
    results = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(config.UPLOAD_FOLDER, filename)

            os.makedirs(config.UPLOAD_FOLDER, exist_ok=True)
            file.save(filepath)

            try:
                result = rag_engine.ingest_document(filepath)
                results.append({"file": filename, "status": "success"})
            except Exception as e:
                results.append({"file": filename, "status": "error", "error": str(e)})

    return jsonify({"results": results}), 200
