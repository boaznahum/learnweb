package training_service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

/**
 * @author Boaz Nahum
 */

public interface TrainingService {

    public static TrainingService instance() {


        return TrainingServiceImp.instance();


    }

    TrainingSession getSession(String sessionID);

    void closeSession(String sessionID) throws InterruptedException, ExecutionException, IOException;
}
