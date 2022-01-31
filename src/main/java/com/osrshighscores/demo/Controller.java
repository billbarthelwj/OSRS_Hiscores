package com.osrshighscores.demo;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class Controller {
    private PlayerHelper playerHelper;

    public Controller(){
        playerHelper = new PlayerHelper();
    }

    //Should be Get
    @CrossOrigin
    @PostMapping("/post")
    public Map<String, Player> postTest(@RequestBody String dataRetrievedFromReact){
        Map<String, Player> jsonResponse = new HashMap<>();
        String[] arrOfNames = dataRetrievedFromReact.substring(dataRetrievedFromReact.indexOf('[') + 1, dataRetrievedFromReact.indexOf(']')).split(",");
        System.out.println("Printing data from React:");
        System.out.println(dataRetrievedFromReact);

        for(String user : arrOfNames){
            String formattedUsername = playerHelper.formatPlayerName(user);
            System.out.println("User Name = " + user);
            System.out.println("formattedUsername = " + formattedUsername);
            if (playerHelper.isValidUsername(formattedUsername)){
                Player player = new Player(formattedUsername);
                playerHelper.buildSkillMap(player);
                jsonResponse.put(player.getPlayerName(), player);
            } else {
                System.out.println(user + " - INVALID");
                jsonResponse.put("N/A", new Player(user));
            }
        }

        return jsonResponse;
    }
}
