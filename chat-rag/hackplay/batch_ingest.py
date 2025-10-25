#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch ingestion script for all documents in data/documents/
This will clear the current index and re-ingest all current documents.
"""

import os
import sys
from rag_engine import rag_engine

def get_all_document_files():
    """Get all valid document files from data/documents/"""
    documents_dir = 'data/documents'
    valid_extensions = ['.pdf', '.docx', '.doc', '.txt']

    if not os.path.exists(documents_dir):
        print(f"❌ Directory {documents_dir} not found")
        return []

    files = []
    for file in os.listdir(documents_dir):
        if file.startswith('.'):  # Skip hidden files
            continue

        _, ext = os.path.splitext(file.lower())
        if ext in valid_extensions:
            files.append(os.path.join(documents_dir, file))

    return sorted(files)

def extract_metadata_from_filename(filename):
    """Extract metadata from filename for better organization"""
    basename = os.path.basename(filename)
    doc_id = basename

    metadata = {}

    # Try to extract date from filename (format DD_MM_YYYY or YYYY-MM-DD)
    if '10_02_2025' in basename:
        metadata['date'] = '2025-02-10'
        metadata['stage'] = 'KSE'
    elif '2025-07-04' in basename:
        metadata['date'] = '2025-07-04'
        metadata['stage'] = 'KSE'
    elif '2025-08-22' in basename:
        metadata['date'] = '2025-08-22'
        metadata['stage'] = 'KSE'
    elif '2025-10' in basename:
        metadata['date'] = '2025-10'
        metadata['stage'] = 'OSR/Konsultacje'
    elif '15102024' in basename:
        metadata['date'] = '2024-10-15'
        metadata['stage'] = 'Projekt Ministerstwa'
    else:
        metadata['stage'] = 'Wersja ostateczna'

    # Extract document type
    if 'ustawa' in basename.lower() or 'projekt' in basename.lower():
        metadata['type'] = 'ustawa'
    elif 'opinia' in basename.lower() or 'zasadnienie' in basename.lower():
        metadata['type'] = 'uzasadnienie'
    elif 'uwagi' in basename.lower():
        metadata['type'] = 'uwagi'
    elif 'tabela' in basename.lower() or 'tab_' in basename.lower():
        metadata['type'] = 'tabela_uwag'
    else:
        metadata['type'] = 'dokument'

    return doc_id, metadata

def main():
    print("🚀 ROZPOCZYNAM MASOWE ŁADOWANIE DOKUMENTÓW")
    print("=" * 50)

    # Initialize RAG engine (should create empty index)
    rag_engine.initialize()
    print(f"📊 Stan początkowy: {len(rag_engine.documents)} dokumentów")

    # Get all document files
    files = get_all_document_files()
    print(f"📂 Znaleziono {len(files)} plików do przetworzenia:")
    for f in files:
        print(f"  - {os.path.basename(f)}")

    print("\n" + "=" * 50)
    print("🔄 ROZPOCZYNAM PROCES INGESTJI")
    print("=" * 50)

    success_count = 0
    error_count = 0
    total_chunks = 0

    for filepath in files:
        basename = os.path.basename(filepath)
        print(f"\n📄 Przetwarzanie: {basename}")

        try:
            # Extract metadata
            doc_id, metadata = extract_metadata_from_filename(filepath)

            # Ingest document
            result = rag_engine.ingest_document(filepath, doc_id, metadata)

            if result['status'] == 'success':
                chunks = result.get('chunks', 0)
                total_chunks += chunks
                success_count += 1
                print(f"✅ Sukces: {chunks} chunków dodało")
            else:
                error_count += 1
                print(f"❌ Błąd: {result.get('error', 'Unknown error')}")

        except Exception as e:
            error_count += 1
            print(f"❌ Wyjątek: {str(e)}")

    # Final statistics
    print("\n" + "=" * 50)
    print("📊 PODSUMOWANIE INGESTJI")
    print("=" * 50)
    print(f"✅ Udanych: {success_count}")
    print(f"❌ Błędów: {error_count}")
    print(f"📈 Łącznie chunków: {total_chunks}")
    print(f"📚 Dokumentów w bazie: {len(rag_engine.documents)}")

    # Verify the storage was saved
    if os.path.exists(rag_engine.index_path):
        print("💾 Indeks został zapisany")
    else:
        print("⚠️  Indeks NIE został zapisany")

    print("\n🎉 INGESTJA ZAKOŃCZONA!")

if __name__ == "__main__":
    main()
