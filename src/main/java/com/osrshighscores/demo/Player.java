package com.osrshighscores.demo;

import java.util.HashMap;
import java.util.Map;

public class Player {
    private String playerName;
    private Map<String, Skill> skills = new HashMap<>();
    
    public Player(String name){
        setPlayerName(name);
    }

    protected void setPlayerName(String playerName){this.playerName = playerName;}
    public String getPlayerName(){
        return playerName;
    }

    protected void setSkillMap(Map<String, Skill> skills){
        this.skills = skills;
    }
    public Map<String, Skill> getSkills(){
        return skills;
    }
}

