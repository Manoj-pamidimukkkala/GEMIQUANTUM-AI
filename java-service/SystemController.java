package com.quantum.hud;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/system")
@CrossOrigin(origins = "*")
public class SystemController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("system", "G-AQUIS Core");
        status.put("status", "ACTIVE");
        status.put("qpu_temperature", "0.015 K");
        status.put("db_connections", 16);
        return ResponseEntity.ok(status);
    }
}
