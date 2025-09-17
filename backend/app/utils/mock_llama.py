"""
Very small mock LLM function to simulate answering from context.
Replace with real LLM integration later.
"""

def generate_answer_from_context(context: str, question: str) -> str:
    # simple heuristic: echo question and show a snippet of context
    snippet = context[:400] + ("..." if len(context) > 400 else "")
    return f"Mock answer (based on provided context):\n\nContext snippet:\n{snippet}\n\nQuestion: {question}\n\nAnswer: This is a mocked response. Replace with a real LLM integration."
