
package com.saroj.fixora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableCaching
public class BackendApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        dotenv.entries().forEach(entry -> {

            String value = entry.getValue();

            if ("KAFKA_CA_CERT".equals(entry.getKey())) {
                value = value.replace("\\n", "\n").trim();

                if (!value.contains("-----BEGIN CERTIFICATE-----")
                        || !value.contains("-----END CERTIFICATE-----")) {
                    throw new IllegalStateException(
                            "Invalid Kafka CA certificate in .env"
                    );
                }
            }

            System.setProperty(entry.getKey(), value);
        });

        SpringApplication.run(BackendApplication.class, args);
    }
}
