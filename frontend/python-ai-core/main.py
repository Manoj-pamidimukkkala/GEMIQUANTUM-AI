import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

app = Flask(__name__)
CORS(app)

# Initialize Gemini SDK Client
gemini_client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY"))

def execute_quantum_circuit(qubits: int = 4):
    """Generates and samples an entangled GHZ quantum circuit state."""
    qc = QuantumCircuit(qubits)
    qc.h(0)
    for i in range(qubits - 1):
        qc.cx(i, i + 1)
    qc.measure_all()
    
    sampler = StatevectorSampler()
    job = sampler.run([qc], shots=512)
    result = job.result()[0]
    counts = result.data.meas.get_counts()
    return counts

@app.route('/ai/execute', methods=['POST'])
def process_ai_quantum_request():
    data = request.get_json()
    prompt = data.get('prompt', 'Status check')
    
    # 1. Quantum State Preparation
    q_counts = execute_quantum_circuit(4)
    
    # 2. Gemini Multi-Modal/Text Model Inference
    gemini_prompt = (
        f"You are G-AQUIS, an Iron Man style JARVIS HUD system powered by Quantum-AI. "
        f"User Command: '{prompt}'. Current Quantum Entanglement Counts: {q_counts}. "
        f"Provide a concise, highly technical response."
    )
    
    try:
        response = gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=gemini_prompt,
        )
        ai_out = response.text
    except Exception as e:
        ai_out = f"Quantum core fallback response due to: {str(e)}"
        
    return jsonify({
        "status": "SUCCESS",
        "quantum_counts": q_counts,
        "ai_response": ai_out
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
