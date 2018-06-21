package training_service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

/**
 * @author Boaz Nahum
 */

public interface TrainingSession {

    long getImageID(String repoID) throws IOException;

    byte[] getImage(String repoID) throws IOException;

    String runCommand(String repoID, String command) throws IOException, ExecutionException, InterruptedException;
}
