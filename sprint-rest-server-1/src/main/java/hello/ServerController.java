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
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ServerController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    //https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react
    //@CrossOrigin(origins = "http://localhost:3000")
    // or to all  https://spring.io/blog/2015/06/08/cors-support-in-spring-framework
    @CrossOrigin
    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
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

}