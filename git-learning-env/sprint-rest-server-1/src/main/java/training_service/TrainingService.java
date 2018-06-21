package training_service;

/**
 * @author Boaz Nahum
 */

public interface TrainingService {

    public static TrainingService instance() {


        return TrainingServiceImp.instance();


    }

    TrainingSession getSession(String sessionID);
}
