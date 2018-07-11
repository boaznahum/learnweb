package hello;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import training_service.TrainingService;
import training_service.TrainingSession;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
public class ServerController {



    //https://stackoverflow.com/questions/40557637/how-to-return-an-image-in-spring-boot-controller-and-serve-like-a-file-system/40585852
    @CrossOrigin
    @RequestMapping("/imageID")
    public long imageID(@RequestParam(value = "sessionID") String sessionID,
                        @RequestParam(value = "repoID") String repoID) throws IOException {


        TrainingService ts = TrainingService.instance();

        TrainingSession sess = ts.getSession(sessionID);


        long id = sess.getImageID(repoID);

        return id;


    }

    @CrossOrigin
    @RequestMapping("/closeSession")
    public void closeSession(@RequestParam(value = "sessionID") String sessionID) throws IOException {


        TrainingService ts = TrainingService.instance();

        TrainingSession sess = ts.getSession(sessionID);

        sess.shutdown();
    }

    //https://stackoverflow.com/questions/40557637/how-to-return-an-image-in-spring-boot-controller-and-serve-like-a-file-system/40585852
    @CrossOrigin
    @RequestMapping("/image")
    public ResponseEntity<byte[]> image(@RequestParam(value = "sessionID") String sessionID,
                                        @RequestParam(value = "repoID") String repoID) throws IOException {


        TrainingService ts = TrainingService.instance();

        TrainingSession sess = ts.getSession(sessionID);


        byte[] img = sess.getImage(repoID);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(img);


    }

    @CrossOrigin
    @RequestMapping("/runCommand")
    public String runCommand(@RequestParam(value = "sessionID") String sessionID,
                                        @RequestParam(value = "repoID") String repoID,
                                        @RequestParam(value = "command") String command
    ) throws IOException, ExecutionException, InterruptedException {


        TrainingService ts = TrainingService.instance();

        TrainingSession sess = ts.getSession(sessionID);


        String response = sess.runCommandOnRepo(repoID, command, true);

        return response;


    }



}