package com.placementpro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class PlacementProApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlacementProApplication.class, args);
    }

    @Bean
    public CommandLineRunner startupValidation(
            DataSource dataSource,
            @Value("${gemini.api.key}") String apiKey) {
        return args -> {
            System.out.println("\n====================================================================");
            System.out.println("🤖 PLACEMENTPRO AI STARTUP VALIDATION");
            System.out.println("====================================================================");

            // 1. Validate Database connection
            try (Connection conn = dataSource.getConnection()) {
                System.out.println("✅ DATABASE: Successfully connected to MySQL database!");
                System.out.println("   URL: " + conn.getMetaData().getURL());
            } catch (Exception e) {
                System.err.println("⚠️ DATABASE CONNECTION ERROR: Failed to connect to MySQL database!");
                System.err.println("   Detail: " + e.getMessage());
                System.err.println("\n   Please make sure:");
                System.err.println("   1. MySQL is running (locally on port 3306, or port 3307 inside Docker).");
                System.err.println("   2. Credentials (DATABASE_USER / DATABASE_PASSWORD) are set properly.");
                System.err.println("   3. Database schema 'placementpro' is created.");
            }

            // 2. Validate Gemini API Key
            if ("mock-key-for-testing".equals(apiKey) || apiKey == null || apiKey.trim().isEmpty()) {
                System.out.println("\n💡 GEMINI AI ADVISORY: Using offline mock response mode.");
                System.out.println("   No valid 'GEMINI_API_KEY' environment variable was detected.");
                System.out.println("   - The application will utilize built-in mock response templates.");
                System.out.println("   - To utilize live Gemini AI calls, please configure the key:");
                System.out.println("     Windows CMD:        set GEMINI_API_KEY=your_key");
                System.out.println("     Windows PowerShell: $env:GEMINI_API_KEY=\"your_key\"");
                System.out.println("     Linux/MacOS:        export GEMINI_API_KEY=\"your_key\"");
            } else {
                System.out.println("✅ GEMINI AI: Valid API Key configured.");
            }
            System.out.println("====================================================================\n");
        };
    }
}
