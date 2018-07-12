package training_service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

/**
 * @author Boaz Nahum
 */

class TrainingServiceImp implements TrainingService {

    private static TrainingServiceImp INSTANCE;

    private final Map<String, TrainingSession> sessions = new ConcurrentHashMap<>();

    static TrainingService instance() {


        if (INSTANCE == null) {
            synchronized (TrainingServiceImp.class) {
                if (INSTANCE == null) {
                    INSTANCE = new TrainingServiceImp();
                }
            }
        }

        return INSTANCE;

    }

    @Override
    public TrainingSession getOrCreateSession(String sessionID) {

        //Function<String, TrainingSession> createNewSession = TrainingSessionImp::new;

        return sessions.computeIfAbsent(sessionID, this::createNewSession);
    }

    private TrainingSession createNewSession(String sessionID) {

        Logger.getGlobal().info("creating session " + sessionID);
        TrainingSessionImp session = new TrainingSessionImp(sessionID);

        try {
            session.init();
        } catch (InterruptedException | ExecutionException | IOException e) {
            throw new RuntimeException(e);

        }


        return session;

    }

    @Override
    public TrainingSession getSession(String sessionID) {
        return sessions.get(sessionID);
    }

    @Override
    public void closeSession(String sessionID) throws InterruptedException, ExecutionException, IOException {
        TrainingSession trainingSession = getSession(sessionID);
        if (trainingSession != null) {
            trainingSession.shutdown();
        }

        sessions.remove(sessionID);

    }
}
