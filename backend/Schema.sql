CREATE DATABASE IF NOT EXISTS gaquis_db;
USE gaquis_db;

CREATE TABLE IF NOT EXISTS execution_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    qubit_count INT NOT NULL,
    state_result VARCHAR(255) NOT NULL,
    execution_time_ms FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_prompt TEXT NOT NULL,
    gemini_response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
