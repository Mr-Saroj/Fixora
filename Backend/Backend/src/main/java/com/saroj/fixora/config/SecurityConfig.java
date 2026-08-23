package com.saroj.fixora.config;

import com.saroj.fixora.security.JwtAuthFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    // Password encryption
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

            // ------------------------------------------------
            // CSRF
            // ------------------------------------------------
            // Disabled because this is a stateless JWT API
            .csrf(csrf -> csrf.disable())

            // ------------------------------------------------
            // CORS
            // ------------------------------------------------
            .cors(cors ->
                cors.configurationSource(corsConfigurationSource)
            )

            // ------------------------------------------------
            // SESSION MANAGEMENT
            // ------------------------------------------------
            // JWT authentication does not use server sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // ------------------------------------------------
            // AUTHORIZATION
            // ------------------------------------------------
            .authorizeHttpRequests(auth -> auth

                // ============================================
                // PUBLIC ROUTES
                // ============================================

                .requestMatchers(
                    "/api/auth/register",
                    "/api/auth/login",
                    "/api/auth/forgot-password",
                    "/api/auth/reset-password",

                    // Cloudinary signature
                    "/api/cloudinary/signature",

                    // WebSocket endpoints
                    "/ws/**",
                    "/topic/**",
                    "/app/**"
                ).permitAll()


                // ============================================
                // ADMIN ROUTES
                // ============================================

                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")


                // ============================================
                // TECHNICIAN ROUTES
                // ============================================

                .requestMatchers("/api/technician/**")
                .hasRole("TECHNICIAN")


                // ============================================
                // CUSTOMER ROUTES
                // ============================================

                .requestMatchers("/api/customer/**")
                .hasRole("CUSTOMER")


                // ============================================
                // ALL OTHER ROUTES
                // ============================================

                // Any route not explicitly defined above
                // requires a valid JWT
                .anyRequest()
                .authenticated()
            )

            // ------------------------------------------------
            // DISABLE BASIC AUTHENTICATION
            // ------------------------------------------------
            .httpBasic(basic ->
                basic.disable()
            )

            // ------------------------------------------------
            // DISABLE FORM LOGIN
            // ------------------------------------------------
            .formLogin(form ->
                form.disable()
            )

            // ------------------------------------------------
            // JWT FILTER
            // ------------------------------------------------
            // Run JWT authentication before Spring's
            // UsernamePasswordAuthenticationFilter
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}