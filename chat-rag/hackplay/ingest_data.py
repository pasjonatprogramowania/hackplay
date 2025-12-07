import os
from rag_engine import rag_engine

def main():
    # Define path to the markdown file
    # Assuming we are running from chat-rag/hackplay directory
    file_path = os.path.abspath(os.path.join("data", "artykuly-porownanie.md"))
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    print(f"🚀 Starting ingestion for: {file_path}")
    
    try:
        # Initialize RAG engine (loads FAISS index or creates new)
        rag_engine.initialize()
        
        # Ingest the document
        result = rag_engine.ingest_document(file_path, doc_id="artykuly-porownanie")
        
        if result.get("status") == "success":
            print(f"✅ Successfully ingested document!")
            print(f"📊 Chunks added: {result.get('chunks')}")
        else:
            print(f"❌ Ingestion failed: {result.get('error')}")
            
    except Exception as e:
        print(f"❌ Error during ingestion: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
