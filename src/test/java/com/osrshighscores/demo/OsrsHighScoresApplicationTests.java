package com.osrshighscores.demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class OsrsHighScoresApplicationTests {

    //playerStats.getPlayerName()
    //Check out Live Templates
    @Test
    @DisplayName("Set player name")
    void setPlayerName() {
        String actual = "stackofsmoat";
        Player player = new Player(actual);
        String getName = player.getPlayerName();
        assertEquals(actual, getName);
    }
}
