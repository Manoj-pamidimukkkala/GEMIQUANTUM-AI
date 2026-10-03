from flask import Flask, jsonify, request
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY", "YOUR_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/api/quantum-exec', methods=['POST'])
def run_quantum_circuit():
    # 2-Qubit Bell State Circuit
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure_all()

    simulator = AerSimulator()
    job = simulator.run(qc, shots=1024)
    result = job.result()
    counts = result.get_counts()

    return jsonify({
        "status": "success",
        "counts": counts,
        "circuit": qc.qasm()
    })

@app.route('/api/gemini-query', methods=['POST'])
def gemini_query():
    data = request.json
    user_prompt = data.get("prompt", "Hello Gemini!")
    
    response = model.generate_content(user_prompt)
    
    return jsonify({
        "response": response.text,
        "status": "completed"
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
