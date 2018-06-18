package training_service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Boaz Nahum
 */

class TrainingSessionImp implements TrainingSession {

    private Path baseDir = Paths.get("F:\\views\\g\\two_locals_one_remote");

    public TrainingSessionImp(String sessionID) {

    }

    @Override
    public byte[] getImage(String repoID) throws IOException {


        Path imagePath = baseDir.resolve("out").resolve(repoID + ".png");



        try (InputStream resourceAsStream = Files.newInputStream(imagePath)) {

            int len = resourceAsStream.available();

            byte[] img = new byte[len];

            resourceAsStream.read(img);

            return img;

        }


    }
}
