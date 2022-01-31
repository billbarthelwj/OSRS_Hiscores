package com.osrshighscores.demo;

public class Skill{
    private String name;
    private int level;
    private int experience;

    public Skill(String name, int level, int experience){
        this.name = name;
        this.level = level;
        this.experience = experience;
    }

    public String getName(){return name;}
    public int getLevel(){return level;}
    public int getExperience(){return experience;}
}
