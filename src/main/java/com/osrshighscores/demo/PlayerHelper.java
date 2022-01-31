package com.osrshighscores.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

public class PlayerHelper {

    /**
     * Format player username to work with Jagex's API
     */
    protected String formatPlayerName(String playerUsername){
        return playerUsername.replace("\"", "").trim().replace(" ", "_");
    }

    public URLConnection openMainGameURLConnectionForPlayer(String playerName){
        URLConnection urlConnection = null;
        try {
            URL url = new URL(Strings.MAIN_GAME_SCORES_URL + playerName);
            urlConnection = url.openConnection();
        } catch (IOException e){
            System.out.println("Connection to Jagex failed!");
        }
        return urlConnection;
    }

    protected Boolean isValidUsername(String playerName){
        Boolean isValidUsername = false;
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(openMainGameURLConnectionForPlayer(playerName).getInputStream()));
            String inputLine = in.readLine();
            if (inputLine != null) {
                isValidUsername = true;
            }
            in.close();
        } catch (IOException e) {
            System.out.println("USER NOT FOUND EXCEPTION");
            isValidUsername = false;
        }
        return isValidUsername;
    }

    protected void buildSkillMap(Player player) {
        Map<String, Skill> skills = new HashMap<>();
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(openMainGameURLConnectionForPlayer(player.getPlayerName()).getInputStream()));
            String inputLine = in.readLine();
            int skillsLength = Strings.SKILL_NAMES.length;
            for (int i = 0; i < skillsLength; i++) {
                String[] playerDataLine = inputLine.split(",");
                String playerName = Strings.SKILL_NAMES[i];
                int skillLevel = Integer.parseInt(playerDataLine[1]);
                int skillExperience = Integer.parseInt(playerDataLine[2]);
                Skill skill = new Skill(playerName, skillLevel, skillExperience);
                skills.put(Strings.SKILL_NAMES[i].toLowerCase(Locale.ROOT), skill);
                inputLine = in.readLine();
            }
            in.close();
        } catch (IOException e) {
            System.out.println("PlayerHelper.java buildSkillMap(Player) failure");
        }
        player.setSkillMap(skills);
    }

    /*
        Boss kill stats
    */

    private String addCommaToNumeralString(String num){
        String regex = "(\\d)(?=(\\d{3})+$)";
        String [] splittedNum = num.split("\\.");
        if(splittedNum.length==2)
        {
            return splittedNum[0].replaceAll(regex, "$1,")+"."+splittedNum[1];
        }
        else
        {
            return num.replaceAll(regex, "$1,");
        }
    }
}
