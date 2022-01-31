package com.osrshighscores.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//In essence, this annotation will fire up a servlet container and serve up this delicious service
@SpringBootApplication
public class OsrsHighScoresApplication {

    public static void main(String[] args) {
        SpringApplication.run(OsrsHighScoresApplication.class, args);
    }

}
