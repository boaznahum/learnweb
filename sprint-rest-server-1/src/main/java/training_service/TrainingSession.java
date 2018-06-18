package training_service;

import java.io.IOException;

/**
 * @author Boaz Nahum
 */

public interface TrainingSession {

    byte[] getImage(String repoID) throws IOException;
}
