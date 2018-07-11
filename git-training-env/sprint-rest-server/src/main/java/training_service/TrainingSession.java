package training_service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

/**
 * @author Boaz Nahum
 */

public interface TrainingSession {

    String LOCAL1 = "local1";
    String LOCAL2 = "local2";
    String REMOTE = "remote";

    long getImageID(String repoID) throws IOException;

    /**
     *
     * @param repoID   {@link #LOCAL1}, {@link #LOCAL2} or {@link #REMOTE}
     * @return
     * @throws IOException
     */
    byte[] getImage(String repoID) throws IOException;

    String runCommandOnRepo(String repoID, String command, boolean waitFor) throws IOException, ExecutionException, InterruptedException;

    void shutdown() throws IOException;
}
