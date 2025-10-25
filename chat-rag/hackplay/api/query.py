import google.generativeai as genai
import numpy as np
from typing import List, Dict

def query(self, question: str, top_k: int = None) -> Dict:
    """Zapytanie RAG"""
    if not self._initialized:
        self.initialize()

    top_k = top_k or self.config.TOP_K_RESULTS

    print(f"🔍 Zapytanie: {question}")

    # Embed query - UPROSZCZONE!
    try:
        result = genai.embed_content(
            model=f"models/{self.config.GEMINI_EMBEDDING_MODEL}",
            content=question,
            task_type="retrieval_query"
        )

        # Wyciągnij values bezpośrednio
        print(result)
        query_embedding = np.array([result['embedding']['values']], dtype='float32')

    except Exception as e:
        print(f"❌ Query embedding error: {e}")
        import traceback
        traceback.print_exc()  # Print full error
        return {
            "error": str(e),
            "answer": f"Błąd podczas generowania embedingu: {e}",
            "sources": []
        }

    # Check if index is populated
    if self.index.ntotal == 0:
        return {
            "answer": "Brak dokumentów w bazie. Najpierw wrzuć pliki przez /api/upload",
            "sources": []
        }

    # Search FAISS
    try:
        distances, indices = self.index.search(query_embedding, top_k)
    except Exception as e:
        print(f"❌ FAISS search error: {e}")
        return {
            "error": str(e),
            "answer": f"Błąd podczas przeszukiwania: {e}",
            "sources": []
        }

    # Retrieve results
    results = []
    context_chunks = []
    for idx, dist in zip(indices[0], distances[0]):
        if idx < len(self.documents) and idx >= 0:
            results.append({
                "chunk": self.documents[idx],
                "metadata": self.metadata[idx],
                "distance": float(dist)
            })
            context_chunks.append(self.documents[idx])

    if len(context_chunks) == 0:
        return {
            "answer": "Nie znaleziono pasujących dokumentów.",
            "sources": []
        }

    # Build context
    context = "\n\n".join(context_chunks)

    # Generate answer
    prompt = f"""
Jesteś ekspertem prawnym specjalizującym się w ustawodawstwie AI. Musisz się jednak zachowywać jak zwykły czlowiek.

Wykonuj polecenia związane z tematami prawnymi, jednak rowniez badz mily witaj sie itp.

Nie hulacynuj. Masz byc pewny co do odpowiedzi.


KONTEKST z dokumentów legislacyjnych:
{context}

PYTANIE:
{question}

Odpowiedź powinna być konkretna, oparta na faktach z dokumentów i zawierać cytaty z artykułów.
"""

    try:
        response = self.model.generate_content(prompt)
        answer_text = response.text
    except Exception as e:
        print(f"❌ Error generating answer: {e}")
        answer_text = f"Błąd generowania odpowiedzi: {e}"

    return {
        "answer": answer_text,
        "sources": results
    }
