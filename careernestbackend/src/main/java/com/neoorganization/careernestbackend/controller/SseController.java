package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/stream")
@RequiredArgsConstructor
@Slf4j
@org.springframework.web.bind.annotation.CrossOrigin(origins = "*")
public class SseController {
    private final SseService sseService;

    @GetMapping
    public SseEmitter stream() {
        SseEmitter emitter = sseService.createEmitter();
        try {
            emitter.send(SseEmitter.event().name("connected").data("connected"));
        } catch (Exception ignore) {}
        return emitter;
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> count() {
        return ResponseEntity.ok(ApiResponse.success(sseService.activeEmitters()));
    }
}
