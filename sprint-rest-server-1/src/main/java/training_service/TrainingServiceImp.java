package training_service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Boaz Nahum
 */

class TrainingServiceImp implements TrainingService {

    private static TrainingServiceImp INSTANCE;

     final Map<String, TrainingSession> sessions = new ConcurrentHashMap<>();

    static TrainingService instance() {


        if (INSTANCE ==null) {
            synchronized (TrainingServiceImp.class) {
                if (INSTANCE ==null) {
                    INSTANCE= new TrainingServiceImp();
                }
            }
        }

        return INSTANCE;

    }

    @Override
    public TrainingSession getSession(String sessionID) {

        return sessions.computeIfAbsent(sessionID, TrainingSessionImp::new);
    }
}
